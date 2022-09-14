import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'

import './index.css'
import { MainPage } from './pages/main'
import { store } from './services/store'

ReactDOM.render(
  <Provider store={store}>
    <MainPage />
  </Provider>,
  document.getElementById('root')
)
