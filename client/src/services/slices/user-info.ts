/** @module userInfoReducer */
import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import { getCookie } from '../../utils/funcs'
import { authRequest, runRequest } from '../api'


import { RootState } from '../store'
import { setLoginVisible } from './app-info'




// export const updateRenga = createAsyncThunk('rengaStore/updateRenga', async (objRenga: {}, thunkApi) => {
//   await runRequest(`renga/${objRenga.id}`, 'POST', objRenga, 'updateRenga')
// })

export const loginUser = createAsyncThunk('userInfoReducer/getUserInfo', async (ruid, thunkApi) => {
  // let ruid = getCookie('ruid')
  await authRequest('/auth/google', 'GET', {}, '', '')
  console.log('getCookie wb-renga-jwt)', getCookie('wb-renga-jwt'))

  return getCookie('wb-renga-jwt')
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
      if (action.payload?.input) {
        state.auth = true
        localStorage.setItem('accesToken', action.payload.input.split('=')[1])
        document.cookie = `wb-renga-jwt=${''}`
      }
    })
  }
})

export const { setAuth } = userInfoReducer.actions
export const selectAuth = (state: RootState) => state.userInfo.auth
export const selectOwnerId = (state: RootState) => state.userInfo.ownerId
