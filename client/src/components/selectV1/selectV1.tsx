import React, { FC, useEffect, useRef, useState } from 'react'
import styles from './selectV1.module.css'

export type TSelectV1OptionsItem = {
  title?: string
  id?: number
}

type TSelectV1 = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  placeholder?: string
  option: TSelectV1OptionsItem[]
  name?: string
  onChangeValue: Function
  style?: React.CSSProperties
  styleInput?: React.CSSProperties
  defaultValue: string
}

export const SelectV1: FC<TSelectV1> = (props): JSX.Element => {
  const [value, setValue] = useState<TSelectV1OptionsItem>({})
  const [active, setActive] = useState(false)
  const [dropCss, setdropCss] = useState(styles.dropdown)

  useEffect(() => {
    try {
      setValue(props.option.filter((x) => x.id * 1 === props.defaultValue * 1)[0])
    } catch (er) { console.log('er:', er) }
  }, [props.defaultValue])

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
        style={{ ...props.styleInput }}
        type={'text'}
        value={value.title || ''}
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
