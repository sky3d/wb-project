import React, { FC, useState } from 'react'
import styles from './menu1.module.css'

export type TMenu1Item = {
  id: string
  title: string
  icon: JSX.Element
  color: string
}

type TMenu1 = {
  defaultValue?: string | null
  data: TMenu1Item[]
  onChangeCB: Function
}

export const Menu1: FC<TMenu1> = (props): JSX.Element => {
  const [activeItem, setActiveItem] = useState(props.defaultValue || '0')
  const [active, setActive] = useState(false)

  const onChange = (id: string) => {
    setActiveItem(id)
    setActive(false)
    props.onChangeCB(id)
  }

  return (<>
    <ul className={`${styles.menu} ${active ? styles.active : ''}`} title={props.data[activeItem].title} >
      <div style={{ '--clr': props.data[activeItem].color }} className={styles.toggle} onClick={() => { setActive(!active) }}>
        {props.data[activeItem].icon}
      </div>
      {props.data.map((li, idx) => <li key={`m1itm${idx}`} title={li.title} style={{ '--i': li.id, '--clr': `${li.color}` }} onClick={() => { onChange(li.id) }}>
        <span>{li.icon}</span>
      </li>)}
    </ul >
  </>)
}
