import React, { CSSProperties, FC } from 'react'
import styles from './textareaV1.module.css'

type TTextareaV1 = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  label?: string
  styleImput?: CSSProperties | undefined
  styleLable?: CSSProperties | undefined
}

export const TextareaV1: FC<TTextareaV1> = (props): JSX.Element => (
  <div className={styles.inputBox} style={{ ...props.style }}>
    <textarea style={{ ...props.styleImput }} rows={5} cols={45} name={props.name} required defaultValue={props.defaultValue}></textarea>
    <label style={{ ...props.styleLable }} >{props.label}</label>
  </div>
)
