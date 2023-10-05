import { useUser } from '../lib/hooks'
import Layout from '../components/layout'
import { Card, Spacer } from '@nextui-org/react';
import Registers from '../components/register'
import RegistersByType from '../components/registerByType';
import RegistersByCategory from '../components/registerByCategory'
import Login from './login';
import UserPainel from '@/components/userPainel';

export default function Home() {

  const user = useUser()

  return (
    <Layout >
      {user ? (
        <div className='grid grid-cols-5 gap-5 w-[90%] h-[90%]'>
          <div className='grid col-span-1'>
            <UserPainel {...user}/>
          </div>
          <Card className='flex justify-center grid col-span-3'>
            <Registers {...user} />
          </Card>

          <div className='grid col-span-1'>
            <Card className='grid p-10'>
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
        </div>
      ) :

        <Login />

      }
    </Layout>

  )
}