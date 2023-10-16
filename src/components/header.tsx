import ThemeSwitcher from './themeSwitcher'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem, Card } from '@nextui-org/react'
import "/node_modules/flag-icons/css/flag-icons.min.css";

export default function Header() {

  const router = useRouter()
  const { t, i18n } = useTranslation('common')


  const onToggleLanguageClick = (newLocale: string) => {
    const { pathname, asPath, query } = router
    router.push({ pathname, query }, asPath, { locale: newLocale })
  }

  const clientSideLanguageChange = (newLocale: string) => {
    i18n.changeLanguage(newLocale);
  }

  const changeTo = i18n.resolvedLanguage === 'ptbr' ? 'en' : 'ptbr'

  // const changeTo = i18n.resolvedLanguage === 'en' ? 'de' : 'en'

  return (
    <header>
      <nav>
        <ul>
          <li>
            <ThemeSwitcher />
            <div className='absolute'> 
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      variant="light"
                    >{changeTo !== "ptbr" ?<span className="fi fi-br"></span> :
                    <span className="fi fi-us"></span>}
                      {t('change-locale')}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu variant="flat" aria-label="Dropdown menu with shortcut">
                    <DropdownItem key="ptbr" onClick={() => onToggleLanguageClick('ptbr') as any} className="br"><span className="fi fi-br"></span> PT-BR</DropdownItem>
                    <DropdownItem key="new" onClick={() => onToggleLanguageClick('en') as any}><span className="fi fi-us"></span>EN-US</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  )
}

function selectLocale(arg0: (location: any) => void) {
  throw new Error('Function not implemented.')
}

