import Link from 'next/link'
import { useUser } from '../lib/hooks'
import ThemeSwitcher from './themeSwitcher'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'

export default function Header() {
  const user = useUser()
  const router = useRouter()
  const { t, i18n } = useTranslation('common')


  const onToggleLanguageClick = (newLocale: string) => {
    const { pathname, asPath, query } = router
    router.push({ pathname, query }, asPath, { locale: newLocale })
  }

  const clientSideLanguageChange = (newLocale: string) => {
    i18n.changeLanguage(newLocale);
  }

  const changeTo = router.locale === 'ptbr' ? 'en' : 'ptbr'
  // const changeTo = i18n.resolvedLanguage === 'en' ? 'de' : 'en'

  return (
    <header>
      <nav>
        <ul>
          <li>
            <ThemeSwitcher />
            <div className='absolute'>

          
          <button onClick={() => onToggleLanguageClick(changeTo)}>
            {t('change-locale', { changeTo })}
          </button>
  
              {/* alternative language change without using Link component, but this will change language only on client side
          <button onClick={() => clientSideLanguageChange(changeTo)}>
            {t('change-locale', { changeTo })}
          </button> */}
             
            </div>
          </li>
        </ul>
      </nav>
    </header>
  )
}

