<script setup>
import { onMounted, ref } from 'vue'
import {usePostStore} from "@/stores/post"
import { useApi } from '@/composables/useApi'
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

</script>

<template>
  <div class="h-max space-y-8">
    <div class="h-fit"> Posts </div>
    <div>
      Highlighted Post
      <div class="bg-gray-700 rounded-md p-4 mt-2">
        {{ store.getPostTitle }}
      </div>
    </div>
    <div class="text-end">
      <button @click="getPosts" type="button" class="rounded-full bg-indigo-600 p-1 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        rfrs
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
