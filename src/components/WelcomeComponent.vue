<template>
  <div class="welcome">
    <div class="welcome__header">
      <h1>Pesquisa Itaberá</h1>
    </div>

    <div class="welcome__content">
      <h2>Seja bem vindo (a) a pesquisa de candidatos em Itaberá SP</h2>
      <h3>Informe seu e-mail para realizar a pesquisa.</h3>

      <input v-model="email" type="email" placeholder="Insira seu e-mail" v-bind="emailAttrs" />
      <div class="errors">
        <span>{{ errors.email }}</span>
      </div>

      <span>ou</span>

      <button type="button" @click="emit('openResultsModal')">Ver resultados</button>
    </div>
  </div>

  <FooterComponent>
    <template #footer-actions>
      <div class="footer-component">
        <button
          type="button"
          :disabled="verifyEmail()"
          :class="{ 'is-disabled': !email || errors.email }"
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
import { useForm } from 'vee-validate'
import { defineEmits } from 'vue'
import * as yup from 'yup'

const emit = defineEmits(['handleNextStep', 'openResultsModal'])
const emailStore = useEmailStore()

const { errors, defineField } = useForm({
  validationSchema: yup.object({
    email: yup.string().email('E-mail inválido').required('E-mail obrigatório')
  })
})

const [email, emailAttrs] = defineField('email')

function handleNextStep() {
  if (!errors.value.email) {
    emailStore.setEmail(email.value)
    localStorage.setItem('email', email.value)
    emit('handleNextStep')
  }
}

function verifyEmail() {
  if (!email.value || errors.value.email) {
    return true
  }
  return false
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

    .errors {
      position: relative;
      span {
        color: red;
        font-size: 15px;
      }
    }

    span {
      margin: 20px 0;
    }

    button {
      width: 100%;
      height: 45px;
      border: 0;
      background: #317d5b;
      color: #fff;
      font-size: 18px;
      border-radius: 4px;
      cursor: pointer;
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
