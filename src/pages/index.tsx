import { useUser } from '../lib/hooks'
import Layout from '../components/layout'
import { Card, Spacer } from '@nextui-org/react';
import Registers from '../components/register'
import RegistersByType from '../components/registerByType';
import RegistersByCategory from '../components/registerByCategory'
import Login from './login';
import Header from '@/components/header';

export default function Home() {

  const user = useUser()

  return (
    <Layout >
      {user ? (
        <div>
          <Card>
            <Registers {...user} />
          </Card>
          <Spacer y={1} />
          <Card>
            <div>
              Grafico Despesas/Receitas
              <RegistersByType {...user} />
            </div>
            <div>
              Grafico Despesas por Categorias
              <RegistersByCategory {...user} />
            </div>

          </Card>
        </div>
      ) :
        
          <Login />
       
      }
    </Layout>

  )
}