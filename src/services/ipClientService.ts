import axios from 'axios'

const API_URL = 'https://api.ipify.org?format=json'

export const getClientIP = async (): Promise<string> => {
  try {
    const response = await axios.get(API_URL)
    return response.data.ip
  } catch (error) {
    console.error('Erro ao obter IP:', error)
    throw error
  }
}
