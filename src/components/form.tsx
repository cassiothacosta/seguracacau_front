import Link from 'next/link'
import {
  Card,
  Spacer,
  Button,
  Input,
  Modal,
  CardBody,
} from '@nextui-org/react';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notify = (errorMessage: any) => toast.error(errorMessage);
const notifySuccess = (errorMessage: any) => toast.success(errorMessage);
export default function Form ({ isLogin, errorMessage, successMessage, onSubmit }: any) {
  return (

    <form onSubmit={onSubmit}>
 
        <Card className="">
          <CardBody>

          {isLogin ? "Entrar" : "Cadastrar"}


          <Input placeholder="Usuário" aria-label="username" type="text" name="username" required />
          <Spacer y={1} />
          <Input placeholder="Senha" aria-label="password" type="password" name="password" required />
          <Spacer y={1} />
          {!isLogin && (


            <Input placeholder="Repetir Senha" aria-label="rpassword" type="password" name="rpassword" required />

          )}
          <Spacer y={1} />
          <div className="submit">
            {isLogin ? (
              <>
                <div>
                  <Link href="/signup" legacyBehavior>
                    <a>Não tenho uma conta</a>
                  </Link>
                </div>
                <Spacer y={1} />
                <Button type="submit">Enviar</Button>
              </>
            ) : (
              <>
                <div>
                  <Link href="/login" legacyBehavior>
                    <a>Já tenho uma conta</a>
                  </Link>
                </div>
                <Spacer y={1} />
                <Button type="submit">Enviar</Button>
              </>
            )}
          </div>
          </CardBody>
        </Card>

        <ToastContainer />

        {errorMessage && <p hidden>{notify(errorMessage)}</p>}
      {successMessage && <p hidden>{notifySuccess(successMessage)}</p>}


    </form>
  )

}