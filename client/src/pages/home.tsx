import React, { useEffect, FC, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ButtonV2 } from '../components/buttonV2/buttonV2'
import { SegmetButton } from '../components/segment-button/segment-button'
import VirtualTable, { TVirtualTableColumn } from '../components/virtual-table/virtual-table'
import { setCurrentPage } from '../services/slices/app-info'

import { getRengaList, slctRengaRawList } from '../services/slices/renga'
import { selectAuth } from '../services/slices/user-info'
import { TPage } from '../utils/types'

export const HomePage: FC<TPage> = ({ height }): JSX.Element => {
  const dispatch = useDispatch()
  const userAuth = useSelector(selectAuth)
  const headerRef = useRef<HTMLHeadingElement>(null)

  const [pageHeight, setPageHeight] = useState(0)

  useEffect(() => {
    if (headerRef.current && height > 0) {
      setPageHeight(height - headerRef.current.offsetHeight)
    }
  }, [height, headerRef, userAuth])

  const rengaList = useSelector(slctRengaRawList)

  useEffect(() => {
    dispatch(getRengaList())
  }, [])

  const columns: TVirtualTableColumn[] = [
    {
      header: { title: 'id' },
      name: 'id'
    },
    {
      header: { title: 'name' },
      name: 'name'
    },
    {
      header: { title: 'status' },
      name: 'status'
    },
    {
      header: { title: 'createdAt' },
      name: 'createdAt'
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
    console.log('onChangeSegment_id:', id)
  }

  return (
    <div style={{ height, maxHeight: height }} className="overflow-auto">
      <div ref={headerRef}>
        {userAuth && (
          <section style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 0 5px 0' }}>
            <SegmetButton buttons={buttons} onChangeEvnt={onChangeSegment} defaultValue={'1'} />
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
