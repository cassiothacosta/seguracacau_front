import { useUser } from '../lib/hooks'
import Layout from '../components/layout'
import { Avatar, Card, Link, Listbox, ListboxItem, Spacer } from '@nextui-org/react';
import Registers from '../components/register'
import Login from './login';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticProps } from 'next';
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react';
import YearlyReport from '@/components/yearlyReport';
import CategoriesPanel from '@/components/categoriesPanel';
import CategoryEvolutionReport from '@/components/categoryEvolutionReport';

const apiLink = process.env.BACKEND_API

export default function Home(props: any) {
  const { t } = useTranslation('common')
  const user = useUser()
  const [visibleRegisters, setVisibleRegisters] = useState(true)
  const [visibleYearlyReport, setVisibleReports] = useState(false)
  const [visibleEvolutionReport, setVisibleEvolutionReport] = useState(false)
  const [visibleCategories, setVisibleCategories] = useState(false)
  const [pageTitle, setPageTitle] = useState<String>("")

  useEffect(() => {
    setPageTitle(t('startPage'))
  }, [t])

  const handleOpenReports = () => {
    setVisibleRegisters(false);
    setVisibleReports(true)
    setVisibleCategories(false);
    setVisibleEvolutionReport(false);
  };

  const handleOpenRegisters = () => {
    setVisibleRegisters(true);
    setVisibleReports(false)
    setVisibleCategories(false);
    setVisibleEvolutionReport(false);
  };

  const handleOpenCategories = () => {
    setVisibleCategories(true);
    setVisibleRegisters(false);
    setVisibleReports(false);
    setVisibleEvolutionReport(false);
  }

  const handleOpenEvolution = () => {
    setVisibleCategories(false);
    setVisibleRegisters(false);
    setVisibleReports(false)
    setVisibleEvolutionReport(true);
  }

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
                <Spacer className='pt-3' />
                <div className='font-semibold '>{t('welcome2') + ", " + user.username + "!"}</div>
              </div>
              <Listbox
                aria-label="Listbox Variants"
                color='default'
                variant='light'
              >
                <ListboxItem classNames={{ title: "text-md" }} textValue={t('showTable')} key="registers" color="default" onPress={handleOpenRegisters}>
                  {t('showTable')}
                </ListboxItem>
                <ListboxItem classNames={{ title: "text-md" }} textValue={t('genReport')} key="categories" color="default" onPress={handleOpenCategories}>
                  {t('showCategories')}
                </ListboxItem>
                <ListboxItem classNames={{ title: "text-md" }} textValue={t('genReport')} key="reports" color="default" onPress={handleOpenReports}>
                  {t('genReport')}
                </ListboxItem>
                <ListboxItem classNames={{ title: "text-md" }} textValue={t('genEvolReport')} key="Evolreport" color="default" onPress={handleOpenEvolution}>
                  {t('genEvolReport')}
                </ListboxItem>
                
                <ListboxItem classNames={{ title: "text-md" }} textValue={t('genReport')} key="delete" className="text-danger" color="danger">
                  <Link color="danger" href={apiLink + "/api/logout"}>
                    {t('logout')}
                  </Link>
                </ListboxItem>
              </Listbox>
            </Card>
          </div>
          <div className='grid col-span-10 max-sm:pr-1 max-sm:pl-1' >
            {visibleRegisters &&
              <Registers user={user} handlePageTitle={handlePageTitle} />
            }
            {
              visibleYearlyReport &&
              <div className='max-sm:pl-1 max-sm:pr-1'>
                <YearlyReport user={user} handlePageTitle={handlePageTitle} />
              </div>
            }
            {
              visibleCategories &&
              <Card className='p-5'>
                <CategoriesPanel user={user} handlePageTitle={handlePageTitle} />
              </Card>
            }
            {
              visibleEvolutionReport &&
              <Card className='p-5'>
                <CategoryEvolutionReport user={user} handlePageTitle={handlePageTitle} />
              </Card>
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