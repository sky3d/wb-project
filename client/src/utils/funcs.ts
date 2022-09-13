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
  // eslint-disable-next-line no-useless-escape
  const matches = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'))

  return matches ? decodeURIComponent(matches[1]) : undefined
}
