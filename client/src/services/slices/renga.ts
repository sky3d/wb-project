/** @module userInfoReducer */
import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { errorResponsString } from '../../utils/vars'
import { runRequest } from '../api'
import { RootState } from '../store'
import { setCurrentPage } from './app-info'

// export const getUserInfo = createAsyncThunk('userInfoReducer/getUserInfo', async (tmp, thunkApi) => {
//   const dispatch = thunkApi.dispatch
//   var loc = document.location.pathname.split('/', 3)
//   try {
//     // @ts-ignore
//     loc = loc[2]

//     if (loc.indexOf('_') === -1) {
//       // @ts-ignore
//       loc = getCookie('manuscriptsid')
//     } else {
//       document.cookie = 'manuscriptsid=' + loc
//     }
//   } catch (er) {
//     // @ts-ignore
//     loc = getCookie('manuscriptsid')
//   }

//   const response = await postRequest([loc], 'user.getUserInfo')
//   const data = await response.json()

//   try {
//     if (data.error) {
//       throw new Error(`${errorResponsString} ${data.error}`)
//     }
//     if (typeof data.result === 'string' && data.result.indexOf('Traceback') > -1) {
//       throw new Error(`${errorResponsString} ${data.result}`)
//     }
//   } catch (e) {
//     throw new Error(`${errorResponsString} ${e}`)
//   }

//   // проставляем дополнительные настройки и справочники
//   dispatch(generalReducer.actions.setReferenceAddress(data.result.extends.referenceAddres))
//   dispatch(generalReducer.actions.setAddressList(data.result.extends.addressList))
//   dispatch(generalReducer.actions.setSuppliers(data.result.extends.vndStatList))
//   dispatch(generalReducer.actions.setUsers(data.result.extends.usersList))

//   // vndStatList
//   // console.log(data.result.extends.referenceAddres, '-------')

//   return data.result
// })

export const createRenga = createAsyncThunk('rengaStore/createRenga', async (objRenga: {}, thunkApi) => {
  const response = await runRequest('renga', 'POST', objRenga)
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

type TReangaList = {
  createdAt: string | null
  description: string | null
  id: string
  name: string | null
  status: number
  updatedAt: string | null
}

export type TInitRengaStore = {
  rawData: [TReangaList] | undefined
}

const initRengaDataState: TInitRengaStore = { rawData: undefined }

export const rengaStore = createSlice({
  name: 'rengaStore',
  initialState: initRengaDataState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRengaList.fulfilled, (state, action: PayloadAction<[TReangaList]>): void => {
      state.rawData = action.payload
    })
    builder.addCase(getRengaList.rejected, (state, action) => {
      console.log(action.error.message)
    })

    builder.addCase(createRenga.rejected, (state, action) => {
      console.log(action.error.message)
    })
  }
})

export const slctRengaRawList = (state: RootState) => state.rengaStore.rawData
