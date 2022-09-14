import _ from 'lodash'
import React, { CSSProperties, FC, HTMLInputTypeAttribute, useEffect, useState } from 'react'
import styles from './selectV1.module.css'

type TSelectV1 = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  placeholder: string
  option: {
    title: string
    id: number
  }[]
}

export const SelectV1: FC<TSelectV1> = (props): JSX.Element => {
  const [value, setValue] = useState({})
  const [active, setActive] = useState(false)
  const [dropCss, setdropCss] = useState(styles.dropdown)

  useEffect(() => {
    if (active) {
      setdropCss(`${styles.dropdown} ${styles.active}`)
    } else {
      setdropCss(styles.dropdown)
    }
  }, [active])

  return (
    <div
      className={dropCss}
      onClick={() => {
        setActive(!active)
      }}
    >
      <input className={styles.textBox} type={'text'} placeholder={value.title ? value.title : props.placeholder} readOnly />
      <div className={styles.option}>
        {props.option.map((x) => (
          <div
            onClick={() => {
              setValue(x)
            }}
          >
            {x.title}
          </div>
        ))}
      </div>
    </div>
  )
}
