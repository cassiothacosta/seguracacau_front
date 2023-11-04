import { useUser } from '../lib/hooks'
import Layout from '../components/layout'
import { Avatar, Card, Link, Listbox, ListboxItem, Spacer } from '@nextui-org/react';
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
        <div className='lg:grid lg:grid-cols-12 max-sm:grid-cols-1 lg:gap-5 lg:w-[90%] lg:h-[90%]'>
          <div className='lg:grid lg:col-span-2 max-sm:pl-1 max-sm:pr-1 max-sm:pb-2'>
            <Card className="lg:flex gap-4 items-start p-10">
              <div className='self-center'>
              <Avatar src="/cocoa.png" className="w-[125px] h-[125px] text-large bg-green-400" />
              <Spacer className='pt-3'/>
              <div className='font-semibold '>{t('welcome2')+ ", " + user.username + "!"}</div>
              </div>
              <Listbox 
                aria-label="Listbox Variants"
                color='default'
                variant='light'
              >
                <ListboxItem classNames={{title: "text-md"}} textValue={t('showTable')} key="registers" color="default" onPress={handleOpenRegisters}>
                  {t('showTable')}
                </ListboxItem>
                <ListboxItem classNames={{title: "text-md"}} textValue={t('genReport')} key="reports"  color="default" onPress={handleOpenReports}>
                  {t('genReport')}
                </ListboxItem>
                <ListboxItem classNames={{title: "text-md"}} textValue={t('genReport')} key="delete" className="text-danger" color="danger">
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
              <div className='max-sm:pl-1 max-sm:pr-1'>
                <ReportsPanel user={user} handlePageTitle={handlePageTitle}/>
              </div>
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