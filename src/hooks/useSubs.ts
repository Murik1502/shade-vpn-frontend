import { useQuery } from '@tanstack/react-query'

import { ISubscriptionResponse } from '@/types/subscription.types'

import { subscriptionService } from '@/services/subscription.service'

export function useSubs() {
  const { data, isLoading } = useQuery<ISubscriptionResponse[]>({
    queryKey: ['subs'],
    queryFn: () => subscriptionService.getAllSubs(),
    retry: false
  })

  return { data, isLoading }
}
