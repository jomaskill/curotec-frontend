<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Child from "@/views/Posts/Child.vue";
</script>

<template>
  <div class="block bg-gray-700">
    <header>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/posts">Post</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </header>
    <div class="h-full w-full p-8">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
  header {
    @apply w-full h-24 bg-gray-800 p-4
  }
  header > a {
    @apply border border-amber-400 p-4
  }
</style>
