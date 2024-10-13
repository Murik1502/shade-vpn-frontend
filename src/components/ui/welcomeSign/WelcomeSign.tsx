'use client'

import s from './welcomeSign.module.scss'

export function WelcomeSign() {
  return (
    <div className='w-full h-fit flex justify-between items-center'>
      <span className='text-xl font-bold'>
        Добро пожаловать <br /> в
        <span className='font-bold text-3xl text-primary'> Shade VPN</span>
      </span>
      <span className={s.logo}></span>
    </div>
  )
}
