<template>
  <div v-if="!candidate?.referenceNumber" class="candidate" style="background-color: #317d5b">
    <div class="candidate__content">
      <div class="candidate__photo-custom">
        <div v-if="!voted" class="no-image">
          <IconUser color="white" :size="85" stroke-width="1" />
        </div>

        <div v-if="voted" class="vote-sent">
          <IconPinInvoke color="white" :size="85" stroke-width="1" />
        </div>
      </div>

      <div class="candidate__info-default">
        <section v-if="!voted">
          <h2>Insira o número do candidato abaixo</h2>
          <h3>Ao digitar o número, aparacerá os dados do candidato</h3>
          <h4>Pressione em votar para realizar a pesquisa</h4>
        </section>

        <section v-if="voted">
          <h1>Você já votou !</h1>
          <h4>Acompanhe os resultados clicando no botão abaixo</h4>
        </section>
      </div>
    </div>
  </div>

  <div
    v-if="candidate?.referenceNumber"
    class="candidate"
    :style="`background-color: ${candidate?.color};`"
  >
    <div class="candidate__content">
      <div class="candidate__photo">
        <img v-if="candidate?.referenceNumber" :src="candidate?.image" :alt="candidate.name" />
      </div>

      <div class="candidate__info">
        <p>{{ candidate?.name }}</p>
        <p>{{ candidate?.referenceNumber }}</p>
        <span>{{ candidate?.politicalParty }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ICandidateModel } from '@/interfaces/candidate'
import { IconPinInvoke, IconUser } from '@tabler/icons-vue'
import { defineProps, ref, watch } from 'vue'
import type { PropType } from 'vue'

const props = defineProps({
  candidateInfo: Object as PropType<ICandidateModel>,
  userVoted: Boolean
})

let candidate = ref(props.candidateInfo)
let voted = ref(props.userVoted)

watch(
  props,
  (newProps) => {
    voted.value = newProps.userVoted
    if (!newProps.userVoted) {
      candidate.value = newProps.candidateInfo
    }
  },
  { deep: true }
)
</script>

<style scoped lang="scss">
.candidate {
  width: 100%;
  height: 200px;

  display: flex;
  justify-content: center;
  align-items: center;

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  &__search {
    position: fixed;
    top: 20px;
    width: 100%;
    left: 15%;

    display: flex;
    align-items: center;

    input {
      width: 70%;
      height: 35px;
      border: solid 1px #f0f0f0;
      border-radius: 4px;
      padding: 5px;
      font-size: medium;
      background: transparent;
      color: #fff;
    }

    input::placeholder {
      color: #fff;
    }

    button {
      background: transparent;
      border: 0;
      cursor: pointer;
    }
  }

  &__photo {
    margin-top: 350px;
    border: 8px solid #fff;
    border-radius: 100%;
    width: 230px;
    height: 230px;

    display: flex;
    align-items: center;
    justify-content: center;

    img {
      padding: 0;
      width: 100%;
      height: 100%;
      border-radius: 100%;
    }
  }

  &__photo-custom {
    margin-top: 450px;
    border: #777272 solid 8px;
    border-radius: 100%;
    width: 230px;
    height: 230px;
    background: #b3b2b2;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__info {
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    p {
      font-size: 35px;
      font-weight: 600;
      margin: 0;
    }

    span {
      font-size: 35px;
      font-weight: 600;
      margin: 0;
    }
  }

  &__info-default {
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    section {
      h1 {
        font-size: 50px;
        font-weight: 600;
        margin: 0;
      }
    }
  }
}
</style>
