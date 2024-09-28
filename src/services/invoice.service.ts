import { axiosWithAuth } from '@/api/interceptors'

import { IInvoice, IInvoiceResponse } from './../types/invoice.types'

export const invoiceService = {
  async getInvoice(invoiceData: IInvoice) {
    return await axiosWithAuth.post<IInvoiceResponse>(
      'telegram/invoice',
      invoiceData
    )
  }
}
