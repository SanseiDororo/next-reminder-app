import { UserButton } from '@clerk/nextjs'
import ThemeSwitcher from './ThemeSwitcher'
import Logo from './Logo'

const NavBar = () => {
  return (
    <nav className="flex w-full items-center justify-between p-4 px-8 h-[60px]">
      <Logo />
      <div className="flex gap-4 items-center">
        <ThemeSwitcher />
        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  )
}
export default NavBar
