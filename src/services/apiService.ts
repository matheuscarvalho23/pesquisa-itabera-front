import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
})

export const getCandidate = async (endpoint: string) => {
  try {
    const response = await api.get(endpoint)
    return response.data
  } catch (error) {
    console.error('Erro ao buscar candidato', error)
    throw error
  }
}

export const voteCandidate = async (endpoint: string, payload: object) => {
  try {
    const response = await api.post(endpoint, payload)
    return response.data
  } catch (error) {
    console.error('Erro ao votar', error)
    throw error
  }
}

export const getVotes = async (endpoint: string) => {
  try {
    const response = await api.get(endpoint)
    return response.data
  } catch (error) {
    console.error('Erro ao buscar votos', error)
    throw error
  }
}
