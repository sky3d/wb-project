import React, { FC, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Tooltype } from '../../components/slide-button/tooltype'
import { TVerse } from '../../services/slices/renga'
import { TPage } from '../../utils/types'
import { VerseSeason, VerseSeasonRu } from '../../utils/vars'
import { getH1, OptionsPanel } from '../other/options-panel/option-panel'
import styles from './renga-edit-panel.module.css'

const ListSeson = (): JSX.Element => <div>
    <div>Зима</div>
    <div>Весна</div>
    <div>Лета</div>
    <div>Осень</div>
  </div>

type TVersePanel = TPage

export const VersePanel: FC<TVersePanel> = ({ height }): JSX.Element => {
  const dispatch = useDispatch()

  const toolRef = useRef(undefined)
  const captopnRef = useRef(undefined)

  const [verses, setVerses] = useState<[TVerse] | []>([])
  const [strofPanelHeight, setStrofPanelHeight] = useState(0)

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
            <div
              key={`strofa${x.number}`}
              className={`px-5 py-2 border mt-1 flex justify-between gap-1 ${styles[`bg${VerseSeason[x.sezon]}`]}`}
            >
              <div className="flex justify-start gap-1">
                <div className="font-bold">{x.number}</div>
                <Tooltype msgChildren={<ListSeson />}>
                  сезон: <span className="italic uppercase">{VerseSeasonRu[x.sezon]}</span>
                </Tooltype>
              </div>
              <div>
                Топик:
                {x.tags.map((x, tidx) => (
                  <span key={`tag${x.number}${tidx}`}> {x},</span>
                ))}
              </div>
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
              defaultValue={1}
              onChange={(e) => {
                console.log(e.target.value)
              }}
            />
            <button
              className="bg-gray-500 text-slate-100 px-4 py-1 cursor-pointer hover:bg-slate-400"
              onClick={() => {
                const emptyVerse: TVerse = {
                  number: verses.length + 1,
                  tags: [],
                  sezon: 1,
                  format: verses.length === 0 || verses[verses.length - 1].format < 3 ? 3 : 2
                }
                setVerses([...verses, emptyVerse])
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
