import React, { FC } from 'react'
import styles from './buttonV1.module.css'

type TButton = {
  size?: 'small' | 'medium' | 'big'
  disabled?: boolean
  className?: string
  children?: React.ReactNode
  color?: string
  onClick: React.MouseEventHandler<HTMLAnchorElement>
}

export const ButtonV1: FC<TButton> = ({ children, onClick, color = 'silver', size = 'medium' }): JSX.Element => (
  <a href="#" style={{ '--clr': color }} className={styles.aBlock} onClick={onClick}>
    <span>{children}</span>
    <i></i>
  </a>
)
