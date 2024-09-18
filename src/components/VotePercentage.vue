<template>
  <div class="candidate">
    <img :src="candidateInfo?.image" :alt="candidateInfo?.name" />
    <span>{{ candidateInfo?.name }} - {{ candidateInfo?.reference_number }}</span>
  </div>
  <div class="percentage">
    <div class="percentage__filler-styles" :style="fillerStyles">
      <span class="percentage__label">{{ `${completed}%` }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IVoteCandidateModel } from '@/interfaces/candidate'
import { computed, defineProps } from 'vue'
import type { PropType } from 'vue'

const props = defineProps({
  completed: Number,
  candidateInfo: Object as PropType<IVoteCandidateModel>
})

const fillerStyles = computed(() => {
  return {
    width: `${props.completed}%`,
    backgroundColor: props.candidateInfo?.color
  }
})
</script>

<style lang="scss" scoped>
.candidate {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0 15px;

  img {
    width: 40px;
    height: 40px;
    border-radius: 100%;
    margin-right: 20px;
  }
}

.percentage {
  height: 20px;
  width: 93%;
  background-color: #e0e0de;
  border-radius: 50px;
  font-size: 14px;
  margin: 10px 15px;

  &__label {
    padding: 5px;
    color: white;
    font-weight: bold;
  }

  &__filler-styles {
    height: 100%;
    transition: 'width 1s ease-in-out';
    border-radius: 50px;
    text-align: 'right';
  }
}
</style>
