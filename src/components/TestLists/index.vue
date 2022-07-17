<template>
  <ul>
    <li class="li" v-for="(item, i) in items" :key="i">{{ item.name }}</li>
  </ul>
</template>

<script lang="ts" setup name="TestLists">
import { onMounted, ref } from 'vue'
import { Todo, todoService } from '@/services'

const items = ref<Todo[]>([])

onMounted(() => {
  todoService.getTodoList().then((list) => {
    items.value = list
  })
})
</script>

<style scoped></style>
