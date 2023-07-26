import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useTodoStore = defineStore('todo', () => {
  const todo = ref({})

  const getTodo = computed(() => todo.value)

  function highlight(receivedTodo) {
    this.todo = receivedTodo
  }

  return {
    todo,
    getTodo,
    highlight
  }
})
