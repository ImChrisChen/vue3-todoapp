<template>
  <div class="todo-list">
    <input
      class="input"
      data-casemark="pre-add-input"
      placeholder="请输入要完成的事项"
      style="background: seashell; color: #2c3e50; display: inline-block; border-radius: 4px; padding: 10px"
      v-model="formData.name"
      @keydown.enter="handleAddTodo"
      type="text"
    />
    <button class="button" data-casemark="submit" @click="handleAddTodo">添加</button>

    <ul data-casemark="todolist" v-if="todoList.length > 0">
      <li
        v-for="(todo, i) in todoList"
        :class="{ 'todo-done': todo.done, todo: true }"
        :key="i"
        :data-casemark-id="todo.id"
      >
        <input class="input" type="text" v-model="todo.name" @change="handleUpdateTodo(todo)" />
        <span class="done" @click="handleUpdateDoneTodo(todo)">✔️</span>
        <span class="delete" @click="handleDeleteTodo(todo)">❌</span>
      </li>
    </ul>
    <div v-else style="margin-top: 30px">添加一个TODO吧</div>

    <button class="button" @click="handleVisibleDone">{{ isVisibleDone ? '隐藏' : '显示' }} 已完成</button>
  </div>
</template>

<script lang="ts" setup name="TodoList">
import { onMounted, reactive, ref, watch, watchEffect } from 'vue'
import { ElMessage } from 'element-plus'

import { Todo, todoService } from '@/services/todo.service'

const todoList = ref<Todo[]>([])
const originTodoList = ref<Todo[]>([])
const formData = reactive({ name: '' })
const isVisibleDone = ref(true)

onMounted(() => {
  todoService.getTodoList().then((list) => {
    originTodoList.value = [...list]
  })
})

// 完成的todo自动移入到最后
watchEffect(() => {
  // TODO 自定义排序规则
  let tempArr: Todo[] = []
  let ids = originTodoList.value
    .map((item) => {
      if (item.done) {
        return item.id
      }
      return null
    })
    .filter((v) => v)

  ids.forEach((id) => {
    let index = originTodoList.value.findIndex((item) => item.id && item.id === id)
    let item = originTodoList.value.splice(index, 1)
    tempArr.push(...item)
  })
  tempArr.forEach((item) => {
    originTodoList.value.push(item)
  })
  todoList.value = originTodoList.value
})

watch(isVisibleDone, (value) => {
  todoList.value = originTodoList.value.filter((item) => {
    return value ? item.id : !item.done
  })
})

const handleAddTodo = () => {
  let name = formData.name
  todoService.createTodo({ name }).then((res) => {
    if (res.id) {
      formData.name = ''
      todoService.getTodoList().then((list) => {
        originTodoList.value = list
        ElMessage.success('新增成功')
      })
    }
  })
}

const handleUpdateTodo = (todo: Todo) => {
  todoService
    .update(todo.id, {
      name: todo.name,
      done: Boolean(todo.done),
    })
    .then((res) => {
      console.log(res)
    })
}

const handleUpdateDoneTodo = (todo: Todo) => {
  todoService
    .update(todo.id, {
      done: !todo.done,
    })
    .then((res) => {
      todo.done = res.done
    })
}

const handleDeleteTodo = (todo: Todo) => {
  todoService.delete(todo.id).then(() => {
    ElMessage.info('删除成功')
    todoService.getTodoList().then((list) => {
      originTodoList.value = list
    })
  })
}

const handleVisibleDone = () => {
  isVisibleDone.value = !isVisibleDone.value
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

  .delete {
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
  opacity: 0.9;
}
</style>
