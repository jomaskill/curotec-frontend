<script setup>
import { onMounted, ref } from 'vue'
import {usePostStore} from "@/stores/post"
import { useApi } from '@/composables/useApi'
import CreateModal from "@/components/posts/createModal.vue";
const createModal = ref()

const { get } = useApi()
const store = usePostStore()

const posts = ref()

onMounted(() => {
  getPosts()
})

async function getPosts() {
  posts.value = (await get('/post')).data
}

function setPost(post) {
  store.setHighlighted(post)
}

function openCreateModal(){
  createModal.value.openModal()
}

function postCreated(post){
  posts.value.push(post)
}

</script>

<template>
  <div class="h-max space-y-8">
    <create-modal ref="createModal" v-on:postCreated="postCreated"/>
    <div class="h-fit w-full inline-flex justify-between">
      Posts

      <button type="button" @click="openCreateModal">
        New
      </button>
    </div>
    <div>
      Highlighted Post
      <div class="bg-gray-700 rounded-md p-4 mt-2">
        {{ store.getPostTitle }}
      </div>
    </div>
    <div class="text-end">
      <button @click="getPosts" type="button" class="rounded-full bg-indigo-600 p-1 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
      </button>
      <div class="h-[600px] overflow-y-auto border-b border-2 bg-gray-700">
        <div v-for="post in posts" :key="post.id">
          <ul class="p-2 hover:bg-gray-800 cursor-pointer text-start" @click="setPost(post)">
            <li>{{ post.title }}</li>
            <li>{{ post.body }}</li>
            <li>{{ post.user.name }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
