import { mount, VueWrapper } from '@vue/test-utils'
import TestLists from '../index.vue'
import { todoService } from '@/services'
import { h } from 'vue'
const todolist = require('@mock/todo-list.json')

todoService.getTodoList = jest.fn().mockResolvedValue(todolist)

describe('components/TestLists', function () {
  const testLists: VueWrapper = mount(<TestLists />)

  it('should render items', async () => {
    const len = testLists.findAll('.li')
    expect(len).toHaveLength(todolist.length)
  })
})
