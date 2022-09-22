import React, { FC, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ButtonV2 } from '../../components/buttonV2/buttonV2'
import { InputV1 } from '../../components/inputV1/inputV1'
import { SelectV1 } from '../../components/selectV1/selectV1'
import { SelectV2 } from '../../components/selectV2/selectV2'
import { TextareaV1 } from '../../components/textareaV1/textareaV1'
import { createRenga } from '../../services/slices/renga'
import { TPage } from '../../utils/types'

type TOptionsPanel = {
  children: React.ReactNode
}
const OptionsPanel: FC<TOptionsPanel> = ({ children }): JSX.Element => (
  <div className="border relative h-full w-1/2 overflow-scroll pt-2 px-2 flex flex-col gap-2">{children}</div>
)
const getH1 = (title: string): JSX.Element => <h1 className="text-xl font-semibold text-center">{title}</h1>

export const RengaCreateDialog: FC<TPage> = ({ height }): JSX.Element => {
  const dispath = useDispatch()
  const formRef = useRef(undefined)
  const [rengaType, setRengaType] = useState(null)

  const typeList = [
    { id: 1, title: 'Ручные настройки' },
    { id: 2, title: 'НЕ Ручные настройки' }
  ]

  return (
    <div style={{ height, maxHeight: height }} className="flex gap-3 justify-center pb-2">
      <OptionsPanel>
        {getH1('Настройки ренги')}
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
        <div className="flex justify-end">
          <ButtonV2
            onClick={() => {
              const data = new FormData(formRef.current)
              const formSendObj = Object.fromEntries(data.entries())
              if (formSendObj.name.length === 0) {
                alert('Не все поля заполнены')
              } else {
                dispath(createRenga(Object.fromEntries(data.entries())))
              }
            }}
          >
            Создать ренгу
          </ButtonV2>
        </div>
      </OptionsPanel>
    </div>
  )
}
