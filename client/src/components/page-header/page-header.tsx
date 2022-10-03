import React, { FC } from 'react'

type TStrJSXNull = string | JSX.Element
type TPageHeader = {
  title?: TStrJSXNull
  subTitle?: TStrJSXNull
  extra?: JSX.Element[]
}

export const PageHeader: FC<TPageHeader> = ({ title, subTitle, extra }): JSX.Element => (
  <header className="py-4 flex justify-between">
    <div>
      <span className="text-xl font-semibold pr-3 cursor-pointer"
        onClick={() => window.open(document.location.href.split('/').slice(0, 3).join('/'), '_self')}>{title}</span>
      <span className="text-sm text-gray-400">{subTitle}</span>
    </div>
    <div className='flex gap-1'>
      {extra}
    </div>
  </header>
)
