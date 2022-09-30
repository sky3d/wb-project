import React, { CSSProperties, FC } from 'react'
import styles from './inputV1.module.css'

type TInputV1 = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  label?: string
  styleImput?: CSSProperties | undefined
  styleLable?: CSSProperties | undefined
  onChangeValue?: React.ChangeEventHandler<HTMLInputElement> | undefined
}

export const InputV1: FC<TInputV1> = (props): JSX.Element => (
  <div className={styles.inputBox} style={{ ...props.style }}>
    <input
      style={{ ...props.styleImput }}
      type={props.type}
      min={props.min}
      max={props.max}
      name={props.name}
      defaultValue={props.defaultValue}
      autoComplete="off"
      required
      onChange={props.onChangeValue}
    />
    <label style={{ ...props.styleLable }}>{props.label}</label>
  </div>
)
