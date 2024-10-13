import { axiosWithAuth } from '@/api/interceptors'

export const subscriptionService = {
  async getFreeSubscription() {
    return await axiosWithAuth.post('/subscription/free')
  }
}
