import { IUser } from '@/types/user.types'

import { axiosWithAuth } from '@/api/interceptors'

export const authService = {
  async register() {
    return await axiosWithAuth.post<IUser>('/auth/register')
  }
}
