import { useQuery } from '@tanstack/react-query'

import { IUserResponse, userService } from '@/services/user.service'

export function useUser() {
  const { data, isLoading } = useQuery<IUserResponse>({
    queryKey: ['user'],
    queryFn: () => userService.getUser(),
    retry: false
  })
  return { data, isLoading }
}
