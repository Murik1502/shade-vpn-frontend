import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Toaster } from 'sonner'

import PageLayout from '@/components/page-layout/PageLayout'

import { SITE_NAME } from '@/constants/seo.constants'

import './globals.scss'
import Providers from './providers'

const grandisExtended = localFont({
  src: './fonts/GrandisExtended-Regular.woff',
  variable: '--font-grandis-sans',
  weight: '500'
})

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`
  },
  description: 'Самый лучший VPN'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${grandisExtended.variable} antialiased`}>
        <Providers>
          <PageLayout>{children}</PageLayout>
          <Toaster
            theme='dark'
            position='top-center'
            duration={1500}
          />
        </Providers>
      </body>
    </html>
  )
}
