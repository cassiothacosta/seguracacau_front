import { useUser } from '../lib/hooks'
import Layout from '../components/layout'
import { Avatar, Button, Card, Link, Listbox, ListboxItem } from '@nextui-org/react';
import Registers from '../components/register'
import Login from './login';
import UserPainel from '@/components/userPainel';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticProps } from 'next';
import { useTranslation } from 'react-i18next'
import { useState } from 'react';
import ReportsPainel from '@/components/reportsPainel';

const apiLink = process.env.BACKEND_API

export default function Home() {
  const { t } = useTranslation('common')
  const user = useUser()
  const [errorMsg, setErrorMsg] = useState('')
  const [visibleRegisters, setVisibleRegisters] = useState(true)
  const [visibleReports, setVisibleReports] = useState(false)

  const handleOpenReports = () => {
    setVisibleRegisters(false);
    setVisibleReports(true)
  };

  const handleOpenRegisters = () => {
    setVisibleRegisters(true);
    setVisibleReports(false)
  };

  return (
    <Layout >
      {user ? (
        <div className='grid grid-cols-12 gap-5 w-[90%] h-[90%]'>
          <div className='grid col-span-2'>
            <Card className="flex gap-4 items-start p-10">
              <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" className="w-20 h-20 text-large" />
              <Listbox
                aria-label="Listbox Variants"
                color='default'
                variant='light'
              >
                <ListboxItem key="reports" color="default" onPress={handleOpenReports}>
                  Gerar Relatórios
                </ListboxItem>
                <ListboxItem key="registers" color="default" onPress={handleOpenRegisters}>
                  Mostrar Tabela
                </ListboxItem>
                <ListboxItem key="delete" className="text-danger" color="danger">
                  <Link color="danger" href={apiLink + "/api/logout"}>
                    {t('logout')}
                  </Link>
                </ListboxItem>
              </Listbox>
            </Card>
          </div>
          <div className='grid col-span-10'>
            {visibleRegisters && 
              <Registers {...user} />
            }
            {
              visibleReports &&
              <ReportsPainel {...user}/>
            }
            
          </div>
        </div>
      ) :

        <Login />

      }
    </Layout>

  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as any, [
      'common'
    ])),
    // Will be passed to the page component as props
  },
})