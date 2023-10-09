import '@/styles/globals.css'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute='class' defaultTheme='dark'>
        <Component {...pageProps} />
      </NextThemesProvider>
    </NextUIProvider>
  )
}
export default appWithTranslation(App)