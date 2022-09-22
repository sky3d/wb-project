import React, { useEffect, FC, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro'

import { ButtonV2 } from '../components/buttonV2/buttonV2'
import { SegmetButton } from '../components/segment-button/segment-button'
import VirtualTable, { TVirtualTableColumn } from '../components/virtual-table/virtual-table'
import { setCurrentPage } from '../services/slices/app-info'

import { getRengaList, slctRengaRawList, TReangaList } from '../services/slices/renga'
import { selectAuth, selectOwnerId } from '../services/slices/user-info'
import { TPage } from '../utils/types'
import { getDateObj } from '../utils/funcs'

export const HomePage: FC<TPage> = ({ height }): JSX.Element => {
  const dispatch = useDispatch()
  const userAuth = useSelector(selectAuth)
  const ownerId = useSelector(selectOwnerId)
  const rengaListRaw = useSelector(slctRengaRawList)

  const headerRef = useRef<HTMLHeadingElement>(null)

  const [rengaList, setRengaList] = useState([])
  const [pageHeight, setPageHeight] = useState(0)
  const [filter, setFilter] = useState<string>('1')

  useEffect(() => {
    if (headerRef.current && height > 0) {
      setPageHeight(height - headerRef.current.offsetHeight)
    }
  }, [height, headerRef, userAuth])

  useEffect(() => {
    dispatch(getRengaList())
  }, [])

  useEffect(() => {
    if (filter === '2') {
      setRengaList(rengaListRaw?.filter((x) => x.owner === ownerId))
    } else {
      setRengaList(rengaListRaw)
    }
  }, [rengaListRaw, filter])

  const columns: TVirtualTableColumn[] = [
    // {
    //   header: { title: 'id' },
    //   style: { width: 120 },
    //   name: 'id'
    // },
    {
      header: { title: 'название' },
      name: 'name',
      sorter: true
    },
    {
      header: { title: 'описание' },
      name: 'description'
    },
    {
      header: { title: 'статус' },
      name: 'status',
      style: { width: 70 },
      align: 'center',
      sorter: true
    },
    {
      header: { title: 'дата' },
      name: 'createdAt',
      style: { width: 130 },
      sorter: true,
      align: 'end',
      render: (item: [] | {}) => {
        const dtObj = getDateObj(item.createdAt)

        return <span>{`${dtObj.dt} ${dtObj.tm}`}</span>
      }
    },
    {
      header: {},
      name: 'createdAt',
      style: { width: 50 },
      align: 'center',
      render: (item: [] | {}) => {
        if (ownerId === item.owner) {
          return (
            <FontAwesomeIcon
              className="hover:text-black cursor-pointer text-slate-500 text-xl"
              icon={icon({ name: 'pen-to-square', style: 'regular' })}
            />
          )
        }

        return <></>
      }
    }
  ]

  const buttons = [
    {
      id: '1',
      title: 'Все'
    },
    {
      id: '2',
      title: 'Мои'
    }
  ]

  const onChangeSegment = (id: string) => {
    setFilter(id)
  }

  return (
    <div style={{ height, maxHeight: height }} className="overflow-auto">
      <div ref={headerRef}>
        {userAuth && (
          <section style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 0 5px 0' }}>
            <SegmetButton buttons={buttons} onChangeEvnt={onChangeSegment} defaultValue={filter} />

            <ButtonV2
              onClick={() => {
                dispatch(setCurrentPage(2))
              }}
            >
              Создать ренгу
            </ButtonV2>
          </section>
        )}
      </div>

      <div style={{ height: pageHeight }} className="border">
        <VirtualTable rawData={rengaList} columns={columns} rowHeight={37} height={pageHeight - 30} />
      </div>
    </div>
  )
}
