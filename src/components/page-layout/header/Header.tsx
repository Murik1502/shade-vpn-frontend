import { Profile } from './profile/Profile'

export function Header() {
  return (
    <header>
      <div className='w-full h-fit pb-8'>
        <Profile />
      </div>
    </header>
  )
}
