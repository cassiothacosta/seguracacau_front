import { useEffect, useState } from 'react'
import Router from 'next/router'
import { useUser } from '../lib/hooks'
import Layout from '../components/layout'
import Form from '../components/form'
import {  toast } from 'react-toastify';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next'


const apiLink = process.env.BACKEND_API
const notify = (errorMessage: any) => toast.error(errorMessage);
const Signup = () => {
  useUser({ redirectTo: '/', redirectIfFound: true })
  
  const { t } = useTranslation('common')
  const [errorMsg, setErrorMsg] = useState('')
  const [successMessage, setSuccessMsg] = useState('')
  const [pageTitle, setPageTitle] = useState<String>('')

  useEffect(() =>{
    setPageTitle(t('signupPage'))
  },[t])

  async function handleSubmit(e: any) {
    e.preventDefault()

    if (errorMsg) setErrorMsg('')

    const body = {
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
    }

    if (body.password !== e.currentTarget.rpassword.value) {
      setErrorMsg(`The passwords don't match`)
      return
    }

    try {
      const res = await fetch(apiLink + '/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': apiLink as string},
        body: JSON.stringify(body),
      })
      if (res.status === 200) {
        setSuccessMsg('Sucesso ao criar o usuário!')
        setTimeout(() => {
          Router.push('/')
        }, 3000);
        
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
      <title>{pageTitle}</title>
      <div className="login">
        <Form isLogin={false} errorMessage={errorMsg} successMessage={successMessage} onSubmit={handleSubmit} />
      </div>
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

export default Signup
