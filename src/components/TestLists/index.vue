<template>
  <ul>
    <li :class="{ li: true }" v-for="(item, i) in items" :key="i">
      {{ item.name }}
    </li>
  </ul>
</template>

<script lang="ts" setup name="TestLists">
import { Todo, todoService } from '@/services'
import { onMounted, ref } from 'vue'

const items = ref<Todo[]>([])

onMounted(() => {
  todoService.getTodoList().then((list) => {
    items.value = list
  })
})
</script>

<style scoped lang="less">
.done {
  color: gray;
}
</style>
