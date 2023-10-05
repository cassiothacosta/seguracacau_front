import Link from 'next/link'
import { useUser } from '../lib/hooks'
import  ThemeSwitcher from './themeSwitcher'

export default function Header() {
  const user = useUser()
  
  return (
    <header>
      <nav>
        <ul>
          <li>
            <ThemeSwitcher/>
          </li>
        </ul>
      </nav>
    </header>
  )
}

