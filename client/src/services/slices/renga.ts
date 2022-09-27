import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { errorResponsString } from '../../utils/vars'
import { runRequest } from '../api'
import { RootState } from '../store'
import { setCurrentPage } from './app-info'
import { selectOwnerId } from './user-info'


export const createRenga = createAsyncThunk('rengaStore/createRenga', async (objRenga: {}, thunkApi) => {
  const state: RootState = thunkApi.getState()
  const owner = selectOwnerId(state)

  const response = await runRequest('renga', 'POST', { ...objRenga, owner, options: { index: 5, sabaki: 'greg.rabota@gmail.com' } })
  const data = await response.json()

  if (data.error) {
    throw new Error(`${errorResponsString} ${data.error}`)
  }

  thunkApi.dispatch(setCurrentPage(1))

  return data
})

export const getRengaList = createAsyncThunk('rengaStore/getRengaList', async () => {
  const response = await runRequest('renga/list', 'GET')
  const data = await response.json()

  if (data.error) {
    throw new Error(`${errorResponsString} ${data.error}`)
  }

  return data
})

export const getRengaVerses = createAsyncThunk('rengaStore/getRengaVerses', async (tmp, _thunkApi) => {
  // const response = await runRequest('renga/list', 'GET')
  // const data = await response.json()

  // if (data.error) {
  //   throw new Error(`${errorResponsString} ${data.error}`)
  // }
  // console.log(getRengaVerses, tmp)
  const data: TVerse[] | [] = []

  return []
})

type TAddVerseInRengaOptions = {
  id: string
  verse: TVerse
}
export const addVerseInRenga = createAsyncThunk('rengaStore/addVerseInRenga', async (tmp: TAddVerseInRengaOptions, _thunkApi) => tmp.verse)

export const editVerse = createAsyncThunk('rengaStore/editVerse', async (tmp: TAddVerseInRengaOptions, _thunkApi) => tmp.verse)

export type TVerse = {
  number: number
  tags: string[]
  seson: number
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
    builder.addCase(getRengaList.fulfilled, (state, action: PayloadAction<TReangaList>): void => {
      state.rawData = action.payload
    })
    builder.addCase(getRengaList.rejected, (_state, action) => {
      console.log(action.error.message)
    })

    builder.addCase(createRenga.rejected, (_state, action) => {
      console.log(action.error.message)
    })

    builder.addCase(getRengaVerses.fulfilled, (state, action: PayloadAction<TVerse[]>): void => {
      state.verses = action.payload
    })
    builder.addCase(getRengaVerses.rejected, (_state, action) => {
      console.log(action.error.message)
    })

    builder.addCase(addVerseInRenga.fulfilled, (state, action: PayloadAction<TVerse>): void => {
      state.verses.push(action.payload)
    })
    builder.addCase(addVerseInRenga.rejected, (_state, action) => {
      console.log(action.error.message)
    })

    builder.addCase(editVerse.fulfilled, (state, action: PayloadAction<TVerse>): void => {
      const tmp = [...state.verses]
      state.verses = tmp.map((verse) => +action.payload.number === +verse.number ? action.payload : verse)
    })
    builder.addCase(editVerse.rejected, (_state, action) => {
      console.log(action.error.message)
    })
  }
})

export const { setCurrentRenga } = rengaStore.actions

export const slctRengaRawList = (state: RootState): TReangaList[] | undefined => state.rengaStore.rawData
export const slctCurrentRengaId = (state: RootState): string | null => state.rengaStore.currentRenga
export const slctCurrentRengaVerses = (state: RootState): TVerse[] | [] => state.rengaStore.verses

export const slctCurrentRengaInfo = createSelector([slctRengaRawList, slctCurrentRengaId], (rengaRawList, currentRengaId): TReangaList | null => {
  let result: TReangaList | null = null

  if (rengaRawList && rengaRawList.length > 0) {
    const tmp: TReangaList[] = rengaRawList?.filter((x) => x.id === currentRengaId)
    if (tmp.length > 0) {
      [result] = tmp
    }
  }

  return result
})
