import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { OptionsPanel } from '../other/options-panel/option-panel'

export const PublicRengaAdminPanel: FC<TPage> = (props): JSX.Element => (
  <div style={{ height: props.height, maxHeight: props.height }} className="flex gap-3 justify-center pb-2">
     <OptionsPanel>
      <div>q</div>
     </OptionsPanel>
     <OptionsPanel>
      <div>f</div>
     </OptionsPanel>
  </div>
)
