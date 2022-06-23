import httpClient, { ResponseData } from '@/http/http'

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
  async update<T>(id: number, data: TodoDataDto.UpdateTodoDto) {
    return httpClient.put(`/todo/${id}`, data)
  }

  async delete(id: number) {
    return httpClient.delete(`/todo/${id}`)
  }

  async getTodoList<T>(): Promise<T | any[]> {
    return httpClient.get<ResponseData<T>>(`/todo/`).then((res) => {
      if (res.data.result !== 'ok') {
        console.error('')
        // return res.data.data
      }
      return res?.data?.data || []
    })
  }

  async createTodo(data: TodoDataDto.CreateTodoDto) {
    if (!('done' in data)) {
      data.done = false
    }
    if (!data.name) {
      // console.error('name不能为空', data)
      throw new Error(`name不能为空`)
    }

    return httpClient.post<ResponseData<any>>(`/todo`, data).then((res) => {
      return res.data
    })
  }
}

export const todoService = new TodoService()
