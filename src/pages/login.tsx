import { useState } from 'react'
import Router, { useRouter } from 'next/router'
import { useUser } from '../lib/hooks'
import Layout from '../components/layout'
import Form from '../components/form'
import { Col, Row, Image, Text, Container } from '@nextui-org/react'


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
        Router.push('/').then(()=>{
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
    <Container gap={0} >
      {asPath == "/" ?
        <Row gap={0}>
          <Col >
          <Image
            alt="Cocoa icons created by Vitaly Gorbachev - Flaticon"
            src="/cocoa.png"
            
          />
          <a href="https://www.flaticon.com/free-icons/cocoa" title="cocoa icons">
            <Text css={{textAlign: "center"}} >Cocoa icons created by Vitaly Gorbachev - Flaticon</Text>
          </a>
          </Col>
          <Col> 
            <div className="login">
              <Form isLogin errorMessage={errorMsg} onSubmit={handleSubmit} />
            </div>
          </Col>
        </Row>
        :
        <Layout>
          <div className="login">
            <Form isLogin errorMessage={errorMsg} onSubmit={handleSubmit} />
          </div>
        </Layout>
      }
    </Container>
  )
}

export default Login
