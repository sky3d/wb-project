import React, { FC, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVerseInRenga, slctCurrentRengaId, slctCurrentRengaVerses, slctVersesTopics, TVerse } from '../../services/slices/renga'
import { TPage } from '../../utils/types'

import { getH1, OptionsPanel } from '../other/options-panel/option-panel'
import styles from './renga-edit-panel.module.css'
import { VerseItem } from './verse-item'

type TVersePanel = TPage

export const VersePanel: FC<TVersePanel> = ({ height }): JSX.Element => {
  const dispatch = useDispatch()

  const toolRef = useRef(undefined)
  const captopnRef = useRef(undefined)

  // const [verses, setVerses] = useState<[TVerse] | []>([])
  const currentRengaId = useSelector(slctCurrentRengaId)
  const verses = useSelector(slctCurrentRengaVerses)

  const [strofPanelHeight, setStrofPanelHeight] = useState(0)
  const [addCount, setAddCount] = useState(1)
  const [tagsIdx, setEditIdx] = useState('')

  useEffect(() => {
    if (toolRef.current) {
      setStrofPanelHeight(captopnRef.current.offsetHeight - toolRef.current.offsetHeight)
    }
  }, [height, toolRef.current, captopnRef.current])

  return (
    <OptionsPanel>
      <span>{getH1('Строфы')}</span>
      <div className="flex flex-col justify-between h-full" ref={captopnRef}>

        <div className="overflow-auto" style={{ height: strofPanelHeight }}>
          {verses.map((x, idx) => (
            <div key={`strof${idx}`}>
              <VerseItem item={x} topiksIdx={tagsIdx} topiksCb={(id) => { setEditIdx(id) }} />
            </div>
          ))}
        </div>

        <div ref={toolRef}>
          <div className="flex justify-end border py-2 px-2 gap-3">
            <input
              className={styles.inp}
              style={{ width: 50 }}
              type="number"
              min={1}
              defaultValue={addCount}
              onChange={(e) => {
                setAddCount(+e.target.value)
              }}
            />

            <button
              className="bg-gray-500 text-slate-100 px-4 py-1 cursor-pointer hover:bg-slate-400"
              onClick={() => {
                const start = verses.length
                // eslint-disable-next-line no-plusplus
                for (let i = 1; i <= addCount; i++) {
                  const emptyVerse: TVerse = {
                    number: start + i,
                    topics: [],
                    season: 0,
                    format: (start + i) % 2 === 0 ? 2 : 3
                  }
                  dispatch(addVerseInRenga({ verse: emptyVerse, id: currentRengaId }))
                }
              }}
            >
              добавить
            </button>

          </div>
        </div>
      </div>
    </OptionsPanel>
  )
}
