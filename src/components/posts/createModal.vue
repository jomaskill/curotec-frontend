<script setup>
import XModal from '@/components/ui/XModal.vue'
import { ref } from 'vue'
import { useApi } from '@/composables/useApi'
import XError from '@/components/ui/XError.vue'
const api = useApi()
const modal = ref()
const form = ref({
  title: '',
  body: '',
  user_id: ''
})
const errors = ref({})

const emit = defineEmits({
  postCreated: (post) => {
    if (typeof post === 'object') {
      return true
    } else {
      console.warn('Invalid post!')
      return false
    }
  }
})

function openModal() {
  modal.value.openModal()
}

function closeModal() {
  errors.value = {}
}

async function createPost() {
  try {
    errors.value = {}
    const post = (await api.post('/post', form.value)).data
    emit('postCreated', post)
    closeModal()
    modal.value.closeModal()
  } catch (e) {
    if (e.response.status === 422) {
      errors.value = e.response.data.errors
    }
  }
}

defineExpose({
  openModal,
  closeModal
})
</script>
<template>
  <x-modal ref="modal" v-on:close="closeModal">
    <div class="space-y-2 flex flex-col text-gray-900">
      <input type="text" v-model="form.title" />
      <x-error :errors="errors.title" />
      <input type="text" v-model="form.body" />
      <x-error :errors="errors.body" />
      <input type="text" v-model="form.user_id" />
      <x-error :errors="errors.user_id" />
    </div>
    <template #actions>
      <button type="button" @click="createPost">Create</button>
    </template>
  </x-modal>
</template>
