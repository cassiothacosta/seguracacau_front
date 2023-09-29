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
    <Card>
      {asPath == "/" ?
        <Card isBlurred
          className=""
          shadow="md">
          <CardBody className=' text-white font-bold rounded-lg border shadow-lg p-4'>
            <div className='grid grid-cols-2 md:grid-cols-2 gap-1 md:gap-20 items-center justify-center'>
              <div className='flex col-span-1 md:col-span-1'>
                <Image
                  alt="Cocoa icons created by Vitaly Gorbachev - Flaticon"
                  src="/cocoa.png"
                  className="p-10"
                  width="100%"
                />

              </div>
              <div className="flex justify-center col-span-1">
                <Form isLogin errorMessage={errorMsg} onSubmit={handleSubmit} />
              </div>
            </div>

          </CardBody >
        </Card>
        :
        <Layout>
          <div className="login">
            <Form isLogin errorMessage={errorMsg} onSubmit={handleSubmit} />
          </div>
        </Layout>
      }
    </Card>
  )
}

export default Login
