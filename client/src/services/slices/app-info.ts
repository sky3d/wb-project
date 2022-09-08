import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { notification } from 'antd'

import { errorResponsString } from '../../utils/vars'
import { RootState } from '../store'

// export const chekUser = createAsyncThunk('appReducer/chekUser', async (value, thunkApi) => {
//   // {username: 'q', password: 'q', remember: true}
//   // @ts-ignore
//   const response = await postRequest([value.username, value.password], 'api.chekUser')
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

//   // @ts-ignore
//   if (value.remember) {
//     document.cookie = `manuscriptsnews=${data.result}`
//   }

//   return data.result
// })

const initAppInfoState = { title: 'РенгаВиски', loginVisible: false }

export const appReducer = createSlice({
  name: 'appReducer',
  initialState: initAppInfoState,
  reducers: {
    setLoginVisible: (state, action) => {
      state.loginVisible = action.payload
    }
  },
  extraReducers: (builder) => {}
})

export const { setLoginVisible } = appReducer.actions

export const sltAppInfoName = (state: RootState) => state.appInfo.title
export const sltLoginVisible = (state: RootState) => state.appInfo.loginVisible
