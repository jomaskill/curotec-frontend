<script setup>
import { useApi } from '@/composables/useApi'
import { onMounted, ref } from 'vue'
import { useTodoStore } from '@/stores/todo'
import XModal from '@/components/ui/XModal.vue'
const api = useApi()
const store = useTodoStore()
const todos = ref([])
const title = ref('')
const modal = ref()
const editForm = ref({
  id: null,
  title: ''
})

onMounted(async () => {
  todos.value = (await api.get('/todos')).data
})

async function create() {
  try {
    const todo = (await api.post('/todos', { title: title.value })).data
    todos.value.push(todo)
  } catch (e) {
    console.log(e)
  }
}

async function toggle(todo) {
  const todoStatus = todo.status === 'Completed' ? 'Incomplete' : 'Completed'

  try {
    const createdTodo = (await api.put('/todos/' + todo.id, { status: todoStatus })).data

    const foundKey = todos.value.findIndex((todoo) => todo.id === todoo.id)
    todos.value[foundKey] = createdTodo
  } catch (e) {
    console.log(e)
  }
}

function openEdit(todo) {
  editForm.value.id = todo.id
  editForm.value.title = todo.title
  modal.value.openModal()
}

async function edit() {
  await api.put('/todos/' + editForm.value.id, { title: editForm.value.title })

  const foundKey = todos.value.findIndex((todo) => todo.id === editForm.value.id)
  if (foundKey !== undefined) {
    todos.value[foundKey].title = editForm.value.title
  }

  modal.value.closeModal()
}

async function destroy(todoId) {
  await api.destroy('/todos/' + todoId)

  const foundKey = todos.value.findIndex((todo) => todo.id === todoId)
  if (foundKey) {
    todos.value.splice(foundKey, 1)
  }
}

function highlight(todo) {
  store.highlight(todo)
}
</script>
<template>
  <x-modal ref="modal">
    <input type="text" v-model="editForm.title" class="text-gray-900" />
    <template #actions>
      <button @click="edit" class="bg-blue-600 rounded p-2">Edit</button>
    </template>
  </x-modal>
  <div class="space-y-4">
    <h2>Todos ({{ todos.length }})</h2>

    <div class="w-full">
      <input type="text" v-model="title" class="text-gray-900" />
      <button type="button" @click="create" class="p-2 bg-blue-600">New</button>
    </div>

    <div class="flex flex-col gap-2">
      <div
        v-for="todo in todos"
        :key="todo.id"
        class="flex flex-col bg-gray-600 hover:cursor-pointer"
      >
        <div class="w-full p-4 inline-flex w-full bg-gray-400">
          <div
            class="w-full"
            :class="{
              'bg-green-600': todo.status === 'Completed',
              'bg-red-200': todo.status === 'Incomplete'
            }"
            @click="toggle(todo)"
          >
            {{ todo.title }}
          </div>
          <span class="w-24" @click="destroy(todo.id)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>
          <span class="w-24" @click="highlight(todo)"> H </span>
          <span @click="openEdit(todo)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>

    <div>
      <span> Todo Highlighted </span>
      <div>
        {{ store.getTodo }}
      </div>
    </div>
  </div>
</template>
