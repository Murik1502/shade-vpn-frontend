export interface IInvoice {
  subscriptionId: number
}

export interface IInvoiceResponse {
  ok: boolean
  result?: string
  errorMessage?: string
}
