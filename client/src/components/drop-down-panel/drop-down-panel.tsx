import React, { FC, ReactNode, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

type TDropDownPanel = {
  title: string
  children: ReactNode
  expanted: boolean
}

export const DropDownPanel: FC<TDropDownPanel> = ({ children, title, expanted = true }): JSX.Element => {
  const [open, setOpen] = useState(expanted)
  useEffect(() => {
    console.log('open:', open)
  }, [open])

  return (
    <div className="border">
      <div
        className="border-b-2 py-2 px-2 font-bold flex justify-between cursor-pointer"
        onClick={() => {
          setOpen(!open)
        }}
      >
        <span>{title}</span>
        <span>V</span>
      </div>
      {open && <div className="py-2 px-2">{children}</div>}
    </div>
  )
}
