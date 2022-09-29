import React, { FC } from 'react'
import { TPage } from '../../utils/types'
import { RengaEditForm } from '../other/renga-edit-form/renga-edit-form'

export const RengaCreateDialog: FC<TPage> = ({ height }): JSX.Element => (
  <div style={{ height, maxHeight: height }} className="flex gap-3 justify-center pb-2">
    <RengaEditForm title='Настройки ренги' />
  </div>
)
