<template>
  <div class="todo-list">
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
        <span class="close" @click="handleDeleteTodo(todo)">❌</span>
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
  })
}

const handleUpdateTodo = (todo: Todo) => {
  todoService.update(todo.id, todo).then((res) => {
    console.log(res)
  })
}

const handleUpdateDoneTodo = (id: number, done: boolean) => {
  todoService.update(id, {
    done: done,
  })
}

const handleDeleteTodo = (todo: Todo) => {
  todoService.delete(todo.id)
}
</script>

<style scoped lang="less">
.input {
  outline: none;
  background: none;
  border: none;
  font-size: 20px;
  color: #fff;
  font-weight: 600;
}

.todo-list {
  width: 400px;
  margin: auto;

  ul,
  li {
    list-style: none;
    padding-left: 0;
  }

  li {
    padding: 20px 20px;
    text-align: left;
    background: rgba(70, 209, 197, 0.5);
    border-radius: 4px;
    position: relative;
    margin-bottom: 20px;

    input:focus {
      border: none;
    }
  }

  .done {
    height: 30px;
    width: 30px;
    background: #42b983;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 60px;
    cursor: pointer;
    text-align: center;
  }

  .close {
    border-radius: 50%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 20px;
    cursor: pointer;
  }

  .todo-done {
    background: gainsboro;
    text-decoration: line-through;

    input {
      text-decoration: line-through !important;
    }
  }
}

.button {
  outline: none;
  border: none;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 4px;
  background: cornflowerblue;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  margin-left: 20px;
}
</style>
