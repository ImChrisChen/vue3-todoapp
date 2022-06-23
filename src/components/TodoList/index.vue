<template>
  <div class="todo-list">
    <HelloWorld msg="Todo App" />
    <input
      class="input"
      placeholder="请输入要完成的事项"
      style="
        background: seashell;
        color: #2c3e50;
        display: inline-block;
        border-radius: 4px;
        padding: 10px;
      "
      v-model="formData.name"
      type="text"
    />
    <button class="button" @click="handleAddTodo">添加</button>

    <ul v-if="todoList.length > 0">
      <li
        v-for="(todo, i) in todoList"
        :class="{ 'todo-done': todo.done }"
        :key="i"
      >
        <input
          class="input"
          type="text"
          v-model="todo.name"
          @change="handleUpdateTodo(todo)"
        />
        <span class="done" @click="handleUpdateDoneTodo(todo.id, true)"
          >✔️</span
        >
        <span class="close" @click="handleDeleteTodo(todo, i)">❌</span>
      </li>
    </ul>
    <div v-else style="margin-top: 30px">添加一个TODO吧</div>
  </div>
</template>

<script lang="ts" setup name="TodoList">
import { reactive, ref } from 'vue'
import { todoService } from '@/services/todo.service'

interface Todo {
  id: number
  name: string
  done: boolean // 是否完成
  create_time: number // 创建时间戳
  update_time?: number // 更新时间戳
}

const todoList = ref<Todo[]>([])
const formData = reactive({ name: '' })

const handleAddTodo = () => {
  let name = formData.name
  todoService.createTodo({ name }).then((res) => {
    console.log(res)
    debugger
  })
}

const handleUpdateTodo = (todo: Todo) => {
  todoService.update(todo.id, todo).then((res) => {})
}

const handleUpdateDoneTodo = (id: number, done: boolean) => {
  todoService.update(id, {
    done: done,
  })
}

const handleDeleteTodo = (todo: Todo, i: number) => {
  todoService.delete(todo.id)
}
</script>

<style scoped></style>
