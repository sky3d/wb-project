import React, { FC, HTMLInputTypeAttribute } from 'react'
import styles from './inputV1.module.css'

type TInputV1 = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  label?: string
}

export const InputV1: FC<TInputV1> = (props): JSX.Element => (
  <div className={styles.inputBox}>
    <input className={styles.test} type={props.type} name={props.name} defaultValue={props.defaultValue} autoComplete="off" required />
    <label>{props.label}</label>
  </div>
)
