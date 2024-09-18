<template>
  <div class="input-container">
    <input
      v-for="(value, index) in parts"
      :key="index"
      v-model="parts[index]"
      type="text"
      maxlength="1"
      class="input-box"
      @input="onInput(index)"
      @keydown="handleKeyDown($event, index)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps({
  partsCount: {
    type: Number,
    default: 2
  }
})

const emit = defineEmits(['updateCode'])
const parts = ref(Array(props.partsCount).fill(''))

function onInput(index: number) {
  if (parts.value[index].length === 1 && index < props.partsCount - 1) {
    const nextInput = document.querySelectorAll('input')[index + 1]
    nextInput?.focus()
  }
  const code = parts.value.join('')
  emit('updateCode', code)
}

function handleKeyDown(event: KeyboardEvent, index: number) {
  const target = <HTMLInputElement>event.target

  if (event.key === 'Backspace' && !target.value && index > 0) {
    const previousInput = document.querySelectorAll('input')[index - 1]
    previousInput?.focus()
  }
}
</script>

<style lang="scss" scoped>
.input-container {
  display: flex;
  gap: 10px;
  width: 90%;
}

.input-box {
  width: 100%;
  height: 63.5px;
  font-size: 28px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
