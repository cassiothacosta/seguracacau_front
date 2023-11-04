import { Html, Head, Main, NextScript, DocumentProps } from 'next/document'
import i18nextConfig from '../../next-i18next.config'

export default function Document(this: any) {

  const currentLocale =
    i18nextConfig.i18n.defaultLocale
    
  return (
    <Html lang={currentLocale} className=''>
      <Head />
     
      <body className='bg-background text-foreground max-sm:absolute max-sm:bg-scroll'>
        <Main/>
        <NextScript />
      </body>
    </Html>

  )

}
