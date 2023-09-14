import Link from 'next/link'
import {
  Card,
  Spacer,
  Button,
  Text,
  Input,
  Row,
  Container,
} from '@nextui-org/react';


const Form = ({ isLogin, errorMessage, onSubmit }: any) => (
  <form onSubmit={onSubmit}>
    <Container
      display="flex"
      alignItems="center"
      justify="center"
      css={{ minHeight: '100vh' }}
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
          Entrar
        </Text>

        <Input placeholder="Usuário" type="text" name="username" required />
        <Spacer y={1} />
        <Input placeholder="Senha" type="password" name="password" required />
        <Spacer y={1} />
        {!isLogin && (


          <Input placeholder="Repetir Senha" type="password" name="rpassword" required />

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
              <Button type="submit">Entrar</Button>
            </>
          ) : (
            <>
              <Row>
                <Link href="/login" legacyBehavior>
                  <a>Já tenho uma conta</a>
                </Link>
              </Row>
              <Spacer y={1} />
              <Button type="submit">Cadastrar</Button>
            </>
          )}
        </div>
      </Card>


      {errorMessage && <p className="error">{errorMessage}</p>}
    </Container>


  </form>
)

export default Form
