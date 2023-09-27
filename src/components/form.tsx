import Link from 'next/link'
import {
  Card,
  Spacer,
  Button,
  Text,
  Input,
  Row,
  Container,
  Modal,
} from '@nextui-org/react';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const notify = (errorMessage: any) => toast.error(errorMessage);
const notifySuccess = (errorMessage: any) => toast.success(errorMessage);
const Form = ({ isLogin, errorMessage, successMessage, onSubmit }: any) => (
  
  <form onSubmit={onSubmit}>
    <Container
      display="flex"
      alignItems="center"
      justify="center"
      css={{ minHeight: '90vh' }}
    >
      <Card css={{ mw: '420px', p: '20px' }}>
        <Text
          size={24}
          weight="bold"
          css={{
            as: 'center',
            mb: '20px',
          }}
        >
          {isLogin ? "Entrar" : "Cadastrar"}
        </Text>

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
              <Row>
                <Link href="/signup" legacyBehavior>
                  <a>Não tenho uma conta</a>
                </Link>
              </Row>
              <Spacer y={1} />
              <Button type="submit">Enviar</Button>
            </>
          ) : (
            <>
              <Row>
                <Link href="/login" legacyBehavior>
                  <a>Já tenho uma conta</a>
                </Link>
              </Row>
              <Spacer y={1} />
              <Button type="submit">Enviar</Button>
            </>
          )}
        </div>
      </Card>

      <ToastContainer />
   
      </Container>   {errorMessage && <p hidden>{notify(errorMessage)}</p>}
      {successMessage && <p hidden>{notifySuccess(successMessage)}</p>}


  </form>
)

export default Form
