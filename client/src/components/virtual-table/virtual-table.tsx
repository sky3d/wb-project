import React, { FC, useEffect, useLayoutEffect, useRef, useState } from 'react'

import _ from 'lodash'

import styles from './virtual-table.module.css'
import { useWindowSize } from '../../utils/hoocs'

export type TVirtualTableColumHeader = {
  title?: JSX.Element | string
  style?: React.CSSProperties
}

export type TVirtualTableColumn = {
  header: TVirtualTableColumHeader
  name: number | string
  style?: React.CSSProperties
  align?: 'start' | 'center' | 'end'
}

export type TVirtualTable = {
  height: number
  rowHeight: number
  rawData: []
  columns: TVirtualTableColumn[]
  isLoad?: boolean
  keyField?: number | string
  empty?: JSX.Element | string
  columnWidth?: number
  headerDefaultStyle?: {}
  checked?: boolean
  changeChekeds?: boolean
  selectData?: []
  loadObject?: JSX.Element | string
  multisort?: boolean
  onClick?: Function | null
  onDoubleClick?: Function | null
  onSelect?: Function | null
  onSorted?: Function | null
}

const VirtualTable: FC<TVirtualTable> = ({
  // Options
  height,
  rowHeight,
  rawData,
  columns,
  isLoad = false, // флаг загрузки данных в таблицу
  keyField = 0 || '0', // поле с уникальным индефикатором записи
  empty = <>Нет данных для отображения</>, // react объект отображаемый если таблица пуста
  columnWidth = 100,
  headerDefaultStyle = {},
  checked = false,
  changeChekeds = null,
  selectData = [],
  loadObject = <>Загрузка ...</>, // react объект отображаемый во время загрузки
  multisort = false, // флаг разрешающий сортировку по нескольким полям
  // Events
  onClick = null,
  onDoubleClick = null,
  onSelect = null,
  onSorted = null
}) => {
  const [w, h] = useWindowSize()
  const rootRef = useRef(null)
  const refHeader = useRef(null)

  const [curIdx, setCurIdx] = useState(-1)
  const [curExpandIdx, setCurExpandIdx] = useState(-1)
  const [start, setStart] = useState(0)
  const [_isFocus, _] = useState(false)
  const [headerHeignt, setHeaderHeignt] = useState(0)
  const [visibleRows, setVisibleRows] = useState(3)
  const [chekeds, setChekeds] = useState(selectData)
  const [allCheked, setAllCheked] = useState(false)
  const [data, setData] = useState([])

  const [fullSpaceWidth, setFullSpaceWidth] = useState(columnWidth)
  const [finishedHeight, setFinishedHeight] = useState(height)
  const [sortInfo, setSortInfo] = useState({}) // объект с информацией по каким полям сортировать и в каком направлении

  const headerDefaultDefaultStyle: React.CSSProperties = {
    fontSize: 22,
    textTransform: 'lowercase',
    ...headerDefaultStyle
  }

  useEffect(() => {
    if (selectData.length !== chekeds.length) {
      setChekeds(selectData)
    } else {
      if (selectData.length > 0) {
        if (selectData[0] !== chekeds[0] || selectData[selectData.length - 1] !== chekeds[chekeds.length - 1]) {
          setChekeds(selectData)
        }
      }
    }
    // setChekeds(selectData);
  }, [selectData])

  useEffect(() => {
    if (changeChekeds) {
      // тут выполняем пользовательскую функцию на смену чекеров
      changeChekeds(chekeds)
    }
  }, [chekeds])

  useLayoutEffect(() => {
    if (rootRef.current) {
      let allw = rootRef.current.offsetWidth - 10
      let fCol = 0
      let fSize = 0
      columns.forEach((col) => {
        if (!col.style || !col.style.width) {
          fCol = fCol + 1
        } else {
          allw = allw - col.style.width
        }
      })
      if (checked) {
        allw = allw - 40
      }

      fSize = allw / fCol

      setFullSpaceWidth(fSize)
    }
  }, [w, data])

  useEffect(() => {
    if (rawData) {
      setData(rawData)
    } else {
      setData([])
    }
  }, [rawData])

  useLayoutEffect(() => {
    if (height) {
      setFinishedHeight(height)
      if (refHeader.current) {
        setHeaderHeignt(refHeader.current.offsetHeight)
      }
    }
  }, [height])

  useLayoutEffect(() => {
    if (finishedHeight > 0) {
      setVisibleRows(Math.floor((finishedHeight - headerHeignt) / rowHeight))
    }
  }, [finishedHeight, headerHeignt])

  useEffect(() => {
    if (onSelect && data[curIdx]) {
      onSelect(curIdx, data[curIdx])
      if (curIdx > -1 && curExpandIdx !== data[curIdx][keyField]) {
        setCurExpandIdx(-1)
      }
    }
  }, [curIdx])

  useEffect(() => {
    // onSorted
    const sorterFildsLIst = Object.keys(sortInfo)
    if (sorterFildsLIst.length > 0) {
      if (typeof onSorted === 'function') {
        onSorted(sortInfo)
      } else {
        const colNames = []
        const colDirections = []
        sorterFildsLIst.forEach((x) => {
          colNames.push(x)
          colDirections.push(sortInfo[x] ? 'asc' : 'desc')
        })
        setData(_.orderBy(data, colNames, colDirections))
      }
    }
  }, [sortInfo])

  const getTopHeight = () => rowHeight * start
  const getBottomHeight = () => rowHeight * (data.length - (start + visibleRows) + 1)

  const onScroll = (e) => {
    const startTmp = Math.floor(e.target.scrollTop / rowHeight)
    setStart(startTmp >= 0 ? startTmp : 0)
  }

  const onClickItem = (e, id) => {
    setCurIdx(id)
    if (onClick) {
      onClick(e, id, data[id])
    }
  }

  const onDoubleClickItem = (e, id) => {
    setCurIdx(id)
    if (onDoubleClick) {
      onDoubleClick(e, id)
    }
  }
  const onChangeChecked = (id) => {
    // console.log("onChangeChecked:", id);
    const idx = chekeds.indexOf(id)

    if (idx > -1) {
      // chekeds.splice(idx, 1);
      const tmp = chekeds.filter((x) => x != id)
      setChekeds([...tmp])
    } else {
      setChekeds([...chekeds, id])
    }
  }

  const onClickChecked = (e) => {
    // console.log("onClickChecked:");
    e.stopPropagation()
  }

  const onChangeAllChecked = () => {
    // console.log("onChangeAllChecked:", onChangeAllChecked);
    if (allCheked === false) {
      setChekeds(
        rawData.map((item) => {
          return item[keyField]
        })
      )
    } else {
      setChekeds([])
    }
    setAllCheked(!allCheked)
  }

  const onClickAllChecked = () => {}

  const onClickSorted = (col) => {
    const colName = `${col.name}`
    const colDirection = sortInfo[colName] ? !sortInfo[colName] : true // true = ask, false = desk
    const _sortInfo = multisort ? { ...sortInfo } : {}

    _sortInfo[colName] = colDirection
    setSortInfo(_sortInfo)
  }

  const render = (item, cur) => {
    let cName = ''
    const cheked = chekeds.indexOf(item[keyField]) > -1 ? true : false

    return (
      <>
        {checked && (
          <td
            key={`cell${item[keyField]}_checked`}
            style={{ height: rowHeight, display: 'flex', alignItems: 'start', paddingTop: 10 }}
            className={styles.checkedCell}
          >
            {
              <input
                className={styles.inputChexkBox}
                type={'checkbox'}
                checked={cheked}
                onChange={() => onChangeChecked(item[keyField])}
                onClick={onClickChecked}
              />
            }
          </td>
        )}

        {columns.map((x, index) => {
          // поидее оно лишнее проверять влезает или нет текст в поле css сам разбереться
          // if (cur) {
          //   cName = styles.selectExpand
          // }

          const predValue = x.render ? x.render(item) : item[x.name]

          return (
            <td
              key={`cell${index}_${item[keyField]}`}
              className={cName}
              style={{
                ...x.style,
                textAlign: x.align || 'left'
              }}
            >
              {x.zeroClear && predValue * 1 === 0 ? '' : predValue}
            </td>
          )
        })}
      </>
    )
  }

  const renderHead = () => (
    <>
      {checked && (
        <td
          key={`cell${1}_checked`}
          // @ts-ignore
          style={{ height: rowHeight, ...headerDefaultDefaultStyle }}
          className={styles.checkedCell}
        >
          {
            <input
              className={styles.inputChexkBox}
              type={'checkbox'}
              checked={data.length === chekeds.length ? true : false}
              onChange={onChangeAllChecked}
              onClick={onClickAllChecked}
            />
          }
        </td>
      )}
      {columns.map((x, index) => {
        const headerStyle = x.header.style ? x.header.style : {}
        let celProps = {
          key: `hCell${index}`,
          style: { height: rowHeight, ...headerDefaultDefaultStyle, ...x.style, ...headerStyle },
          className: styles.tableCell
        }

        if (x.sorter) {
          celProps.style = { ...celProps.style, cursor: 'pointer' }
          celProps.onClick = () => onClickSorted(x)
        }

        const colName = x.name
        const colDirection = sortInfo[colName]

        return (
          <td {...celProps}>
            <div style={{ display: 'flex', gap: 5, alignItems: 'center', ...x.style, paddingRight: 5, justifyContent: x.align || 'left' }}>
              <span className="noselect">{x.header.title}</span>
              {x.sorter && (
                <div style={{ fontSize: 8, display: 'flex', flexDirection: 'column', marginTop: 4 }}>
                  <CaretUpOutlined style={{ color: colDirection === false ? 'black' : 'silver' }} />
                  <CaretDownOutlined style={{ color: colDirection ? 'black' : 'silver' }} />
                </div>
              )}
            </div>
          </td>
        )
      })}
    </>
  )

  const getWidthCol = (item) => {
    return item.style && item.style.width ? item.style.width : fullSpaceWidth
  }

  const getColgroup = () => (
    <>
      {checked && (
        <col
          key={-1}
          style={{
            width: 40
          }}
        />
      )}
      {columns.map((x, index) => (
        <col
          key={index}
          style={{
            width: getWidthCol(x)
          }}
        />
      ))}
    </>
  )

  const getTR = (rowIndex, item, cur) => {
    let obj = {
      // className: cur ? `${styles.tableRow} ${styles.selectRow}` : `${styles.tableRow} ${styles.hoverTr}`,
      className: `${styles.tableRow} ${styles.hoverTr}`,
      style: { height: rowHeight },
      key: `key${item[keyField]}`,
      onClick: (e) => onClickItem(e, start + rowIndex),
      onDoubleClick: (e) => onDoubleClickItem(e, start + rowIndex)
    }

    let tmp1 = [<tr {...obj}>{render(item, cur)}</tr>]

    return tmp1
  }

  return (
    <>
      <div style={{ height: height, overflow: 'auto', paddingLeft: 10, paddingRight: 10 }}>
        <table ref={refHeader} className={styles.table}>
          <colgroup>{getColgroup()}</colgroup>
          <thead>
            <tr>{renderHead()}</tr>
          </thead>
        </table>
        {isLoad && <div className={styles.loadSpinner}>{loadObject}</div>}
        {!isLoad && data.length == 0 && <div className={styles.loadSpinner}>{empty}</div>}
        {!isLoad && data.length > 0 && (
          <div
            style={{ height: finishedHeight - headerHeignt, overflow: 'auto', outline: 'none', overflowX: 'hidden' }}
            className={'kvntRootRef'}
            ref={rootRef}
            tabIndex={-1}
            onScroll={onScroll}
          >
            <table className={styles.table}>
              <colgroup>{getColgroup()}</colgroup>
              <tbody>
                <tr key={'startTR'} style={{ height: getTopHeight() }} />
                {data.slice(start, start + visibleRows + 1).map((item, rowIndex) => {
                  const cur = curIdx === start + rowIndex ? true : false
                  return getTR(rowIndex, item, cur)
                })}
                <tr key={'endTR'} style={{ height: getBottomHeight() }} />
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  )
}

export default VirtualTable
