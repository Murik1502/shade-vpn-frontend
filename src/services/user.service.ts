import { ISubscription } from '@/types/subscription.types'
import { IUser } from '@/types/user.types'

import { axiosWithAuth } from '@/api/interceptors'

export interface IUserResponse extends IUser {
  subscription: ISubscription
}

class UserService {
  private BASE_URL = '/user'

  async getUser() {
    const response = await axiosWithAuth.get<IUserResponse>(this.BASE_URL)

    return response.data
  }

  async updateUser(user: Partial<IUser>) {
    return await axiosWithAuth.patch<IUser>(this.BASE_URL, user)
  }
}

export const userService = new UserService()
