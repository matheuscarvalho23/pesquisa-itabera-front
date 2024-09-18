import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useEmailStore = defineStore('email', () => {
  const email = ref<string>('')
  function setEmail(newEmail: string) {
    email.value = newEmail
  }

  return { email, setEmail }
})
