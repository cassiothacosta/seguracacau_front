import { useUser } from '../lib/hooks'
import Layout from '../components/layout'
import { Avatar, Card, Link, Listbox, ListboxItem } from '@nextui-org/react';
import Registers from '../components/register'
import Login from './login';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticProps } from 'next';
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react';
import ReportsPanel from '@/components/reportsPanel';

const apiLink = process.env.BACKEND_API

export default function Home(props: any) {
  const { t } = useTranslation('common')
  const user = useUser()
  const [errorMsg, setErrorMsg] = useState('')
  const [visibleRegisters, setVisibleRegisters] = useState(true)
  const [visibleReports, setVisibleReports] = useState(false)
  const [pageTitle, setPageTitle] = useState<String>("")

  useEffect(() => {
    setPageTitle(t('startPage'))
  }, [t])

  const handleOpenReports = () => {
    setVisibleRegisters(false);
    setVisibleReports(true)
  };

  const handleOpenRegisters = () => {
    setVisibleRegisters(true);
    setVisibleReports(false)
  };

const handlePageTitle = (newTitle: String) => {
  setPageTitle(newTitle)
}
  
  return (
    <Layout>
      <title>{pageTitle}</title>
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
                <ListboxItem classNames={{title: "text-md"}} key="registers" color="default" onPress={handleOpenRegisters}>
                  {t('showTable')}
                </ListboxItem>
                <ListboxItem classNames={{title: "text-md"}} key="reports"  color="default" onPress={handleOpenReports}>
                  {t('genReport')}
                </ListboxItem>
                <ListboxItem classNames={{title: "text-md"}} key="delete" className="text-danger" color="danger">
                  <Link color="danger" href={apiLink + "/api/logout"}>
                    {t('logout')}
                  </Link>
                </ListboxItem>
              </Listbox>
            </Card>
          </div>
          <div className='grid col-span-10'>
            {visibleRegisters &&
                <Registers user={user} handlePageTitle={handlePageTitle}/>
            }
            {
              visibleReports &&
                <ReportsPanel user={user} handlePageTitle={handlePageTitle}/>
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