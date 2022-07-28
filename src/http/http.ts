import axios from 'axios'

const httpClient = axios
const isDevelopment = process.env.NODE_ENV === 'development'

export interface ResponseData<T> {
  errcode: number
  data: T
  msg: string
}

if (!isDevelopment) {
  httpClient.defaults.baseURL = 'http://localhost:3000'
}

httpClient.interceptors.request.use((req) => {
  if (!isDevelopment) {
    if (req.url && req.url?.startsWith('/api/')) {
      req.url = (req.url as string).replace('/api/', '/')
    }
  }
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
      data,
      msg: '请求成功',
      errcode: 0,
    }
  }

  error<T>(errcode: number, data: T): ResponseData<T> {
    return {
      data,
      msg: '请求失败',
      errcode: 1,
    }
  }
}

export default httpClient
