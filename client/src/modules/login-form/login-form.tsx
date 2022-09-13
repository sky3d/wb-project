import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { ButtonV2 } from '../../components/buttonV2/buttonV2'
import { CardTransparent } from '../../components/card-transparent/card-transparent'
import { InputV1 } from '../../components/inputV1/inputV1'
import { loginUser } from '../../services/slices/user-info'
import { getCookie } from '../../utils/funcs'
import { useDebounce } from '../../utils/hooks'

const btnColorOptions = {
  color1: 'rgb(11, 22, 33, 0.8)',
  bgColor: 'rgb(11, 22, 33, 0.8)',
  txtColor: '#fff'
}

export const LoginForm = (): JSX.Element => {
  const dispatch = useDispatch()

  const login = () => {
    const ruid = getCookie('ruid')
    dispatch(loginUser(ruid))
  }

  return (
    <CardTransparent title={'Логин'} submitTitle={'Войти'}>
      <InputV1 type="text" name="login" label={'Логин'} />
      <InputV1 type="password" name="password" label={'Пароль'} />
      <div className="flex justify-between gap-3">
        <ButtonV2 color="#edb100e3" {...btnColorOptions} onClick={login}>
          войти
        </ButtonV2>
        <ButtonV2 color="#09ff00" width={175} {...btnColorOptions} onClick={login}>
          зарегистрироваться
        </ButtonV2>
      </div>
    </CardTransparent>
  )
}
