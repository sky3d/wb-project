/** @module userInfoReducer */
import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import { getCookie } from '../../utils/funcs'
import { authRequest, makeAuthHeader, runRequest } from '../api'

import { RootState } from '../store'
import { setLoginVisible } from './app-info'

// export const updateRenga = createAsyncThunk('rengaStore/updateRenga', async (objRenga: {}, thunkApi) => {
//   await runRequest(`renga/${objRenga.id}`, 'POST', objRenga, 'updateRenga')
// })

const extractSignedToken = (input: string): string => {
  const [, value] = input.split('=')

  return value.split('.').slice(0, -1).join('.') // get rid of sign
}

export const loginUser = createAsyncThunk('userInfoReducer/loginUser', async (ruid, thunkApi) => {
  let jwt = getCookie('wb-renga-jwt')
  // await authRequest('/auth/google', 'GET', {}, '', '')
  // TODO ---- by sky3d
  // await authRequest('/auth/github', 'GET', {}, '', '')
  if (!jwt) {
    document.location.href = 'http://localhost:3000/auth/google'
  } else {
    await authRequest('/auth/google', 'GET', {}, '', '')
  }


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

        const token = extractSignedToken(action.payload.input)
        console.log('JWT=', token)

        localStorage.setItem('accessToken', token)

        document.cookie = `wb-renga-jwt=${''}`
      }
    })

    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      const { user } = action.payload
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
