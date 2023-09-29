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
    <Card className="max-w-[80%]" >
      {asPath == "/" ?
        <Card >
          <CardBody >
            <div>
              <Image
                alt="Cocoa icons created by Vitaly Gorbachev - Flaticon"
                src="/cocoa.png"
              />
              <a href="https://www.flaticon.com/free-icons/cocoa" title="cocoa icons">
                Cocoa icons created by Vitaly Gorbachev - Flaticon
              </a>

            </div>
            <div className="login">
              <Form isLogin errorMessage={errorMsg} onSubmit={handleSubmit} />
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
