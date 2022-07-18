import TodoList from '@/components/TodoList/index.vue'
import { flushPromises, mount } from '@vue/test-utils'
import { Todo, todoService } from '@/services'

describe('TodoList', () => {
  it('jest.fn', () => {
    const mockFn = jest.fn()
    const result = mockFn(1, 2, 3)

    expect(result).toBeUndefined()
    expect(mockFn).toBeCalled()
    expect(mockFn).toBeCalledTimes(1)
    expect(mockFn).toHaveBeenCalledWith(1, 2, 3)
  })

  it('render todolist', async () => {
    const list: Array<Todo> = [
      {
        id: 1,
        name: '洗澡12313',
        created_at: '2022-07-02T15:55:43.000Z',
        updated_at: '2022-07-14T14:32:48.000Z',
        deadline: null,
        remark: null,
        done: 0,
      },
      {
        id: 2,
        name: '起床',
        created_at: '2022-07-02T17:03:16.000Z',
        updated_at: '2022-07-14T14:32:46.000Z',
        deadline: null,
        remark: null,
        done: 1,
      },
      {
        id: 6,
        name: '11点洗澡',
        created_at: '2022-07-03T14:10:36.000Z',
        updated_at: '2022-07-14T14:32:43.000Z',
        deadline: null,
        remark: '',
        done: 1,
      },
      {
        id: 8,
        name: '提交代码',
        created_at: '2022-07-03T14:29:00.000Z',
        updated_at: '2022-07-14T14:32:39.000Z',
        deadline: null,
        remark: '',
        done: 0,
      },
    ]
    jest.spyOn(todoService, 'getTodoList').mockResolvedValue(list)

    const todoList = mount(TodoList)

    await flushPromises()

    expect(todoList.exists()).toBe(true)
    const l = todoList.findAll('.todo')
    expect(l).toHaveLength(list.length)
    expect(todoList.findAll('.todo.todo-done')).toHaveLength(list.filter((item) => item.done).length)

    // const values = todoList.findAll('.todo .input').map((item) => item.element['value'])
    // expect(values).toEqual(list.map((item) => item.name))
    // expect(values).toContainEqual(values)
    expect(todoList).toMatchSnapshot()
  })
})
