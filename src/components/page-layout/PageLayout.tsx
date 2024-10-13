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
      <main className='p-4 overflow-x-hidden max-h-screen relative'>
        <SkeletonTheme
          baseColor='#202020'
          highlightColor='#444'
        >
          <Header />
          {children}
          <Navbar />
        </SkeletonTheme>
      </main>
    </div>
  )
}
