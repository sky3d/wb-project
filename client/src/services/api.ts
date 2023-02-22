import { isEmpty } from 'lodash'
import { errorResponsString } from '../utils/vars'

type RequestMethod = 'GET' | 'POST' | 'DELETE'

const API_PREFIX = '/api/'
const API_HOST = 'http://127.0.0.1:3000'

const postParams = (body = {}, headers = {}) => ({
  body: !isEmpty(body) ? JSON.stringify(body) : '',
  headers: {
    'Content-type': 'application/json',
    ...headers
  }
})

const getParams = (headers = {}) => ({
  headers: {
    'Content-type': 'application/json',
    ...headers
  }
})

export const makeAuthHeader = (token: string) => ({ Authorization: `Bearer ${token}` })

export const runRequest = async (
  url: string,
  method: RequestMethod,
  options?: {},
  errorString: string = errorResponsString,
  headers: {} = {},
  prefix: string = API_PREFIX,

) => {
  const params = method === 'POST' ? postParams(options, headers) : getParams(headers)

  const init = {
    method,
    ...params
  }

  console.log(init);


  const response = await fetch(API_HOST + prefix + url, init).then((res) => res.json())

  if (response.error) {
    throw new Error(`${errorString} ${JSON.stringify(response.error)}`)
  }

  return response
}

export const authRequest = async (url: string, method: RequestMethod, options?: {}, errorString: string = errorResponsString, prefix: string = API_PREFIX) => {
  const params = method === 'POST' ? postParams(options, {}) : {}

  const init = {
    method,
    ...params
  }

  console.log(API_HOST + prefix + url, init, '----------')

  try {
    await fetch(API_HOST + prefix + url, init)
  } catch (err) {
    console.log(err)
  }
}
