
import {
  Card,
  Spacer,
  Button,
  Input,
  CardBody,
  Link
} from '@nextui-org/react';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notify = (errorMessage: any) => toast.error(errorMessage);
const notifySuccess = (errorMessage: any) => toast.success(errorMessage);
export default function Form({ isLogin, errorMessage, successMessage, onSubmit }: any) {
  return (

    <form onSubmit={onSubmit}>
      <div className='bg-background p-10 pt-5 rounded-xl'>
        <div className="grid gap-8 flex w-96">

          <div className='text-center font-bold text-foreground'>{isLogin ? "Entrar" : "Cadastrar"}</div>

          <Input placeholder="Usuário" aria-label="username" type="text" name="username" required />

          <Input placeholder="Senha" aria-label="password" type="password" name="password" required />

          {!isLogin && (
            <Input placeholder="Repetir Senha" aria-label="rpassword" type="password" name="rpassword" required />
          )}

          <div className="submit">
            {isLogin ? (
              <>
                <div className='text-right font-bold'>
                  <Link href="/signup" >
                    Não tenho uma conta
                  </Link>
                </div>
                <Button color="primary" type="submit">Enviar</Button>
              </>
            ) : (
              <>
                <div className='text-right font-bold'>
                  <Link href="/" >
                    Já tenho uma conta
                  </Link>
                </div>
                <Spacer y={1} />
                <Button type="submit">Enviar</Button>
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