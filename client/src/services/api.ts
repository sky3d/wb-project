import { errorResponsString } from '../utils/vars'

const mainUrl = 'http://127.0.0.1:3000/api/'

export const runRequest = async (apiRequest: string, method: 'GET' | 'POST' | 'PUT', options?: {}) => {
  let body = null
  // const headers = []
  if (['POST', 'PUT'].indexOf(method) > -1) {
    body = options && Object.keys(options).length > 0 ? JSON.stringify(options) : ''
    // headers.push(['Content-Type', 'application/json'])
  }

  const response = await fetch(mainUrl + apiRequest, {
    method,
    body,
    // headers,
  })

  if (response.status >= 400 && response.status < 600) {
    throw new Error(`${errorResponsString} ${response.status}`)
  }

  return response
}
