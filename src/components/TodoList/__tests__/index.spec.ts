import TodoList from '@/components/TodoList/index.vue'

jest.mock('@/services')

describe('TodoList', () => {
  it('jest.fn', () => {
    const mockFn = jest.fn()
    const result = mockFn(1, 2, 3)

    expect(result).toBeUndefined()
    expect(mockFn).toBeCalled()
    expect(mockFn).toBeCalledTimes(1)
    expect(mockFn).toHaveBeenCalledWith(1, 2, 3)
  })
})
