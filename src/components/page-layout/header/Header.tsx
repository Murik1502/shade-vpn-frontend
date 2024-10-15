import { Profile } from './profile/Profile'

export function Header() {
  return (
    <header>
      <div
        className='w-full h-fit p-4 fixed z-10'
        style={{ background: 'var(--background)' }}
      >
        <Profile />
      </div>
    </header>
  )
}
