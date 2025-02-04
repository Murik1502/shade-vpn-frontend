'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Script from 'next/script'
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'

import { ITelegramUser, IWebApp } from '@/types/telegram.types'

export interface ITelegramContext {
  webApp?: IWebApp
  user?: ITelegramUser
}

export const TelegramContext = createContext<ITelegramContext>({})

export default function Providers({ children }: PropsWithChildren) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: true
        }
      }
    })
  )

  const [webApp, setWebApp] = useState<IWebApp | null>(null)

  useEffect(() => {
    const app = (window as any).Telegram?.WebApp
    if (app) {
      app.ready()
      setWebApp(app)
    }
  }, [])

  const value = useMemo(() => {
    return webApp
      ? {
          webApp,
          unsafeData: webApp.initDataUnsafe,
          user: webApp.initDataUnsafe.user
        }
      : {}
  }, [webApp])

  return (
    <QueryClientProvider client={client}>
      <TelegramContext.Provider value={value}>
        <Script
          src='https://telegram.org/js/telegram-web-app.js'
          strategy='beforeInteractive'
        />
        {children}
      </TelegramContext.Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export const useTelegram = () => useContext(TelegramContext)
