import { isEmpty } from 'lodash'
import { errorResponsString } from '../utils/vars'

type RequestMethod = 'GET' | 'POST' | 'DELETE'

const API_PREFIX = 'http://127.0.0.1:3000/api/'

const postParams = (body = {}, headers = {}) => ({
  body: !isEmpty(body) ? JSON.stringify(body) : '',
  headers: {
    'Content-type': 'application/json',
    ...headers
  }
})

export const runRequest = async (url: string, method: RequestMethod, options?: {}, errorString: string = errorResponsString) => {
  const params = method === 'POST' ? postParams(options, {}) : {}

  const init = {
    method,
    ...params
  }

  const response = await fetch(API_PREFIX + url, init).then((res) => res.json())

  if (response.error) {
    throw new Error(`${errorString} ${JSON.stringify(response.error)}`)
  }

  return response
}
