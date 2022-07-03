import httpClient, { ResponseData } from '@/http/http'

export interface Todo {
  id: number
  name: string
  done: boolean // 是否完成
  remark: string // 备注
  deadline: string // 到期时间
  created_time: number // 创建时间戳
  updated_time?: number // 更新时间戳
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
    return httpClient
      .delete<ResponseData<any>>(`/api/todo/${id}`)
      .then((res) => {
        if (res.data.errcode !== 0) {
          return {}
        }
        return res.data.data
      })
  }

  async getTodoList(): Promise<Todo[]> {
    return httpClient.get<ResponseData<Todo[]>>(`/api/todo/`).then((res) => {
      if (res.data.errcode !== 0) {
        return []
      }
      return res.data.data || []
    })
  }

  async createTodo(data: TodoDataDto.CreateTodoDto): Promise<Todo> {
    if (!('done' in data)) {
      data.done = false
    }
    if (!data.name) {
      // console.error('name不能为空', data)
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
