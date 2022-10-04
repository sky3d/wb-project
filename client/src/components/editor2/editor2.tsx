import React, { FC, useEffect, useRef } from 'react'

import styles from './editor2.module.css'

type TEditor2 = {
  onChangeValue: Function
  editorName?: string
  optionsData: string[]
}

export const Editor2: FC<TEditor2> = ({ onChangeValue, optionsData, editorName = 'editor2' }): JSX.Element => {
  const imputRef = useRef(null)

  useEffect(() => {
    if (imputRef.current) {
      imputRef.current.focus()
    }
  }, [imputRef])

  const onChangeValueEditor = () => {
    onChangeValue(imputRef.current.value.toLowerCase())
  }

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      onChangeValue(imputRef.current.value.toLowerCase())
    }
  }

  return <div className={styles.editor}>
    <input ref={imputRef} onBlur={onChangeValueEditor} onKeyDown={onKeyDown} list={editorName} />
    <datalist id={editorName} className={styles.browserdata}>
      {optionsData.map((x, i) => <option key={i} value={x}></option>)}
    </datalist>
  </div>
}
