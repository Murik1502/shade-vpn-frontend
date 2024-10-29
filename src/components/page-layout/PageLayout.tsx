import { PropsWithChildren } from 'react'
import { SkeletonTheme } from 'react-loading-skeleton'

import { Header } from './header/Header'

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
        {children}
      </SkeletonTheme>
    </div>
  )
}
