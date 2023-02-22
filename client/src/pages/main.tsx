import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ButtonV1 } from '../components/buttonV1/buttonV1'

import { PageHeader } from '../components/page-header/page-header'
import { LoginForm } from '../modules/login-form/login-form'
import { RengaCreateDialog } from '../modules/renga-create-dialog/renga-create-dialog'
import { RengaEditPanel } from '../modules/renga-edit-panel/renga-edit-panel'
import { setLoginVisible, sltAppInfoName, sltCurrentPage, sltLoginVisible } from '../services/slices/app-info'
import { getUserInfo, loginUser, selectAuth, selectUserName, setAuth } from '../services/slices/user-info'
import { generateUID, getCookie } from '../utils/funcs'
import { useWindowSize } from '../utils/hooks'

import { HomePage } from './home'

export const MainPage = (): JSX.Element => {
  const dispatch = useDispatch()
  const [_, h] = useWindowSize()
  const appName = useSelector(sltAppInfoName)
  const userAuth = useSelector(selectAuth)
  const loginVisible = useSelector(sltLoginVisible)
  const currentPage = useSelector(sltCurrentPage)
  const userName = useSelector(selectUserName)

  const headerRef = useRef<HTMLHeadingElement>(null)
  const [pageHeight, setPageHeight] = useState(0)

  useEffect(() => {
    if (userAuth) {
      dispatch(getUserInfo(localStorage.getItem('accessToken')))
    }
  }, [userAuth])

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      dispatch(setAuth(true))
    }
  }, [])

  useEffect(() => {
    if (headerRef.current) {
      setPageHeight(h - headerRef.current.offsetHeight)
    }
  }, [h, headerRef])

  const login = () => {
    dispatch(loginUser())
  }

  return (
    <div style={{ minHeight: h }}>
      <div className="max-w-screen-xl mx-auto p-0">
        {loginVisible && <LoginForm />}
        <section ref={headerRef}>
          <PageHeader
            title={appName}
            subTitle="Хоть беспощадно палит, как раньше, солнце, - осенний ветер..."
            extra={[
              <span key={generateUID()}>
                {!userAuth && (
                  <ButtonV1 color="green" size="medium" onClick={login}>
                    Войти
                  </ButtonV1>
                )}
                {userAuth && <span>{userName}</span>}
              </span>
            ]}
          />
        </section>
        <div style={{ height: pageHeight, maxHeight: pageHeight }}>
          {currentPage === 1 && <HomePage height={pageHeight} />} {currentPage === 2 && <RengaCreateDialog height={pageHeight} />}
          {currentPage === 3 && <RengaEditPanel height={pageHeight} />}
        </div>
      </div>
    </div>
  )
}
