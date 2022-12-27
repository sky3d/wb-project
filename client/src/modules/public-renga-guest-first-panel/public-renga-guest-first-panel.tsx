import React, { FC, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ButtonV2 } from '../../components/buttonV2/buttonV2'
import { setCurrentPage } from '../../services/slices/app-info'
import { slctCurrentRengaInfo, slctCurrentRengaVerses, updateRenga } from '../../services/slices/renga'
import { selectOwnerId } from '../../services/slices/user-info'
import { TPage } from '../../utils/types'
import { getH1, OptionsPanel } from '../other/options-panel/option-panel'
import { VerseItem } from '../renga-edit-panel/verse-item'

export const PublicRengaGuestFirstPanel: FC<TPage> = (props): JSX.Element => {
  const dispatch = useDispatch()
  const toolRef = useRef(undefined)
  const captopnRef = useRef(undefined)

  const leftHeaderRef = useRef(undefined)


  const ownerId = useSelector(selectOwnerId)
  const currentRengaInfo = useSelector(slctCurrentRengaInfo)
  const verses = useSelector(slctCurrentRengaVerses)

  const [leftContentHeight, setLeftContentHeight] = useState(0)
  const [strofPanelHeight, setStrofPanelHeight] = useState(0)
  const [tagsIdx, setEditIdx] = useState('')

  useEffect(() => {
    if (toolRef.current) {
      const newHeight = captopnRef.current.offsetHeight - toolRef.current.offsetHeight
      setStrofPanelHeight(newHeight)
      setLeftContentHeight(newHeight - leftHeaderRef.current.offsetHeight)
      console.log('leftHeaderRef.current.offsetHeight:', leftHeaderRef.current.offsetHeight, newHeight, newHeight - leftHeaderRef.current.offsetHeight)
    }
  }, [props.height, toolRef.current, captopnRef.current, leftHeaderRef.current])

  return <div ref={captopnRef} style={{ height: props.height, maxHeight: props.height }} className=" pb-2">
    <div className='flex gap-3 justify-center ' style={{ height: strofPanelHeight }}>
      <OptionsPanel>
        <div ref={leftHeaderRef}>{getH1(currentRengaInfo.name)}</div>
        <div className="flex flex-col justify-between" style={{ height: leftContentHeight - 36 }}>
          <div className="overflow-auto" >
            {verses.map((x, idx) => (
              <div key={`strof${idx}`}>
                <VerseItem item={{ ...x }} topiksIdx={tagsIdx} topiksCb={(id) => { }} vnumber={x.number} editFg={false} />
              </div>
            ))}
          </div>
        </div>
      </OptionsPanel>

      <OptionsPanel>
        <span>{getH1('Описание')}</span>
        <div className="flex flex-col justify-between h-full" >
          {currentRengaInfo?.description}
        </div>
      </OptionsPanel>

    </div>
    <div ref={toolRef} className="flex justify-center">
      <ButtonV2 width={200} txtColor={'#fff'} bgColor={'orange'} color={'orange'} onClick={() => {
        const options = currentRengaInfo.options
        dispatch(updateRenga({ ...currentRengaInfo, options: { ...options, guests: [...(options.guests ? options.guests : []), ownerId] } }))
        dispatch(setCurrentPage(4))
      }} >Присоединиться</ButtonV2>
    </div>
  </div>
}
