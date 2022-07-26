import httpClient, { ResponseData } from '@/http/http'
import { cacheService } from '@/services/cache.service'

export interface Todo {
  id: number
  name: string
  done: 0 | 1 // 是否完成
  remark: string | null // 备注
  deadline: string | null // 到期时间
  created_at: string // 创建时间戳
  updated_at?: string // 更新时间戳
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export declare namespace TodoDataDto {
  interface CreateTodoDto {
    name: string
    done?: boolean
  }

  interface UpdateTodoDto {
    name?: string
    done?: boolean
  }
}

class TodoService {
  async update(id: number, data: TodoDataDto.UpdateTodoDto): Promise<Todo> {
    return httpClient.patch(`/api/todo/${id}`, data).then((res) => {
      if (res.data.errcode !== 0) {
        return {}
      }
      return res.data.data
    })
  }

  async delete(id: number) {
    return httpClient.delete<ResponseData<any>>(`/api/todo/${id}`).then((res) => {
      if (res.data.errcode !== 0) {
        return {}
      }
      return res.data.data
    })
  }

  // cached
  // TODO 更新的时候缓存记得要失效
  async getTodoList(): Promise<Todo[]> {
    const cache = cacheService.getItem('todolist')
    // eslint-disable-next-line no-debugger
    debugger
    if (cache) {
      return cache as Todo[]
    }

    return httpClient.get<ResponseData<Todo[]>>(`/api/todo/`).then((res) => {
      if (res.data.errcode !== 0) {
        return []
      }
      const content = res.data.data || []

      // 异步写入缓存
      setTimeout(() => cacheService.setItem('todolist', content), 200)

      return content
    })
  }

  async createTodo(data: TodoDataDto.CreateTodoDto): Promise<Todo> {
    if (!('done' in data)) {
      data.done = false
    }
    if (!data.name) {
      throw new Error(`name不能为空`)
    }

    return httpClient.post(`/api/todo`, data).then((res) => {
      if (res.data.errcode !== 0) {
        return {}
      }
      return res.data.data
    })
  }
}

export const todoService = new TodoService()
