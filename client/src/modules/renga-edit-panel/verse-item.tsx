import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSeedling, faFan, faSun, faLeaf } from '@fortawesome/free-solid-svg-icons'
import { faSnowflake } from '@fortawesome/free-regular-svg-icons'
import { Menu1, TMenu1Item } from '../../components/menu1/menu1'

import { editVerse, slctCurrentRengaId, TVerse } from '../../services/slices/renga'
import { seasonColor, verseSeason, VerseSeasonRu } from '../../utils/vars'

import styles from './renga-edit-panel.module.css'

const getMenuOptionFromFAI = (): TMenu1Item[] => {
  const seasonIcon = [faSeedling, faSnowflake, faFan, faSun, faLeaf]

  return VerseSeasonRu.map((x, i) => ({
    id: `${i}`,
    title: x,
    icon: <FontAwesomeIcon icon={seasonIcon[i]} />,
    color: seasonColor[i]
  }))
}

type TVerseItem = {
  item: TVerse
}

export const VerseItem: FC<TVerseItem> = ({ item }): JSX.Element => {
  const dispatch = useDispatch()
  const currentRengaId = useSelector(slctCurrentRengaId) || ''

  const onChangeseason = (seasonId: string) => {
    if (seasonId) {
      dispatch(editVerse({ verse: { ...item, season: +seasonId }, id: item.id }))
    }
  }

  const colorType = `bg${verseSeason[item.season]}`

  return <div
    key={`strofa${item.number}`}
    className={`px-5 py-2 border mt-1 flex justify-between gap-1 ${styles[colorType]}`}
  >
    <div className="flex justify-start gap-1">
      <div className="font-bold">{item.number}</div>
      <div className="flex gap-2">
        <div>сезон: </div>
        <div className="relative" style={{ marginTop: 3 }}>
          <Menu1 onChangeCB={onChangeseason} data={getMenuOptionFromFAI()} defaultValue={`${item.season}`} />
        </div>
      </div>

    </div>
    <div>
      Топик:
      {item.topics && item.topics.map((x, tidx) => (
        <span key={`tag${item.number}${tidx}`}> {x},</span>
      ))}
    </div>
  </div>
}
