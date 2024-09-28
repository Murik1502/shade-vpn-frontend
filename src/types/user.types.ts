export interface IUser {
  id: number
  firstName: string
  lastName?: string
  username?: string
  photoUrl?: string
  languageCode?: string

  authKey?: string
  subscriptionId?: string
  paymentDate?: string

  createdAt?: string
  updatedAt?: string
}
