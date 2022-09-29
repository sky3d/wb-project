import React, { FC, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ButtonV2 } from '../../../components/buttonV2/buttonV2'
import { InputV1 } from '../../../components/inputV1/inputV1'
import { TextareaV1 } from '../../../components/textareaV1/textareaV1'
import { createRenga, slctCurrentRengaInfo, updateRenga } from '../../../services/slices/renga'
import { getH1, OptionsPanel } from '../options-panel/option-panel'

type TRengaEditForm = {
  title: string
}

export const RengaEditForm: FC<TRengaEditForm> = ({ title }): JSX.Element => {
  const dispatch = useDispatch()
  const currentRengaInfo = useSelector(slctCurrentRengaInfo)
  const formRef = useRef(undefined)

  return <OptionsPanel><form ref={formRef} className="flex flex-col gap-4">
    {getH1(title)}
    <InputV1
      styleLable={{ color: 'cadetblue' }}
      styleImput={{ paddingLeft: 5, borderBottom: '2px solid #f0f0f0', color: '#000' }}
      type="text"
      name="name"
      label={'Название'}
      defaultValue={currentRengaInfo?.name}
    />
    <TextareaV1
      styleLable={{ color: 'cadetblue' }}
      styleImput={{ paddingLeft: 5, borderBottom: '2px solid #f0f0f0', color: '#000' }}
      name="description"
      label={'Описание'}
      defaultValue={currentRengaInfo?.description}
    />
  </form>
    <div className="flex justify-end">
      <ButtonV2
        onClick={() => {
          const data = new FormData(formRef.current)
          const formSendObj = Object.fromEntries(data.entries())
          if (formSendObj.name.length === 0) {
            alert('Не все поля заполнены')
          } else if (!currentRengaInfo) {
            dispatch(createRenga(Object.fromEntries(data.entries())))
          } else {
            dispatch(updateRenga({ ...currentRengaInfo, ...Object.fromEntries(data.entries()) }))
          }
        }}
      >
        {currentRengaInfo ? 'Сохранить' : 'Создать ренгу'}
      </ButtonV2>
    </div></OptionsPanel>
}
