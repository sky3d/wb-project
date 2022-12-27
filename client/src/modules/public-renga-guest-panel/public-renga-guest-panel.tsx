import React, { FC, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ButtonV2 } from '../../components/buttonV2/buttonV2'
import { InputV1 } from '../../components/inputV1/inputV1'
import { TextareaV1 } from '../../components/textareaV1/textareaV1'
import { slctCurrentRengaInfo, slctCurrentRengaVerses } from '../../services/slices/renga'
import { TPage } from '../../utils/types'
import { OptionsPanel } from '../other/options-panel/option-panel'
import { VerseItem } from '../renga-edit-panel/verse-item'

export const PublicRengaGuestPanel: FC<TPage> = (props): JSX.Element => {
  const currentRengaInfo = useSelector(slctCurrentRengaInfo)
  const currentRengaVerses = useSelector(slctCurrentRengaVerses)

  const toolRef = useRef(null)
  const captopnRef = useRef(null)
  const [strofPanelHeight, setStrofPanelHeight] = useState(0)
  const [activeVerse, setActiveVerse] = useState(null)

  useEffect(() => {
    const activeNumber = currentRengaInfo?.options?.active
    const _activeVerse = currentRengaVerses.filter((x) => x.number === activeNumber)[0]

    setActiveVerse(_activeVerse)
  }, [currentRengaInfo, currentRengaVerses])

  useEffect(() => {
    if (toolRef.current) {
      setStrofPanelHeight(props.height - toolRef.current.offsetHeight - 54)
    }
  }, [props.height, toolRef.current, captopnRef.current])

  const getInputOption = (label: string): {} => ({
    label,
    styleImput: { color: '#000', borderBottom: '1px solid silver' },
    styleLable: { color: 'silver' }
  })

  return <div style={{ height: props.height, maxHeight: props.height }} className="flex gap-3 justify-center pb-2">
    <OptionsPanel>
      <div className="flex flex-col gap-2" >
        <div style={{ height: strofPanelHeight }} className="shadow-md px-1 py-2">
          {activeVerse && <VerseItem item={activeVerse} topiksIdx={''} topiksCb={(id) => { }} vnumber={activeVerse?.number} editFg={false} />}
        </div>
        <div ref={toolRef} className="flex flex-col gap-2">
          <InputV1 {...getInputOption('Строка 1')} />
          <InputV1 {...getInputOption('Строка 2')} />
          {currentRengaInfo?.options?.action % 2 !== 0 && <InputV1 {...getInputOption('Строка 3')} />}
          <div className="flex justify-center">
          <ButtonV2 width={200} onClick={() => { }} >Отправить вариант</ButtonV2>
          </div>
        </div>
      </div>

    </OptionsPanel>
    <OptionsPanel>
      <div style={{ height: strofPanelHeight }} className="shadow-md px-1 py-1">PublicRengaGuestPanel</div>
      <div ref={toolRef} className="flex flex-col gap-2">
        <TextareaV1 {...getInputOption('Ваш комментарий')} />
        <ButtonV2 width={200} onClick={() => { }}>Отправить комментарий</ButtonV2>
      </div>
    </OptionsPanel>
  </div>
}
