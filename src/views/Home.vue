<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <TodoList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TodoList from '@/components/TodoList/index.vue'

export default defineComponent({
  name: 'Home',
  components: { TodoList },
})
</script>
