<template>
  <div class="text-center">
    <div
      v-for="movie in movies"
      :key="movie.name"
      :class="getColorClass(movie.color)"
      style="color: var(--command-color);"
    >
      {{ movie.name }} - {{ movie.code }}
    </div>

    <div class="mt-4 select-none">
      The KGB-FBI found you!<br />Auto-destructing results in: <span class="text-red-500">00:{{ remainingSecondsDisplay }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getColorClass } from '@/models/Color';
import { type Movie } from '@/models/State';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

defineProps<{
  movies: Movie[];
}>();

const remainingSeconds = ref(30);
const remainingSecondsDisplay = computed(() => {
  let str = remainingSeconds.value.toString();
  if (str.length < 2) {
    str = '0' + str;
  }

  return str;
});

let interval = 0;

onMounted(() => {
  interval = window.setInterval(() => {
    remainingSeconds.value -= 1;
  }, 1000);
});

onBeforeUnmount(() => {
  window.clearInterval(interval);
});
</script>
