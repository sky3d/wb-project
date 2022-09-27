import React, { FC } from 'react'
import { VersePanel } from './verse-panel'
import { TPage } from '../../utils/types'
import { RengaPanel } from './renga-panel'

type TRengaEditPanel = TPage | {
  idRenga: number
}

export const RengaEditPanel: FC<TRengaEditPanel> = (props): JSX.Element => (
    <div style={{ height: props.height, maxHeight: props.height }} className="flex gap-3 justify-center pb-2">
      <VersePanel height={props.height} />
      <RengaPanel />
    </div>
)
