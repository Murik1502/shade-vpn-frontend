'use client'

import { useRouter } from 'next/navigation'
import 'react-loading-skeleton/dist/skeleton.css'
import { toast } from 'sonner'

import { BenefitsCard } from '@/components/ui/benefitsCard/BenefitsCard'
import { WelcomeSign } from '@/components/ui/welcomeSign/WelcomeSign'
import { WelcomeSignSkeleton } from '@/components/ui/welcomeSign/WelcomeSignSkeleton'

import { useUser } from '@/hooks/useUser'

import { useTelegram } from './providers'
import { invoiceService } from '@/services/invoice.service'
import { subscriptionService } from '@/services/subscription.service'

export default function Home() {
  const { webApp } = useTelegram()
  const router = useRouter()
  const { data, isLoading } = useUser()

  const handleCreateInvoice = (subType: number) => {
    if (subType === 0) {
      return subscriptionService.getFreeSubscription()
    }

    invoiceService
      .getInvoice({
        subTypeId: subType
      })
      .then(resp => {
        console.log(resp)

        if (!resp.data.ok) {
          toast.error(resp.data.errorMessage)
          return
        }

        webApp?.openInvoice(resp.data.result)
      })
      .catch(e => {
        toast.error(e.message)
      })
  }

  return (
    <div className='p-4 flex flex-col w-full h-screen overflow-auto gap-3'>
      {isLoading ? <WelcomeSignSkeleton /> : <WelcomeSign />}
      <BenefitsCard />
      <div className='flex gap-4 w-full items-center justify-center flex-row'>
        <button
          className='w-full p-2 rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors bg-[#f2f2f2] dark:bg-[#1a1a1a] text-sm sm:text-base'
          onClick={() => handleCreateInvoice(0)}
        >
          Free
        </button>
        <button
          className='w-full p-2 rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors bg-[#f2f2f2] dark:bg-[#1a1a1a] text-sm sm:text-base'
          onClick={() => handleCreateInvoice(2)}
        >
          Basic
        </button>
        <button
          className='w-full p-2 rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors bg-[#f2f2f2] dark:bg-[#1a1a1a] text-sm sm:text-base'
          onClick={() => handleCreateInvoice(3)}
        >
          Premium
        </button>
      </div>
    </div>
  )
}
