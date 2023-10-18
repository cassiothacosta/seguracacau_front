import { useUser } from '../lib/hooks'
import Layout from '../components/layout'
import { Card } from '@nextui-org/react';
import Registers from '../components/register'
import Login from './login';
import UserPainel from '@/components/userPainel';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticProps } from 'next';
import { useTranslation } from 'react-i18next'
import { useState } from 'react';

const apiLink = process.env.BACKEND_API

export default function Home() {
  const { t } = useTranslation('common')
  const user = useUser()
  const [errorMsg, setErrorMsg] = useState('')
  return (
    <Layout >
      {user ? (
        <div className='grid grid-cols-9 gap-5 w-[90%] h-[90%]'>
          <div className='grid col-span-2'>
            <UserPainel {...user}/>
          </div>
          <div className='grid col-span-7'>
            <Registers {...user} />
            </div>
        </div>
      ) :

        <Login />

      }
    </Layout>

  )
}

export const getStaticProps :GetStaticProps = async ({ locale }) =>({
  props: {
    ...(await serverSideTranslations(locale as any, [
      'common'
    ])),
    // Will be passed to the page component as props
  },
})