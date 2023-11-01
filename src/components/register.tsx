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


const apiLink = process.env.BACKEND_API

export default function Registers(props: any) {
  const { t } = useTranslation('common')

  const notify = (errorMessage: any) => toast.error(errorMessage);
  const notifySuccess = (errorMessage: any) => toast.success(errorMessage);

  const [data, setRegistros] = useState([])
  const [visible, setVisible] = React.useState(false);

  const [changed, setChanged] = React.useState(false);
  const handler = () => setVisible(true);


  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  useEffect(() => {
    async function carregaRegistros() {
      const res = await fetch(apiLink + '/api/getRegisters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: props.username }),
        credentials: 'include'
      })

      const registros = await res.json()
      setRegistros(registros.data)
    }

    carregaRegistros()
  }, [props.username])

  async function carregaRegistros() {
    const res = await fetch(apiLink + '/api/getRegisters', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: props.username }),
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

    console.log(e.currentTarget)
    const body = {
      username: props.username,
      name: e.currentTarget.elements.name.value,
      type: e.currentTarget.elements.type.value,
      category: e.currentTarget.elements.category.value,
      period: e.currentTarget.elements.period.value,
      value: e.currentTarget.elements.value.value,
    }
    try {
      await addRegisters({ body }).then((response: any) => {
        if (response.status == 200) {
          setSuccessMsg(t('registerTable.sucessMsg'))
          setTimeout(() => {
            notifySuccess(successMessage)
          }, 100)
          carregaRegistros()
          setChanged(true)
        } else {
          setErrorMsg(t('registerTable.errorMsg') + response.text())
          notify(errorMsg)
          throw new Error(response.text())
        }
      })
    } catch (error: any) {
      console.error(t('registerTable.unexError'), error)
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
      username: props.username,
      selectedKeys: selectValues
    }

    try {
      await removeRegisters({ body }).then((response: any) => {
        if (response.status == 200) {
          setSuccessMsg(t('registerTable.sucessDeleteMsg'))
          setTimeout(() => {
            notifySuccess(successMessage)
            carregaRegistros()
            setChanged(true)
          }, 10);
        } else {
          setErrorMsg(t('registerTable.errorDeleteMsg') + response.text())
          notify(errorMsg)
          throw new Error(response.text())
        }
      })
    } catch (error: any) {
      console.error(t('registerTable.unexError'), error)
      setErrorMsg(error.message)
    }
  }


  return (
  <div className='grid grid-cols-8 gap-5'>
    <Card className='col-span-6 p-5' >
      <div className='grid w-[100%] h-[100%] '>
        <Modal closeButton
          aria-labelledby="modal-title"
          isOpen={visible}
          onOpenChange={closeHandler}>

          <ModalContent>
            <Form onSubmit={handleSubmit} />
          </ModalContent>
        </Modal>

     
          <div className='flex justify-items-center grid'>
            <div className='w-[100%] h-[100%] content-top'>
              <RegistersTable tableData={data} onSubmit={handleDeleteSubmit} onSubmitAdd={handleSubmit}/>
            </div>
          </div>
      </div>
    </Card>

    <Card className='grid col-span-2 pt-5'>
      <div className='text-center'>
        {t('graph1')}
        <RegistersByType username={props.username} changed={changed} setChanged={setChanged}/>
      </div>
      <div className='text-center'>
        {t('graph2')}
        <RegistersByCategory username={props.username} changed={changed} setChanged={setChanged}/>
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


