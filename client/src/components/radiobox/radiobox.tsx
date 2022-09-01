import React, { FC } from 'react'
import styles from './radiobox.module.css'
import { TRadiobox } from './types'

// export const TestBaner: FC<TCheckbox> = ({ title }): JSX.Element => {

export const Radiobox: FC<TRadiobox> = ({ name, label, checked, disabled, onChange }): JSX.Element => {
  const handleChange = () => {
    if (onChange) {
      onChange()
    }
  }

  return (
        <div className={styles.radio}>
            <label className={styles.customRadio}>
                <input type="radio" id={name} name={name} checked={checked} disabled={disabled} onChange={handleChange} />
                <span>{label}</span>
            </label>
        </div>
  )
}
