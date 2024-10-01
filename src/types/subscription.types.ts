export interface ISubscription {
  id: number
  typeId: number
  authKey: string
  extraTrafficVolume: number

  type: ISubscriptionType

  paymentDate: string
  expirationDate: string
}

export interface ISubscriptionType {
  id: number
  name: string
  price: number
  title: string
  trafficVolume: number
}
