import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSeedling, faFan, faSun, faLeaf, faDeleteLeft } from '@fortawesome/free-solid-svg-icons'
import { faSnowflake } from '@fortawesome/free-regular-svg-icons'
import _ from 'lodash'
import { Menu1, TMenu1Item } from '../../components/menu1/menu1'

import { deletVerse, editVerse, slctVersesTopics, TVerse } from '../../services/slices/renga'
import { seasonColor, verseSeason, VerseSeasonRu } from '../../utils/vars'

import styles from './renga-edit-panel.module.css'
import { Editor2 } from '../../components/editor2/editor2'

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
  topiksIdx: string
  topiksCb: Function
}

export const VerseItem: FC<TVerseItem> = ({ item, topiksIdx, topiksCb }): JSX.Element => {
  const dispatch = useDispatch()
  const versesTopics = useSelector(slctVersesTopics)

  const onChangeseason = (seasonId: string) => {
    if (seasonId) {
      dispatch(editVerse({ verse: { ...item, season: +seasonId }, id: item.id }))
    }
  }

  const colorType = `bg${verseSeason[item.season]}`

  const onChangeTopiksValue = (value: string) => {
    topiksCb('')
    if (value.length > 0) {
      dispatch(editVerse({ verse: { ...item, topics: [...item.topics ? item.topics : [], value] }, id: item.id }))
    }
  }

  const onDelTopiksValue = (e, value: string) => {
    e.stopPropagation()
    if (value.length > 0) {
      dispatch(editVerse({ verse: { ...item, topics: item.topics ? item.topics.filter((x) => x !== value) : [] }, id: item.id }))
    }
  }

  return <div
    key={`strofa${item.number}`}
    className={`px-5 py-2 border mt-1 flex justify-between gap-1 ${styles[colorType]}`}
  >
    <div className="flex justify-start gap-1">
      <div className="hover:text-red-700 cursor-pointer" style={{ margin: '-12px 2px 0 -17px', color: '#e5e7eb' }}
        title={'удалить строфу'} onClick={() => { dispatch(deletVerse(item.id)) }}>
        <FontAwesomeIcon className="rotate-180" icon={faDeleteLeft} />
      </div>
      <div className="font-bold">{item.number}</div>
      <div className="flex gap-2">
        <div>сезон: </div>
        <div className="relative" style={{ marginTop: 3 }}>
          <Menu1 onChangeCB={onChangeseason} data={getMenuOptionFromFAI()} defaultValue={`${item.season}`} />
        </div>
      </div>

    </div>
    <div className="cursor-pointer flex gap-1 max-w-md" onClick={() => topiksCb(item.id)}>
      Топик:
      {topiksIdx === item.id && <Editor2 onChangeValue={onChangeTopiksValue}
        optionsData={_.pullAllWith(versesTopics, item.topics ? item.topics : [], _.isEqual)} />}

      {topiksIdx !== item.id && item.topics && <ul className="flex gap-1 align-baseline flex-wrap">{item.topics.map((x, tidx) => (
        <li className="flex border gap-1  h-6 pl-1 overflow-hidden" style={{
          background: '#fff',
          borderRadius: 5,
          boxShadow: '2px 2px 2px 0px #666'
        }} key={`tag${item.number}${tidx}`} >
          <span>{x}</span>
          <FontAwesomeIcon className="hover:text-slate-800" style={{ fontSize: 'x-large', color: '#66666645' }}
            icon={faDeleteLeft} onClick={(e) => { onDelTopiksValue(e, x) }} title={'удалить топик'} />
        </li>
      ))}</ul>}
    </div>
  </div>
}
