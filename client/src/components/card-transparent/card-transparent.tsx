import React, { FC } from 'react'
import { ButtonV2 } from '../buttonV2/buttonV2'
import styles from './card-transparent.module.css'

type TCardTransparent = {
  children: React.ReactNode
  title: string
  submitTitle: string
}

export const CardTransparent: FC<TCardTransparent> = ({ title, submitTitle, children }): JSX.Element => (
  <div className={styles.box}>
    <h2>{title}</h2>
    <form>
      {children}
    </form>
  </div>
)
