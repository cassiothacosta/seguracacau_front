import { useUser } from '../lib/hooks'
import Layout from '../components/layout'
import Form from '../components/formRegister'
import Table from '../components/registersTable'
import { useState } from 'react'
import Router from 'next/router'

const apiLink = process.env.BACKEND_API
  
export default function Home() {
  const user = useUser()
  var tableData = null

  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: Event & {
    currentTarget: any
  }) {
   
    e.preventDefault()
    if (errorMsg) setErrorMsg('')

    const body = {
      username: user.username,
      name: e.currentTarget.name.value,
      type: e.currentTarget.type.value,
      category:e.currentTarget.category.value,
      period:e.currentTarget.period.value,
      value:e.currentTarget.value.value,
    }

    try {
      const res = await fetch(apiLink + '/api/addRegister', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(body),
        credentials: 'include'
      })
      if (res.status === 200) {
        Router.push('/')
      } else {
        throw new Error(await res.text())
      }
    } catch (error: any) {
      console.error('An unexpected error happened occurred:', error)
      setErrorMsg(error.message)
    }
  }

  async function getRegisters(e: Event & {
    currentTarget: any}
    ) {

      e.preventDefault()
      if (errorMsg) setErrorMsg('')

      const body = {
      username: user.username
    }

    try {
      const res = await fetch(apiLink + '/api/getRegisters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(body),
        credentials: 'include'
      })
      if (res.status === 200) {

      } else {
        throw new Error(await res.text())
      }
    } catch (error: any) {
      console.error('An unexpected error happened occurred:', error)
      setErrorMsg(error.message)
    }
  }


  return (
      <Layout>
        <h1>Passport.js Example</h1>

        <p>Steps to test the example:</p>

        <ol>
          <li>Click Login and enter a username and password.</li>
          <li>
            You`&apos;`ll be redirected to Home. Click on Profile, notice how your
            session is being used through a token stored in a cookie.
          </li>
          <li>
            Click Logout and try to go to Profile again. You`&apos;`ll get redirected to
            Login.
          </li>
        </ol>

        {user && (
          <>
            <p >Currently logged in as:</p>
            <pre>{JSON.stringify(user, null, 2)}</pre>

            <div>
              <Form errorMessage={errorMsg} onSubmit={handleSubmit}/>
              
            </div>
            <div className='tableRegisters'></div>
             
 
          </>

        )}

        <style jsx>{`
          li {
            margin-bottom: 0.5rem;
          }
          pre {
            white-space: pre-wrap;
            word-wrap: break-word;
          }
        `}</style>
      </Layout>
    )
  }
