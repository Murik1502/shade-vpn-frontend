export interface ISubscription {
  id: number
  typeId: number
  authKey: string
  extraTrafficVolume: number

  type: ISubscriptionType

  keyAccessUrl: string

  paymentDate: string
  expirationDate: string
}

export interface ISubscriptionType {
  id: number
  price: number
  title: string
  trafficVolume: number
}

export interface ISubscriptionResponse extends ISubscriptionType {}
