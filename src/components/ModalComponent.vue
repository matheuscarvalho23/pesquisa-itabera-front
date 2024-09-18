<template>
  <div class="modal">
    <div class="modal__header">
      <h2>{{ titleModal }}</h2>

      <button type="button" @click="emit('closeModal')">
        <IconX color="black" :size="45" stroke-width="1" />
      </button>
    </div>

    <div class="modal__body">
      <div class="type">
        <label>
          <input v-model="candidateType" type="radio" name="radio" value="prefeito" checked />
          <div class="prefeito box">
            <span>Prefeito</span>
          </div>
        </label>

        <label>
          <input v-model="candidateType" type="radio" name="radio" value="vereador" />
          <div class="vereador box">
            <span>Vereador</span>
          </div>
        </label>
      </div>

      <p>{{ total }} votos contabilizados</p>

      <button @click="getVotesData(candidateType)" type="button" class="refresh-votes">
        <span>Atualizar votos</span>
        <IconRefresh :size="25" color="white" stroke-width="1" />
      </button>

      <div v-if="!isLoading" class="percentage">
        <VotePercentage
          v-for="(item, index) in candidates"
          :key="index"
          :completed="item.vote_percentage"
          :candidate-info="item"
        />
      </div>

      <h2 v-if="isLoading">Atualizando Votos</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, defineEmits, onMounted, watch } from 'vue'
import type { IVoteCandidateModel } from '@/interfaces/candidate'
import VotePercentage from '@/components/VotePercentage.vue'
import { getVotes } from '@/services/apiService'
import { IconRefresh, IconX } from '@tabler/icons-vue'

defineProps({
  titleModal: String
})

const emit = defineEmits(['closeModal'])

const candidateType = ref('prefeito')

let candidates = ref<IVoteCandidateModel[]>([])
let assemblyman = ref<IVoteCandidateModel[]>([])
let total = ref(0)
let isLoading = ref(false)

onMounted(() => {
  getVotesData(candidateType.value)
})

async function getVotesData(value: string = 'prefeito') {
  isLoading.value = true
  try {
    const response = await getVotes(`/votes?role=${value}`)

    candidates.value = response.candidates
    assemblyman
    total.value = response.total_votes
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}

watch(candidateType, (value: string) => {
  getVotesData(value)
})
</script>

<style lang="scss" scoped>
.modal {
  width: 100vw;
  height: 100vh;
  background: #fff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  display: flex;
  flex-direction: column;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    border-bottom: 1px solid #bababa;

    h2 {
      margin: 0 0 0 15px;
      color: #211f1f;
    }

    button {
      margin: 15px 15px;
      background: transparent;
      border: 0;
      cursor: pointer;
    }
  }

  &__body {
    display: flex;
    flex-direction: column;
    align-items: center;

    margin-top: 20px;

    width: 100%;
    text-align: center;

    flex: 1;
    overflow-y: auto;

    .type {
      display: flex;
      border: solid 1px #317d5b;

      input[type='radio'] {
        display: none;
        &:checked {
          + .box {
            background-color: #317d5b;
            span {
              color: #fff;
              transform: translateY(70px);
              &:before {
                transform: translateY(0px);
                opacity: 1;
              }
            }
          }
        }
      }

      .box {
        width: 200px;
        height: 40px;
        background-color: #fff;
        transition: all 250ms ease;
        will-change: transition;
        cursor: pointer;
        position: relative;

        span {
          transform: translate(0, 60px);
          left: 0;
          right: 0;
          transition: all 300ms ease;
          font-size: 1.5em;
          user-select: none;
          color: #317d5b;
        }
      }

      p {
        color: #fff;
        font-weight: 400;
        a {
          text-decoration: underline;
          font-weight: bold;
          color: #fff;
        }
      }
    }

    .refresh-votes {
      background: #317d5b;
      color: #fff;

      display: flex;
      justify-content: center;
      align-items: center;

      border: 0;
      border-radius: 4px;
      padding: 10px 15px;

      span {
        margin-right: 5px;
      }
    }

    .percentage {
      width: 100%;
      padding: 0 10px;
      margin-top: 20px;
      margin-bottom: 20px;

      height: 5000px;
      overflow-x: auto;
    }
  }
}
</style>
