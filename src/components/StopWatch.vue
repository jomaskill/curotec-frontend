<template>
  <div class="bg-amber-50 text-gray-900">
    <div class="w-36 h-24">
      <span v-if="seconds"> {{ seconds }} S </span>
      <span class="ml-2">
        {{ milliSeconds }}
      </span>
    </div>
    <div class="inline-flex gap-2">
      <button @click="start" type="button" class="p-2 border border-amber-300">Start</button>
      <button @click="stop" type="button" class="p-2 border border-amber-300">Stop</button>
      <button @click="reset" type="button" class="p-2 border border-amber-300">Reset</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const time = ref(0)
const watchInterval = ref()
const started = ref(false)

const milliSeconds = computed(() => {
  let timer = time.value.toString()
  return timer.slice(-2)
})

const seconds = computed(() => {
  let timer = time.value.toString()
  return timer.slice(-4, -2)
})

function start() {
  if (started.value) {
    return
  }

  started.value = true

  watchInterval.value = setInterval(() => {
    time.value++
  }, 10)
}

function stop() {
  started.value = false
  clearInterval(watchInterval.value)
}

function reset() {
  started.value = false
  time.value = 0
  clearInterval(watchInterval.value)
}
</script>

<style scoped></style>
