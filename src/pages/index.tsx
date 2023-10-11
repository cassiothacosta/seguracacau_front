import { useUser } from '../lib/hooks'
import Layout from '../components/layout'
import { Card, Spacer } from '@nextui-org/react';
import Registers from '../components/register'
import RegistersByType from '../components/registerByType';
import RegistersByCategory from '../components/registerByCategory'
import Login from './login';
import UserPainel from '@/components/userPainel';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'react-i18next'
import Router, { useRouter } from 'next/router'
import { useState } from 'react';

const apiLink = process.env.BACKEND_API

export default function Home() {
  const { t } = useTranslation('common')

  const user = useUser()

  const [errorMsg, setErrorMsg] = useState('')
  
  async function handleDeleteRegister(e: Event & {
    currentTarget: any
  }) {

    e.preventDefault()
    if (errorMsg) setErrorMsg('')

    const body = {
      username: e.currentTarget,
      id: e.currentTarget,
    }

    console.log(e.currentTarget)

  //  try {
  //   const res = await fetch(apiLink + '/api/', {
  //     method: 'POST',
  //      headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(body),
  //       credentials: 'include'
  //     })
  //     if (res.status === 200) {
  //      Router.reload()

  //     } else {
  //       throw new Error(await res.text())
  //     }
  //   } catch (error: any) {
  //     console.error('An unexpected error happened occurred:', error)
  //     setErrorMsg(error.message)
  //   }
    
  // 
}


  return (
    <Layout >
      {user ? (
        <div className='grid grid-cols-9 gap-5 w-[90%] h-[90%]'>
          <div className='grid col-span-2'>
            <UserPainel {...user}/>
          </div>
          <Card className='flex justify-center grid col-span-5 pt-5'>
            <Registers {...user} onClick={handleDeleteRegister}/>
          </Card>

          <div className='grid col-span-2'>
            <Card className='grid pt-5'>
              <div className='text-center'>
                {t('graph1')}
                <RegistersByType {...user} />
              </div>
              <div className='text-center'>
                {t('graph2')}
                <RegistersByCategory {...user} />
              </div>

            </Card>
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