import axios from 'axios'

const httpClient = axios

export interface ResponseData<T> {
  result: 'ok' | 'error'
  data: T
  msg: string
  errcode: number
}

httpClient.interceptors.request.use((req) => {
  return req
})

httpClient.interceptors.response.use((res) => {
  if (res.status >= 200 && res.status < 300) {
    return res
  }
  console.error('接口返回错误')
})

export class HttpExpect {
  success<T>(data: T): ResponseData<T> {
    return {
      result: 'ok',
      data,
      msg: '请求成功',
      errcode: 0,
    }
  }

  error<T>(errcode: number, data: T): ResponseData<T> {
    return {
      data,
      msg: '请求失败',
      result: 'error',
      errcode,
    }
  }
}

export default httpClient
