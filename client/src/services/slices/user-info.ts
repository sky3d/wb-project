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

const initUerInfoState = { auth: false, ownerId: null, name: '', avatar: '' }

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
        token.pop()

        localStorage.setItem('accessToken', token.join('.'))
        // document.cookie = `wb-renga-jwt=${''}`
      }
    })

    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      const {user} = action.payload
      state.ownerId = user.id
      state.name = user.name
      state.avatar = user.avatar
    })
  }
})

export const { setAuth } = userInfoReducer.actions
export const selectAuth = (state: RootState) => state.userInfo.auth
export const selectOwnerId = (state: RootState) => state.userInfo.ownerId
export const selectUserName = (state: RootState) => state.userInfo.name
