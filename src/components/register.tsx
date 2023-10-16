import { useState, useEffect } from 'react'
import RegistersTable from './registersTable'
import Form from './formRegister'
import {
  Modal, ModalContent, Button, Spacer, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow,
} from '@nextui-org/react'
import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from "next-i18next";
import { PlusIcon } from "./PlusIcon";


const apiLink = process.env.BACKEND_API

export default function Registers(props: any) {
  const { t } = useTranslation('common')

  const notify = (errorMessage: any) => toast.error(errorMessage);
  const notifySuccess = (errorMessage: any) => toast.success(errorMessage);

  const [data, setRegistros] = useState([])
  const [visible, setVisible] = React.useState(false);
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

  return (
    <div className='grid w-[100%] h-[100%] '>
      <Modal closeButton
        aria-labelledby="modal-title"
        isOpen={visible}
        onOpenChange={closeHandler}>

        <ModalContent>
          <Form onSubmit={handleSubmit} />
        </ModalContent>
      </Modal>

      {data[0] ?
        <div className='flex justify-items-center grid'>
          <div className="justify-self-end">
            <Button color="primary" onPress={handler} endContent={<PlusIcon />}>
              {t('registerTable.addValue')}
            </Button>
          </div>
          <div className='w-[100%] h-[100%] content-top'>
            <RegistersTable {...{ data }} />
          </div>
        </div> :

        <div className='flex grid grid-rows-4'>
          <Button className='absolute grid justify-end row-span-1' color='primary' onPress={handler}>
            {t('registerTable.addValue')}
          </Button>
          <Spacer x={1} />
          <div className='flex grid row-span-2'>
            <Table
              aria-label="Example table with static content"
            >
              <TableHeader>
                <TableColumn className="uppercase">{t('registerTable.name')}</TableColumn>
                <TableColumn className="uppercase">{t('registerTable.type')}</TableColumn>
                <TableColumn className="uppercase">{t('registerTable.category')}</TableColumn>
                <TableColumn className="uppercase">{t('registerTable.period')}</TableColumn>
                <TableColumn className="uppercase">{t('registerTable.value')}</TableColumn>
                <TableColumn className="uppercase">{t('registerTable.added')}</TableColumn>
                <TableColumn hidden >ID</TableColumn>
              </TableHeader>

              <TableBody emptyContent={"No registers found"}>
              </TableBody>
            </Table>
          </div>
        </div>
      }
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