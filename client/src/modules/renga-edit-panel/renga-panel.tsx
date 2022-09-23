import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { InputV1 } from '../../components/inputV1/inputV1'
import { TextareaV1 } from '../../components/textareaV1/textareaV1'

import { getH1, OptionsPanel } from '../other/options-panel/option-panel'

export const RengaPanel = (): JSX.Element => {
  const dispatch = useDispatch()
  const formRef = useRef(undefined)

  return (
    <OptionsPanel>
      {getH1('Ренга')}
      <form ref={formRef} className="flex flex-col gap-4">
        <InputV1
          styleLable={{ color: 'cadetblue' }}
          styleImput={{ paddingLeft: 5, borderBottom: '2px solid #f0f0f0', color: '#000' }}
          type="text"
          name="name"
          label={'Название'}
        />

        <TextareaV1
          styleLable={{ color: 'cadetblue' }}
          styleImput={{ paddingLeft: 5, borderBottom: '2px solid #f0f0f0', color: '#000' }}
          name="description"
          label={'Описание'}
        />
      </form>
    </OptionsPanel>
  )
}
