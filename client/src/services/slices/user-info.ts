/** @module userInfoReducer */
import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import { getCookie } from '../../utils/funcs'
import { authRequest, makeAuthHeader, runRequest } from '../api'

import { RootState } from '../store'
import { setLoginVisible } from './app-info'

// export const updateRenga = createAsyncThunk('rengaStore/updateRenga', async (objRenga: {}, thunkApi) => {
//   await runRequest(`renga/${objRenga.id}`, 'POST', objRenga, 'updateRenga')
// })

export const loginUser = createAsyncThunk('userInfoReducer/loginUser', async (ruid, thunkApi) => {
  // let ruid = getCookie('ruid')
  await authRequest('/auth/google', 'GET', {}, '', '')

  return getCookie('wb-renga-jwt')
})

export const getUserInfo = createAsyncThunk('userInfoReducer/getUserInfo', async (token: string, thunkApi) => {
  const data = await runRequest('/me', 'GET', {}, '', makeAuthHeader(token), '')

  return data
})

const initUerInfoState = { auth: false, ownerId: null }

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
      console.log('action.payload', action.payload)

      if (action.payload?.input) {
        state.auth = true
        const tokenStr = action.payload.input.split('=')[1]
        const token = tokenStr.split('.')
        console.log('token', token)
        token.pop()
        console.log('token', token)

        localStorage.setItem('accessToken', token.join('.'))
        // document.cookie = `wb-renga-jwt=${''}`
      }
    })

    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      console.log(action.payload)
    })
  }
})

export const { setAuth } = userInfoReducer.actions
export const selectAuth = (state: RootState) => state.userInfo.auth
export const selectOwnerId = (state: RootState) => state.userInfo.ownerId
