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
    expect(testLists).toMatchSnapshot() // 没有快照则会在当前目录生成一个快照(__snapshot__)
  })

  // it('TestLists Snapshot Test', () => {
  //   expect(testLists.element).toMatchSnapshot()
  // })
})
