import React, { FC, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

import styles from './editor1.module.css'

type TEditor1 = {
  onChangeValue: Function
}

export const Editor1: FC<TEditor1> = (props): JSX.Element => {
  const imputRef = useRef(null)

  useEffect(() => {
    console.log('editro1:', 'editro1')
    if (imputRef.current) {
      imputRef.current.focus()
    }
  }, [imputRef])

  const onChangeValueEditor = () => {
    props.onChangeValue(imputRef.current.value)
  }

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      props.onChangeValue(imputRef.current.value)
    }
  }

  return <div className={styles.editor}><input ref={imputRef} onBlur={onChangeValueEditor} onKeyDown={onKeyDown} /></div>
}
