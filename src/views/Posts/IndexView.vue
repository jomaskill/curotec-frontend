<script setup>
import { onMounted, ref } from 'vue'
import { useApi } from '@/composables/useApi'
const { get } = useApi()

const posts = ref()

onMounted(() => {
  getPosts()
})

async function getPosts() {
  posts.value = (await get('/post')).data
}
</script>

<template>{{ posts }}}</template>
