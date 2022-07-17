import { mount, VueWrapper } from '@vue/test-utils'
import TestLists from '../index.vue'
import { todoService } from '@/services'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const todolist = require('@mock/todo-list.json')

// jest.spyOn(todoService, 'getTodoList').mockResolvedValue(todolist)

// jest.mock('@/services')
// ;(todoService.getTodoList as jest.Mock).mockResolvedValue(todolist)

todoService.getTodoList = jest.fn().mockResolvedValue(todolist)

describe('components/TestLists', function () {
  const testLists: VueWrapper = mount(TestLists)

  it('should render items', async () => {
    const len = testLists.findAll('.li')
    expect(len).toHaveLength(todolist.length)
  })
})
