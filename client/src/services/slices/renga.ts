import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import _ from 'lodash'

import { errorResponsString } from '../../utils/vars'
import { runRequest } from '../api'
import { RootState } from '../store'
import { setCurrentPage } from './app-info'
import { selectOwnerId } from './user-info'

export const createRenga = createAsyncThunk('rengaStore/createRenga', async (objRenga: {}, thunkApi) => {
  const state: RootState = thunkApi.getState()
  const owner = selectOwnerId(state)

  const data = await runRequest('renga', 'POST', { ...objRenga, owner, status: 1, options: {} }, 'createRenga')

  thunkApi.dispatch(setCurrentPage(1))

  return data
})

export const updateRenga = createAsyncThunk('rengaStore/updateRenga', async (objRenga: {}, thunkApi) => { await runRequest(`renga/${objRenga.id}`, 'POST', objRenga, 'updateRenga') })

export const getRengaList = createAsyncThunk('rengaStore/getRengaList', async () => await runRequest('renga/list', 'GET'))

export const getRengaVerses = createAsyncThunk('rengaStore/getRengaVerses', async (rengaId: string, _thunkApi) => await runRequest(`renga/${rengaId}/verses`, 'GET'))

type TAddVerseInRengaOptions = {
  id: string
  verse: TVerse
}
export const addVerseInRenga = createAsyncThunk('rengaStore/addVerseInRenga', async (tmp: TAddVerseInRengaOptions, _thunkApi) => {
  const data = await runRequest('verse', 'POST', { ...tmp.verse, rengaId: tmp.id }, 'addVerseInRenga')

  return { ...tmp.verse, id: data.id }
})

export const editVerse = createAsyncThunk('rengaStore/editVerse', async (tmp: TAddVerseInRengaOptions, _thunkApi) => {
  await runRequest(`verse/${tmp.id}`, 'POST', tmp.verse)

  return tmp.verse
})

export const deletVerse = createAsyncThunk('rengaStore/deletVerse', async (verseId: string, _thunkApi) => {
  await runRequest(`verse/${verseId}`, 'DELETE')

  return verseId
})

export type TVerse = {
  id?: string
  number?: number
  topics: string[]
  season: number
  format: number
}

export type TReangaList = {
  createdAt: string | null
  description: string | null
  id: string
  name: string | null
  status: number
  updatedAt: string | null
  owner: string
}

export type TInitRengaStore = {
  rawData: TReangaList[] | undefined
  currentRenga: string | null
  verses: TVerse[] | []
}

const initRengaDataState: TInitRengaStore = { rawData: undefined, currentRenga: null, verses: [] }

export const rengaStore = createSlice({
  name: 'rengaStore',
  initialState: initRengaDataState,
  reducers: {
    setCurrentRenga: (state, action: PayloadAction) => {
      state.currentRenga = action.payload
    }
  },
  extraReducers: (builder) => {
    const rejectedAsyncThunk = (asyncFunctionName: any, cb?: Function = (_state: any, action: any) => {
      console.log(action.error.message)
    }) => {
      builder.addCase(asyncFunctionName.rejected, cb)
    }

    rejectedAsyncThunk(getRengaList)
    rejectedAsyncThunk(createRenga)
    rejectedAsyncThunk(getRengaVerses)
    rejectedAsyncThunk(addVerseInRenga)
    rejectedAsyncThunk(editVerse)
    rejectedAsyncThunk(deletVerse)
    rejectedAsyncThunk(updateRenga)

    builder.addCase(getRengaList.fulfilled, (state, action: PayloadAction<TReangaList>): void => {
      state.rawData = action.payload
    })
    builder.addCase(getRengaVerses.fulfilled, (state, action: PayloadAction<TVerse[]>): void => {
      state.verses = action.payload
    })
    builder.addCase(addVerseInRenga.fulfilled, (state, action: PayloadAction<TVerse>): void => {
      state.verses.push(action.payload)
    })
    builder.addCase(editVerse.fulfilled, (state, action: PayloadAction<TVerse>): void => {
      state.verses = state.verses.map((verse) => action.payload.id === verse.id ? action.payload : verse)
    })
    builder.addCase(deletVerse.fulfilled, (state, action: PayloadAction<string>): void => {
      state.verses = state.verses.filter((x) => x.id !== action.payload)
    })
  }
})

export const { setCurrentRenga } = rengaStore.actions

export const slctRengaRawList = (state: RootState): TReangaList[] | undefined => state.rengaStore.rawData
export const slctCurrentRengaId = (state: RootState): string | null => state.rengaStore.currentRenga
export const slctCurrentRengaVerses = (state: RootState): TVerse[] | [] => state.rengaStore.verses

export const slctVersesTopics = createSelector([slctCurrentRengaVerses], (rengaVerses): string[] => {
  let result: string[] = ['луна', 'любовь', 'цветение']

  _.mapValues(rengaVerses, (v: TVerse) => {
    if (v.topics) {
      result = [...result, ...v.topics]
    }
  })

  return _.uniq(result)
})

export const slctCurrentRengaInfo = createSelector([slctRengaRawList, slctCurrentRengaId], (rengaRawList, currentRengaId): TReangaList | undefined => {
  let result: TReangaList | undefined

  if (rengaRawList && rengaRawList.length > 0) {
    const tmp: TReangaList[] = rengaRawList?.filter((x) => x.id === currentRengaId)
    if (tmp.length > 0) {
      [result] = tmp
    }
  }

  return result
})
