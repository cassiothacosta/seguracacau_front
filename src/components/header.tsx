import Link from 'next/link'
import { useUser } from '../lib/hooks'
import  ThemeSwitcher from './themeSwitcher'

export default function Header() {
  const user = useUser()
  
  return (
    <header>
      <nav>
        <ul>
          {user && (            
              <li>
                <Link href= "http://localhost:3000/api/logout" legacyBehavior>
                 Logout
                </Link>
              </li>
          )}
          <li>
            <ThemeSwitcher/>
          </li>
        </ul>
      </nav>
    </header>
  )
}

