<template>
  <WelcomeComponent v-if="!isEmail" @handleNextStep="getRegisterEmail" />
  <CandidateInfo v-if="isEmail" :candidateInfo="candidate" :user-voted="userVoted" />

  <FooterComponent v-if="isEmail">
    <template #footer-actions>
      <div class="footer-component">
        <VoteInput
          v-if="!userVoted && candidateType === 'prefeito'"
          :parts-count="2"
          @update-code="handleCompleteCode"
        />

        <VoteInput
          v-if="!userVoted && candidateType === 'vereador'"
          :parts-count="5"
          @update-code="handleCompleteCode"
        />
        <button
          v-if="!userVoted"
          type="button"
          :style="`background-color: ${candidate?.color};`"
          :disabled="!candidate.referenceNumber"
          :class="{ 'is-disabled': !candidate.referenceNumber }"
          @click="handleVote(candidate)"
        >
          Votar para {{ candidateType }}
        </button>

        <div v-if="userVoted" class="footer-component__actions">
          <button
            type="button"
            :style="`background-color: ${candidate?.color};`"
            @click="showModal = true"
          >
            Ver resultados gerais
            <IconShare2 color="white" :size="35" stroke-width="1" />
          </button>
        </div>
      </div>
    </template>
  </FooterComponent>

  <ModalComponent v-if="showModal" :title-modal="'Resultados'" @closeModal="showModal = false" />
</template>

<script setup lang="ts">
import { getCandidate, voteCandidate } from '@/services/apiService'
import WelcomeComponent from '@/components/WelcomeComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import type { ICandidateModel } from '@/interfaces/candidate'
import ModalComponent from '@/components/ModalComponent.vue'
import CandidateInfo from '@/components/CandidateInfo.vue'
import { getClientIP } from '@/services/ipClientService'
import { useToast } from 'vue-toast-notification'
import { useEmailStore } from '@/stores/user'

import { ref, onMounted, computed } from 'vue'
import VoteInput from './components/VoteInput.vue'

let candidate = ref<ICandidateModel>({
  id: 1,
  name: '',
  politicalParty: '',
  referenceNumber: '',
  slogan: '',
  image: '',
  role: '',
  createdAt: '',
  updatedAt: '',
  color: '#317d5b',
  comments: []
})
let totalVotes = ref(0)
const emailStore = useEmailStore()
const email = computed(() => emailStore.email)
const ipClient = ref('')
let userVoted = ref(false)
let isEmail = ref(false)
const toast = useToast()
let showModal = ref(false)
let candidateType = ref('prefeito')

onMounted(async () => {
  await getIpClient()
  getUserVoted()
  getRegisterEmail()
})

async function getCandidateData(number: string = '10000') {
  try {
    const response = await getCandidate(`/candidate?search=${number}`)

    candidate.value = response.data
    totalVotes.value = response.total_votes
  } catch (error) {
    toast.error('Candidato não encontrado !', {
      position: 'top',
      duration: 3000
    })
  }
}

async function handleSearchCandidate(number: string) {
  getCandidateData(number)
}

async function handleVote(candidate: ICandidateModel) {
  const payload = {
    email: email.value,
    ip_client: ipClient.value,
    quantity: 1,
    role: candidateType.value
  }

  if (candidateType.value === 'vereador') {
    userVoted.value = true
  }

  try {
    await voteCandidate(`candidates/${candidate.id}/votes`, payload)

    localStorage.setItem('userVoted', 'true')

    candidateType.value = 'vereador'
    candidate.color = '#317d5b'

    candidate.referenceNumber = ''
    toast.success('Voto realizado com sucesso!', {
      position: 'top',
      duration: 3000
    })
  } catch (error) {
    console.log(error)

    toast.error('Não é possível votar mais de uma vez !', {
      position: 'top',
      duration: 3000
    })
  }
}

async function getIpClient() {
  try {
    ipClient.value = await getClientIP()
  } catch (error) {
    console.log(error)
  }
}

function getUserVoted() {
  const isVoted = localStorage.getItem('userVoted')

  if (isVoted) {
    userVoted.value = true
  }
}

function getRegisterEmail() {
  const verifyEmail = localStorage.getItem('email')

  if (verifyEmail) {
    isEmail.value = true
  }
}

const handleCompleteCode = (number: string) => {
  if (
    (candidateType.value === 'prefeito' && number.length === 2) ||
    (candidateType.value === 'vereador' && number.length === 5)
  ) {
    handleSearchCandidate(number)
  }
}
</script>

<style lang="scss" scoped>
.footer-component {
  width: 100%;
  height: 200px;
  position: fixed;
  bottom: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: column;

  &__actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 70%;
  }

  button {
    color: #fff;
    width: 90%;
    height: 55px;
    font-size: x-large;
    border-radius: 4px;
    border: 0;

    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-top: 10px;
  }

  span {
    font-size: larger;
  }

  .is-disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
}
</style>
