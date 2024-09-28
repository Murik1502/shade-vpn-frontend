import axios, { CreateAxiosDefaults } from 'axios'
import { toast } from 'sonner'

import { errorCatch } from './errors'
import { getAccessToken } from '@/services/auth-token.service'
import { authService } from '@/services/auth.service'

const axiosConfig: CreateAxiosDefaults = {
  baseURL: process.env.NEXT_PUBLIC_API_URL
    ? `${process.env.NEXT_PUBLIC_API_URL}/api`
    : 'http://localhost:4200/api',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
}

const axiosClassic = axios.create(axiosConfig)

const axiosWithAuth = axios.create(axiosConfig)

axiosWithAuth.interceptors.request.use(config => {
  const accessToken = getAccessToken()

  if (config?.headers && accessToken) {
    config.headers.Authorization = `tma ${accessToken}`
  }

  return config
})

axiosWithAuth.interceptors.response.use(
  config => config,
  async error => {
    const originalRequest = error.config

    if (
      error.response?.statusCode === 404 &&
      errorCatch(error) === 'User not found' &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true
      try {
        await authService.register()
        return axiosWithAuth.request(originalRequest)
      } catch (error) {
        toast.error('Произошла неизвестная ошибка. Перезапустите приложение')
      }
    }

    if (
      (error.response?.statusCode === 401 ||
        errorCatch(error) === 'Invalid token or token expired') &&
      error.config
    ) {
      toast.error('Сессия закончилась. Перезапустите приложение')
    }
    throw error
  }
)

export { axiosClassic, axiosWithAuth }
