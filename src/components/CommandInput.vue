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
      @input="onInput"
    />
  </form>
</template>

<script setup lang="ts">
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

const onInput = () => {
  upLevel.value = 0;
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
