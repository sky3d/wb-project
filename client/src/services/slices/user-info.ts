/** @module userInfoReducer */
import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../store'
import { setLoginVisible } from './app-info'

export const loginUser = createAsyncThunk('userInfoReducer/getUserInfo', async (ruid, thunkApi) => {
  // let ruid = getCookie('ruid')
  console.log(ruid)
  thunkApi.dispatch(setLoginVisible(false))

  return true
})

const initUerInfoState = { auth: false }

export const userInfoReducer = createSlice({
  name: 'userInfo',
  initialState: initUerInfoState,
  reducers: {
    setAuth: (state, action) => {
      state.auth = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.auth = action.payload
    })
    builder.addCase(loginUser.rejected, (state, action) => {
      console.log('Ошибка аторизации')
    })
  }
})

export const { setAuth } = userInfoReducer.actions
export const selectAuth = (state: RootState) => state.userInfo.auth
