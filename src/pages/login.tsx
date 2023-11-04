import { useState } from 'react'
import Router, { useRouter } from 'next/router'
import { useUser } from '../lib/hooks'
import Layout from '../components/layout'
import Form from '../components/form'
import { Image } from '@nextui-org/react'
import { useTranslation } from 'react-i18next'

const apiLink = process.env.BACKEND_API

const Login = () => {
  const { t } = useTranslation('common')
  const { asPath } = useRouter()

  useUser({ redirectTo: '/', redirectIfFound: true })
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: Event & {
    currentTarget: any
  }) {

    e.preventDefault()
    if (errorMsg) setErrorMsg('')

    const body = {
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
    }

    try {
      const res = await fetch(apiLink + '/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include'
      })
      if (res.status === 200) {
        Router.push('/').then(() => {
          asPath == '/' && Router.reload()
        })

      } else {
        throw new Error(await res.text())
      }
    } catch (error: any) {
      console.error('An unexpected error happened occurred:', error)
      setErrorMsg(error.message)
    }
  }

  return (
    <div className='grid md:grid-cols-2 items-center w-full h-full '>
      <div className='flex justify-center max-sm:hidden'>
        <Image
          alt="Cocoa icons created by Vitaly Gorbachev - Flaticon"
          src="/cocoa.png"

        />
      </div>
      <div
        className="flex lg:justify-center lg:col-span-1 lg:w-full lg:h-full items-center bg-background max-sm:h-[70%] max-sm:w-[98%] max-sm:rounded-lg max-sm:place-self-center">
        <div className='grid grid-rows-3 w-[80%] h-[60%]'>
          <div className='text-5xl row-span-1 text-foreground font-medium max-sm:text-center' suppressHydrationWarning >
              {t('welcome')}
          </div>
          <div className='flex row-span-2 max-sm:p-2'>
            <Form isLogin errorMessage={errorMsg} onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
