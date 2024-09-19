<template>
  <main
    :class="[ mainColor ]"
    class="
      command-window
      flex flex-col justify-end flex-1 h-dvh w-full sm:p-4
      font-mono transition-all duration-500
    "
  >
    <h1 class="text-center mb-auto">
      <span>Hackathon 2024</span>
      <span class="ml-1 text-xs md:text-sm">alpha-0.0.1</span>
    </h1>

    <CompletedResult
      v-if="state.completed"
      :movies="state.movies"
      class="mx-auto my-auto"
    />

    <code
      v-else
      ref="logDisplay"
      class="whitespace-pre-wrap p-2 overflow-x-hidden overflow-y-auto break-all w-full max-w-2xl mx-auto transition-all duraiton-500 select-none mt-2 md:mt-8"
      :style="{
        transform: `rotate(${state.rotation}deg)`,
        filter: `blur(${state.blur}px)`,
        scrollbarColor: 'var(--contrast) var(--command-color)'
      }"
    >
      {{ logForDisplay }}
    </code>

    <CommandInput
      ref="input"
      :disabled="isRunning"
      class="w-full flex-none max-w-2xl mx-auto md:mb-24"
      :history="commandHistory"
      @run="onRun"
    />
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, useTemplateRef, watch } from 'vue';
import CommandInput from './components/CommandInput.vue';
import CompletedResult from './components/CompletedResult.vue';
import { runCommand } from './data/RunCommand';
import { getColorClass } from './models/Color';
import type { State } from './models/State';
import { registerState } from './Utils';

const commandHistory = ref<string[]>(JSON.parse(localStorage.getItem('history') ?? '[]'));
const log = ref(localStorage.getItem('log') ?? '');
const logForDisplay = computed(() => log.value.trim());

const scrollLogToBottom = () => {
  if (logDisplay.value) {
    logDisplay.value.scrollBy(0, logDisplay.value.scrollHeight);
  }
};

const logger = (input: string) => {
  log.value += input + '\n\r';

  localStorage.setItem('log', log.value);
};

watch(log, () => {
  scrollLogToBottom();
}, { flush: 'post' });

const logDisplay = useTemplateRef('logDisplay');
const input = useTemplateRef('input');

const loadState = () => {
  const storedJson = localStorage.getItem('state');

  if (storedJson) {
    return JSON.parse(storedJson);
  }
};

let isFirstView = false;

const getInitialState = () => {
  isFirstView = true;

  return {
    id: Math.random().toString().substring(2),
    color: undefined,
    movies: [],
    rotation: 0,
    blur: 0,
    fileCorruption: 0,
    connected: false,
    completed: false,
  } satisfies State;
};

const state = reactive<State>(loadState() ?? getInitialState());

watch(state, newState => {
  localStorage.setItem('state', JSON.stringify(newState));
}, {
  deep: true,
});

const isRunning = ref(false);

const onRun = async (command: string) => {
  isRunning.value = true;

  commandHistory.value.push(command);
  localStorage.setItem('history', JSON.stringify(commandHistory.value));

  await runCommand(command, state, logger);

  input.value?.clear();

  isRunning.value = false;
};

onMounted(async () => {
  scrollLogToBottom();
  input.value?.focus();

  if (isFirstView) {
    await registerState(state);
  }
});

watch(isRunning, newIsRunning => {
  if (!newIsRunning) {
    input.value?.focus();
  }
  // Flush at post, so the input is enabled before focus is called.
}, { flush: 'post' });

const mainColor = computed(() => getColorClass(state.color));
</script>
