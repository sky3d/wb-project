import React, { FC } from 'react'
import styles from './checkbox.module.css'
import { TCheckbox } from './types'

// export const TestBaner: FC<TCheckbox> = ({ title }): JSX.Element => {

export const CheckBox: FC<TCheckbox> = ({
  name, label, checked, disabled,
}): JSX.Element => (
        <div className={styles.checkbox}>
            <input className={styles.customCheckbox} type="checkbox" id={name} name={name} checked={checked} disabled={disabled}/>
            <label htmlFor={name}>{label}</label>
        </div>
)
