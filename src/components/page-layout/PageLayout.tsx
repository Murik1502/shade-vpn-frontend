import { PropsWithChildren } from 'react'
import { SkeletonTheme } from 'react-loading-skeleton'

import { Header } from './header/Header'
import { Navbar } from './navbar/Navbar'

export default function PageLayout({
  children
}: {
  children: PropsWithChildren<any>
}) {
  return (
    <div className='w-full h-full flex flex-col'>
      <SkeletonTheme
        baseColor='#202020'
        highlightColor='#444'
      >
        <Header />
        <main className='p-4 pt-16 h-full flex flex-1 flex-col overflow-x-hidden relative'>
          {children}
        </main>
        <Navbar />
      </SkeletonTheme>
    </div>
  )
}
