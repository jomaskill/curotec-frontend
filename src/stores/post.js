import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const usePostStore = defineStore('post', () => {
  const post = ref()

  const getPostTitle = computed(() => post.value?.title)

  function setHighlighted(post) {
    this.post = post
  }

  return {
    post,
    getPostTitle,
    setHighlighted
  }
})
