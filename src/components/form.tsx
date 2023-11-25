
import {
  Spacer,
  Button,
  Input  
} from '@nextui-org/react';

import Link from 'next/link'
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'next-i18next'

const notify = (errorMessage: any) => toast.error(errorMessage);
const notifySuccess = (errorMessage: any) => toast.success(errorMessage);
export default function Form({ isLogin, errorMessage, successMessage, onSubmit }: any) {

  const { t } = useTranslation('common')

  return (

    <form onSubmit={onSubmit}>
      <div className='bg-background lg:p-10 lg:pt-5 rounded-xl'>
        <div className="grid gap-8 flex w-96">

          <div className='text-center font-bold text-foreground'>{isLogin ? t('login') : t('signin')}</div>

          <Input label={t('user')} aria-label="username" type="text" name="username" isRequired />

          <Input label={t('password')} aria-label="password" type="password" name="password" isRequired />

          {!isLogin && (
            <Input label={t('rpassword')} aria-label="rpassword" type="password" name="rpassword" isRequired />
          )}

          <div className="submit">
            {isLogin ? (
              <>
                <div className='text-right font-bold'>
                  <Link href="/signup" >
                    <button type="button" className='text-blue-500'>{t('naccount')}</button>
                  </Link>
                </div>
                <Button color="primary" type="submit">{t('login')}</Button>
              </>
            ) : (
              <>
                <div className='text-right font-bold'>
                  <Link href="/" >
                    <button type="button" className='text-blue-500'>{t('saccount')}</button>
                  </Link>
                </div>
                <Spacer y={1} />
                <Button  color="primary" type="submit">{t('signin')}</Button>
              </>
            )}
          </div>
        </div>
      </div>

      <ToastContainer />

      {errorMessage && <p hidden>{notify(errorMessage)}</p>}
      {successMessage && <p hidden>{notifySuccess(successMessage)}</p>}


    </form>
  )

}