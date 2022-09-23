import React, { FC } from 'react'

export type TOptionsPanel = {
  children: React.ReactNode
}
export const OptionsPanel: FC<TOptionsPanel> = ({ children }): JSX.Element => (
  <div className="border relative h-full w-1/2 overflow-scroll pt-2 px-2 flex flex-col gap-2">{children}</div>
)
export const getH1 = (title: string): JSX.Element => <h1 className="text-xl font-semibold text-center">{title}</h1>
