import { combineReducers } from 'redux'
import { appReducer } from './slices/app-info'
import { rengaStore } from './slices/renga'
import { userInfoReducer } from './slices/user-info'

// rootReduser
export const rootReducer = combineReducers({
  appInfo: appReducer.reducer,
  rengaStore: rengaStore.reducer,
  userInfo: userInfoReducer.reducer
})
