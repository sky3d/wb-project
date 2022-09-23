import React, { FC, useEffect, useRef, useState } from 'react'
import styles from './tooltype.module.css'

type TTooltype = {
  children: React.ReactNode
  msgChildren: React.ReactNode | string
}

export const Tooltype: FC<TTooltype> = ({ children, msgChildren }): JSX.Element => {
  const msg = useRef(null)
  const [popupStyle, setPopupStyle] = useState({})

  useEffect(() => {
    setPopupStyle({ marginTop: -msg.current.offsetHeight })
  }, [])

  return (
    <div className={styles.li}>
      <div ref={msg} className={styles.content} style={popupStyle}>
        {msgChildren}
      </div>
      <div>{children}</div>
    </div>
  )
}
