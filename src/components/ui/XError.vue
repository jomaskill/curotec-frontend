<script setup>
  defineProps({
    errors: {
      type: Array,
      default: () => []
    }
  })
</script>
<template>
  <div
      v-show="errors.length > 0"
      class="py-1 px-2 bg-red-100 text-xs rounded mt-1"
  >
    <div
        v-for="message in errors"
        :key="message"
        class="text-red-600 font-semibold tracking-wide"
        role="alert"
    >
      {{ message }}
    </div>
  </div>
</template>