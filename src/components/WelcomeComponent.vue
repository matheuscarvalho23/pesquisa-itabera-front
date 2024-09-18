<template>
  <div class="welcome">
    <div class="welcome__header">
      <h1>Pesquisa Itaberá</h1>
    </div>

    <div class="welcome__content">
      <h2>Seja bem vindo (a) a pesquisa de candidatos em Itaberá SP</h2>
      <h3>Informe seu e-mail para realizar a pesquisa.</h3>

      <input v-model="email" type="email" placeholder="Insira seu e-mail" />
    </div>
  </div>

  <FooterComponent>
    <template #footer-actions>
      <div class="footer-component">
        <button
          type="button"
          :disabled="!email"
          :class="{ 'is-disabled': !email }"
          @click="handleNextStep"
        >
          Continuar
        </button>
      </div>
    </template>
  </FooterComponent>
</template>

<script setup lang="ts">
import FooterComponent from './FooterComponent.vue'
import { useEmailStore } from '@/stores/user'
import { ref, defineEmits } from 'vue'

const emit = defineEmits(['handleNextStep'])
const email = ref('')
const emailStore = useEmailStore()

function handleNextStep() {
  emailStore.setEmail(email.value)
  localStorage.setItem('email', email.value)
  emit('handleNextStep')
}
</script>

<style scoped lang="scss">
.welcome {
  &__header {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    background: #317d5b;
    color: #fff;

    text-transform: uppercase;
  }

  &__content {
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    input {
      width: 97%;
      height: 35px;
      border: solid 1px #bdbbbb;
      border-radius: 4px;
      padding: 5px;
      font-size: medium;
      background: transparent;
    }
  }
}

.footer-component {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    background: #317d5b;
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
  }

  .is-disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
}
</style>
