import React, { FC, useEffect, useState } from 'react'
import { generateUID } from '../../utils/funcs'
import { TStrJSXNull } from '../../utils/types'

import styles from './segment-button.module.css'

type TSegmetItem = {
  id: string | number
  title: TStrJSXNull
}

type TSegmetButton = {
  buttons: TSegmetItem[]
  defaultValue?: string | number
  onChangeEvnt: Function
  style?: object
}

export const SegmetButton: FC<TSegmetButton> = ({ buttons, defaultValue, onChangeEvnt, style = {} }): JSX.Element => {
  const [curValue, setCurValue] = useState(defaultValue)

  useEffect(() => {}, [])
  const groupId = generateUID()

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setCurValue(e.target.value)
    onChangeEvnt(e.target.value)
  }

  return (
    <div className={styles.form_radio_group}>
      {buttons.map((x) => {
        const idx = `radio-${x.id}`

        return (
          <div key={idx} className={styles['form_radio_group-item']}>
            <input id={idx} type="radio" name={groupId} value={x.id} checked={x.id === curValue} onChange={onChange} />
            <label htmlFor={idx}>{x.title}</label>
          </div>
        )
      })}
    </div>
  )
}
