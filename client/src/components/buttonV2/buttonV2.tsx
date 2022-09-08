import React, { FC } from 'react'
import styles from './buttonV2.module.css'

type TButton = {
  width?: number
  disabled?: boolean
  className?: string
  children?: React.ReactNode
  color?: string
  color1?: string
  bgColor?: string
  txtColor?: string
  onClick: React.MouseEventHandler<HTMLDivElement>
}

export const ButtonV2: FC<TButton> = ({
  children,
  onClick,
  color = '#8a929f',
  color1 = '#fff',
  bgColor = '#fff',
  txtColor = '#000',
  width = 120
}): JSX.Element => {
  const buttonStyles = { width, '--g1': color, '--g2': color1, '--bg': bgColor, '--txt': txtColor }

  return (
    <div className={styles.container} onClick={onClick}>
      <a href="#" style={buttonStyles} className={styles.aBlock}>
        <span>{children}</span>
        <i></i>
      </a>
    </div>
  )
}
