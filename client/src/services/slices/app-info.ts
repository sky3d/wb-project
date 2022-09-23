import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

type TCurrentPage = 1 | 2 | 3

type TInitAppInfoState = {
  title: string
  loginVisible: boolean
  currentPage: TCurrentPage
}

const initAppInfoState: TInitAppInfoState = { title: 'РенгаВиски', loginVisible: false, currentPage: 3 }

export const appReducer = createSlice({
  name: 'appReducer',
  initialState: initAppInfoState,
  reducers: {
    setLoginVisible: (state, action) => {
      state.loginVisible = action.payload
    },
    setCurrentPage: (state, action: PayloadAction<TCurrentPage>) => {
      state.currentPage = action.payload
    }
  },
  extraReducers: (builder) => { }
})

export const { setLoginVisible, setCurrentPage } = appReducer.actions

export const sltAppInfoName = (state: RootState) => state.appInfo.title
export const sltLoginVisible = (state: RootState) => state.appInfo.loginVisible
export const sltCurrentPage = (state: RootState) => state.appInfo.currentPage
