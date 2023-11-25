import { useState, useEffect } from 'react'
import RegistersTable from './registersTable'
import Form from './formRegister'
import {
  Modal, ModalContent, Button, Spacer, Table, TableBody, TableColumn, TableHeader, Card, user,
} from '@nextui-org/react'
import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from "next-i18next";
import RegistersByCategory from './registerByCategory'
import RegistersByType from './registerByType'
import moment from 'moment'


const apiLink = process.env.BACKEND_API

export default function Registers({user, handlePageTitle}: any) {
  const { t } = useTranslation('common')

  const notify = (errorMessage: any) => toast.error(errorMessage);
  const notifySuccess = (errorMessage: any) => toast.success(errorMessage);

  const [data, setRegistros] = useState([])
  const [visible, setVisible] = React.useState(false);

  const [changed, setChanged] = React.useState(false);
  const handler = () => setVisible(true);
  const [startDate, setStartDate] = React.useState(new Date());



  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  useEffect(() => {
    async function carregaRegistros() {
      const res = await fetch(apiLink + '/api/getRegisters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user.username, date: startDate }),
        credentials: 'include'
      })

      const registros = await res.json()
      setRegistros(registros.data)
    }
    handlePageTitle(t('registersPage'))
    carregaRegistros()
  }, [handlePageTitle, startDate, t, user.username])

  async function carregaRegistros() {
    const res = await fetch(apiLink + '/api/getRegisters', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: user.username, date: startDate }),
      credentials: 'include'
    })

    const registros = await res.json()
    setRegistros(registros.data)
  }

  const [errorMsg, setErrorMsg] = useState('')
  const [successMessage, setSuccessMsg] = useState('')


  async function handleSubmit(e: Event & {
    currentTarget: any
  }) {

    e.preventDefault()
    if (errorMsg) setErrorMsg('')
    if (successMessage) setSuccessMsg('')

    const body = {
      username: user.username,
      name: e.currentTarget.elements.name.value,
      type: e.currentTarget.elements.type.value,
      category: e.currentTarget.elements.category.value,
      period: e.currentTarget.elements.period.value,
      value: e.currentTarget.elements.value.value,
      registerDate: e.currentTarget.elements.registerDate.value
    }
    try {
      await addRegisters({ body }).then((response: any) => {
        if (response.status == 200) {
          setSuccessMsg(t('sucessMsg'))
          setTimeout(() => {
            notifySuccess(successMessage)
            carregaRegistros()
          }, 100)
          setChanged(true)
        } else {
          setErrorMsg(t('errorMsg') + response.text())
          notify(errorMsg)
          throw new Error(response.text())
        }
      })
    } catch (error: any) {
      console.error(t('unexError'), error)
      setErrorMsg(error.message)
    }
  }

  async function handleDeleteSubmit(e: Event & {
    currentTarget: any
  }) {

    e.preventDefault()
    if (errorMsg) setErrorMsg('')
    if (successMessage) setSuccessMsg('')

    let selectValues: any = []
    for (const item in e.currentTarget.selectedKeys.options) selectValues.push(e.currentTarget.selectedKeys.options[item].value)
    const body = {
      username: user.username,
      selectedKeys: selectValues,
      registersDate: moment(new Date(startDate).toISOString().split('T'), "YYYY/MM/DD").format('YYYY/MM/DD')
    }

    try {
      await removeRegisters({ body }).then((response: any) => {
        if (response.status == 200) {
          setSuccessMsg(t('sucessDeleteMsg'))
          setTimeout(() => {
            notifySuccess(successMessage)
            carregaRegistros()
            setChanged(true)
          }, 10);
        } else {
          setErrorMsg(t('errorDeleteMsg') + response.text())
          notify(errorMsg)
          throw new Error(response.text())
        }
      })
    } catch (error: any) {
      console.error(t('unexError'), error)
      setErrorMsg(error.message)
    }
  }


  return (
  <div className='grid lg:grid-cols-8 lg:gap-5 max-sm:gap-2 max-sm:pl-1 max-sm:pr-1'>
    <Card className='lg:col-span-6 lg:p-5 '>
      <div className='grid w-[100%] h-[100%] '>
        <Modal closeButton
          aria-labelledby="modal-title"
          isOpen={visible}
          onOpenChange={closeHandler}>

          <ModalContent>
            <Form onSubmit={handleSubmit} />
          </ModalContent>
        </Modal>

     
          <div className='lg:flex lg:justify-items-center lg:grid'>
            <div className='w-[100%] h-[100%] content-top'>
              <RegistersTable tableData={data} onSubmit={handleDeleteSubmit} onSubmitAdd={handleSubmit} username={user.username} startDate={startDate} setStartDate={setStartDate}/>
            </div>
          </div>
      </div>
    </Card>

    <Card className='lg:grid lg:col-span-2 pt-5 lg:justify-center'>
      <div className='text-center'>
        {t('graph1')}
        <RegistersByType username={user.username} changed={changed} setChanged={setChanged}  registersDate={startDate}/>
      </div>
      <div className='text-center'>
        {t('graph2')}
        <RegistersByCategory username={user.username} changed={changed} setChanged={setChanged} registersDate={startDate}/>
      </div>

    </Card>
  </div>
  )
}

export async function addRegisters({ body }: any) {
  try {
    const res = await fetch(apiLink + '/api/addRegister', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      credentials: 'include'
    })
    return res
  } catch (error: any) {
    console.error('An unexpected error happened occurred:', error)

  }
}

export async function removeRegisters({ body }: any) {
  try {
    const res = await fetch(apiLink + '/api/deleteRegister', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      credentials: 'include'
    })
    return res
  } catch (error: any) {
    console.error('An unexpected error happened occurred:', error)

  }
}


