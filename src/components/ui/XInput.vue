<script setup>
defineProps({
  label: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  name: {
    type: String,
    required: true
  },
  value: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <input
    :type="type"
    :name="name"
    :id="name"
    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    aria-describedby="email-optional"
    :value="value"
    @input="$emit('input', $event.target.value)"
  />
</template>
