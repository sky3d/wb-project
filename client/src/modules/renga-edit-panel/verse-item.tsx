import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SelectV1, TSelectV1OptionsItem } from '../../components/selectV1/selectV1'
import { editVerse, slctCurrentRengaId, TVerse } from '../../services/slices/renga'
import { VerseSeason, VerseSeasonRu } from '../../utils/vars'
import styles from './renga-edit-panel.module.css'

// eslint-disable-next-line no-restricted-globals
const listSeson = (): TSelectV1OptionsItem[] => Object.keys(VerseSeasonRu).filter((x) => isNaN(Number(x))).map((item) => ({ id: `${VerseSeasonRu[item]}`, title: item }))

type TVerseItem = {
  item: TVerse
}

export const VerseItem: FC<TVerseItem> = ({ item }): JSX.Element => {
  const dispatch = useDispatch()
  const currentRengaId = useSelector(slctCurrentRengaId)

  const onChangeSeson = (sesonId: string) => {
    if (sesonId) {
      dispatch(editVerse({ verse: { ...item, seson: +sesonId }, id: currentRengaId }))
    }
  }

  return <div
    key={`strofa${item.number}`}
    className={`px-5 py-2 border mt-1 flex justify-between gap-1 ${styles[`bg${VerseSeason[item.seson]}`]}`}
  >
    <div className="flex justify-start gap-1">
      <div className="font-bold">{item.number}</div>
      <div>
        сезон: <SelectV1
          onChangeValue={onChangeSeson}
          option={listSeson()}
          defaultValue={item.seson}
          styleInput={{ textTransform: 'uppercase', fontStyle: 'italic', paddingLeft: 5 }}
          style={{ float: 'right' }}
        />

      </div>

    </div>
    <div>
      Топик:
      {item.tags.map((x, tidx) => (
        <span key={`tag${x.number}${tidx}`}> {x},</span>
      ))}
    </div>
  </div>
}
