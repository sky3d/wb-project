import React, { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckBox } from '../../components/checkbox/checkbox'
import { Radiobox } from '../../components/radiobox/radiobox'

import styles from './renga-create-dialog.module.css'

export const RengaCreateDialog = (): JSX.Element => {
  const [baterText, setBaterText] = useState('>')
  const [customFg, setCustomFg] = useState(false)
  const [nextFg, setNextFg] = useState(false)

  const onClick = () => {
    setBaterText([...baterText].reverse().join(''))
  }

  const onChangeRadio1 = () => {
    setCustomFg(false)
    setNextFg(true)
  }
  const onChangeRadio2 = () => {
    setCustomFg(true)
    setNextFg(true)
  }

  return (
        // <span className={styles.baner} onClick={onClick}>
        //     <span className={styles.unselectable}>{baterText}</span>
        // </span>
        <section className={styles.baner}>
            <div className={styles.mainBlockTitle}>Какую ренгу хотите создать?</div>
            <div className={styles.mainBlock}>
                <div className={styles.mainBlockItem}>
                    <select>
                        <option value="1">Касен 20 строк</option>
                        <option value="2">неКасен 20 строк</option>
                        <option value="3">Касен не 20 строк</option>
                    </select>
                    <div className={styles.nullDiv}></div>
                    <Radiobox name={'test'} onChange={onChangeRadio1} />
                </div>
                <div className={styles.mainBlockItem}>
                    <span>Свои настройки</span>
                    <div className={styles.nullDiv}></div>
                    <Radiobox name={'test'} onChange={onChangeRadio2} />
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div className={styles.nullDiv}></div>
                <button style={{ height: 60, width: 60, borderRadius: '50%', fontSize: 30 }} disabled={!nextFg}>
                    {nextFg && (
                        <Link to={customFg ? '/renga_custom' : '/renga'} style={{ textDecoration: 'none' }}>
                            {'>'}
                        </Link>
                    )}
                </button>
            </div>
        </section>
  )
}
