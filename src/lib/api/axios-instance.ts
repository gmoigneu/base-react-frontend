import axios, { AxiosResponse } from 'axios'

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  withXSRFToken: true,
})

axiosInstance.interceptors.request.use((config) => {
  config.headers['Accept'] = 'application/json'
  return config
})

axiosInstance.interceptors.response.use((response) => {
  if (response.status === 401) {
    window.location.href = '/login'
  }

  return response.data
})
