import { errorResponsString } from '../utils/vars'

const mainUrl = 'http://127.0.0.1:3000/api/'

export const runRequest = async (apiRequest: string, method: 'GET' | 'POST', options?: {}) => {
  let body = null
  if (method === 'POST') {
    body = options && Object.keys(options).length > 0 ? JSON.stringify(options) : ''
  }

  const response = await fetch(mainUrl + apiRequest, {
    method,
    body,
  })

  if (response.status >= 400 && response.status < 600) {
    throw new Error(`${errorResponsString} ${response.status}`)
  }

  return response
}
