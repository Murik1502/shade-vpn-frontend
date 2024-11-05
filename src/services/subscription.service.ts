import { ISubscriptionResponse } from '@/types/subscription.types'

import { axiosWithAuth } from '@/api/interceptors'

class SubscriptionService {
  private BASE_URL = '/subscription'
  async getFreeSubscription() {
    return await axiosWithAuth.post(`${this.BASE_URL}/free`)
  }

  async getAllSubs() {
    const response = await axiosWithAuth.get<ISubscriptionResponse[]>(
      this.BASE_URL
    )

    return response.data
  }
}

export const subscriptionService = new SubscriptionService()
