import { generateId } from './generate'

export const generateUID = (): string => {
  // let firstPart = (Math.random() * 46656) | 0
  // let secondPart = (Math.random() * 46656) | 0
  // let _firstPart = '000'
  // let _secondPart = '000'
  // _firstPart = ('000' + generateId() firstPart.toString(36)).slice(-3)
  // _secondPart = ('000' + secondPart.toString(36)).slice(-3)

  // return _firstPart + _secondPart
  return generateId()
}

export function getCookie(name: string) {
  return document.cookie.match(name)
}

export const getDateObj = (dtStr: string): {} => {
  const dtArr = dtStr.split('T')

  return { dt: dtArr[0].split('-').reverse().join('.'), tm: dtArr[1].split(':').slice(0, 2).join(':') }
}
