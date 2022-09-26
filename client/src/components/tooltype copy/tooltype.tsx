import { fchown } from 'fs'
import React, { FC, useEffect, useRef, useState } from 'react'
import styles from './tooltype.module.css'

type TTooltype = {
  children: React.ReactNode
  msgChildren: React.ReactNode | string
  style?: React.CSSProperties
  stylePopup?: React.CSSProperties
}

export const Tooltype: FC<TTooltype> = ({ children, msgChildren, stylePopup = {} }): JSX.Element => {
  const msg = useRef(null)
  const root = useRef(null)
  const child = useRef(null)
  const [popupStyle, setPopupStyle] = useState({})
  const [lastTop, setLastTop] = useState(null)

  useEffect(() => {
    // setLastTop(root.current.offsetTop)
    // setPopupStyle({ marginTop: -msg.current.offsetHeight, '--wp': `${msg.current.offsetWidth / 2}px`, top: root.current.offsetTop })

    const rootMouseMove = (e) => {
      setPopupStyle({
        marginTop: -msg.current.offsetHeight,
        '--wp': `${msg.current.offsetWidth / 2}px`,
        top: root.current.offsetTop,
        visibility: 'visible',
        opacity: 1
      })
    }

    const rootMouseOut = (e) => {
      setPopupStyle({
        visibility: 'hidden',
        opacity: 0
      })
    }

    root.current.addEventListener('mousemove', rootMouseMove)
    root.current.addEventListener('mouseout', rootMouseOut)

    return () => {
      root.current.removeEventListener('mousemove', rootMouseMove)
      root.current.removeEventListener('mouseout', rootMouseOut)
    }
  })

  return (
    <div ref={root} className={styles.li}>
      <div ref={msg} className={styles.content} style={{ ...stylePopup, ...popupStyle }}>
        {msgChildren}
      </div>
      <div ref={child} >{children}</div>
    </div>
  )
}
