import { useState } from 'react'
import Router, { useRouter } from 'next/router'
import { useUser } from '../lib/hooks'
import Layout from '../components/layout'
import Form from '../components/form'
import { Card, CardHeader, CardBody, CardFooter, Link, Image } from '@nextui-org/react'


const apiLink = process.env.BACKEND_API

const Login = () => {
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
    <div className='grid grid-cols-2 md:grid-cols-2 items-center w-full h-full rounded-sm shadow-lg'>
      <div className='flex justify-center'>
        <Image
          alt="Cocoa icons created by Vitaly Gorbachev - Flaticon"
          src="/cocoa.png"

        />
      </div>
      <div
        className="flex justify-center col-span-1 w-full h-full items-center bg-background">
        <div className='grid grid-rows-2 w-[80%] h-[50%]'>
          <div className='text-5xl text-foreground font-medium'>
            Bem vindo ao Segura Cacau
          </div>
          <div className='h-[100%]'>
            <Form isLogin errorMessage={errorMsg} onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
