import Head from 'next/head'
import Header from './header'
import { Container } from '@nextui-org/react'

const Layout = (props: any) => (
  <>
    <Head>
      <title>Segura Cacau - Home</title>
    </Head>

    <Header />

    {props.children && (
      
        <Container gap={0}> {props.children}</Container>

    )

    }


    <style jsx global>{`
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }
      body {
        
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
          'Helvetica Neue', Arial, Noto Sans, sans-serif, 'Apple Color Emoji',
          'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
      }
      .container {
        max-width: 100%;
        margin: 0 auto;
        padding: 2rem 1.25rem;
      } 
      tr{
        height: 20px
      }
    `}</style>
  </>
)

export default Layout
