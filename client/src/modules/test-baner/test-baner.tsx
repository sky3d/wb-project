import React, { FC, useState } from 'react'
import { linkSync } from 'fs'
import { Link } from 'react-router-dom'
import { TTestBaner } from './types'

import styles from './test-baner.module.css'

export const TestBaner: FC<TTestBaner> = ({ title }): JSX.Element => {
  const [baterText, setBaterText] = useState(title)
  const onClick = () => {
    setBaterText([...baterText].reverse().join(''))
  }

  return (
        <span className={styles.baner}>
            <Link to="/renga_create" className={styles.unselectable}>
                {baterText}
            </Link>
        </span>
  )
}
