<template>
  <form
    class="relative"
    @submit="onSubmit"
  >
    <span class="absolute top-0 bottom-0 left-0 p-1 pl-[calc(0.5rem_+_1px)]">></span>
    <input
      id="command-input"
      ref="input"
      v-model="command"
      class="w-full pl-[calc(1.75rem_+_1px)]"
      :disabled
      autocapitalize="false"
      autocomplete="off"
      :placeholder
      @keyup.up="onUp"
      @keyup.down="onDown"
      @keydown.tab="onTab"
      @input="onInput"
    />
  </form>
</template>

<script setup lang="ts">
import { getCommands } from '@/data/Commands';
import { computed, ref, useTemplateRef } from 'vue';

const props = defineProps<{
  disabled?: boolean;
  history: string[];
}>();

const emit = defineEmits<{
  run: [command: string];
}>();

const command = ref('');

const onSubmit = (e: Event) => {
  e.preventDefault();

  const input = command.value.trim();

  if (!input) {
    return;
  }

  upLevel.value = 0;

  emit('run', input);
};

const upLevel = ref(0);

const onUp = () => {
  upLevel.value = Math.min(props.history.length, upLevel.value + 1);

  if (props.history.length > 0) {
    command.value = props.history[props.history.length - upLevel.value];
  }
};

const onDown = () => {
  upLevel.value = Math.max(0, upLevel.value - 1);

  if (props.history.length > 0) {
    command.value = props.history[props.history.length - upLevel.value];
  }
};

const tabLevel = ref(-1);
const tabText = ref('');

const onTab = (e: Event) => {
  e.preventDefault();

  const text = input.value?.value;

  if (!text) {
    return;
  }

  if (!tabText.value) {
    tabText.value = text;
  }

  const matchingCommands = getCommands()
    .map(c => c.key)
    .filter(c => c.startsWith(tabText.value))
    .sort();

  if (!matchingCommands.length) {
    tabLevel.value = -1;
    tabText.value = '';
    return;
  }

  if (tabLevel.value === matchingCommands.length - 1) {
    tabLevel.value = 0;
  } else {
    tabLevel.value = Math.min(matchingCommands.length - 1, tabLevel.value + 1);
  }

  input.value.value = matchingCommands[tabLevel.value];
};

const onInput = () => {
  upLevel.value = 0;
  tabLevel.value = -1;
  tabText.value = '';
};

const placeholder = computed(() => props.history.length ? '' : 'Type a command or `help`.');

const input = useTemplateRef('input');

defineExpose({
  clear() {
    command.value = '';
  },
  focus() {
    input.value?.focus();
  },
});
</script>
