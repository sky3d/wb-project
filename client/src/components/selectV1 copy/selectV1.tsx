import React, { FC, useEffect, useRef, useState } from 'react'
import styles from './selectV1.module.css'

export type TSelectV1OptionsItem = {
  title?: string
  id?: number
}

type TSelectV1 = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  placeholder: string
  option: TSelectV1OptionsItem[]
  name?: string
  onChangeValue: Function
  style?: React.CSSProperties
}

export const SelectV1: FC<TSelectV1> = (props): JSX.Element => {
  const [value, setValue] = useState<TSelectV1OptionsItem>({})
  const [active, setActive] = useState(false)
  const [dropCss, setdropCss] = useState(styles.dropdown)

  useEffect(() => {
    if (active) {
      setdropCss(`${styles.dropdown} ${styles.active}`)
    } else {
      setdropCss(styles.dropdown)
    }
  }, [active])

  useEffect(() => {
    if (props.onChangeValue) {
      props.onChangeValue(value.id)
    }
  }, [value])

  return (
    <div

      className={dropCss}
      onClick={() => {
        setActive(!active)
      }}
      style={{ ...props.style }}
    >
      <input
        className={styles.textBox}
        type={'text'}
        placeholder={value.title ? value.title : props.placeholder}
        name={props.name}
        readOnly
      />
      <div className={styles.option}>
        {props.option.map((x) => (
          <div
            key={x.id}
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
