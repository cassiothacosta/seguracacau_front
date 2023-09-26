import { useState, useEffect } from 'react'
import Router from 'next/router'
import RegistersTable from './registersTable'
import Form from './formRegister'
import { Modal, Button, Text, Table } from '@nextui-org/react'
import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const apiLink = process.env.BACKEND_API

const Registers = (props: any) => {
  
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

    const body = {
      username: props.username,
      name: e.currentTarget.name.value,
      type: e.currentTarget.type.lastElementChild.innerText,
      category: e.currentTarget.category.lastElementChild.innerText,
      period: e.currentTarget.period.lastElementChild.innerText,
      value: e.currentTarget.value.value,
    }
    try{
      await addRegisters({ body }).then((response: any) => {
        if(response.status == 200){
          setSuccessMsg('Sucesso ao adicionar o registro')
            Router.push('/')
        }else{
          throw new Error(response.text())
        }
      })
    }catch (error: any){
      console.error('An unexpected error happened occurred:', error)
      setErrorMsg(error.message)
    }
  }

  return (
    <>
      <Button auto shadow onPress={handler}>
        Adicionar Valor
      </Button>
      <Modal closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}>
        <Modal.Header>
          <Text id="modal-title" size={18}>Adicionar Registro</Text>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} />
        </Modal.Body>
      </Modal>

      {data[0] ? (
        <>
          <RegistersTable {...data} />
        </>
      ):
       <Table
        aria-label="Example table with static content"
        css={{
          height: "auto",
          minWidth: "100%",
          textDecorationColor: "#ffffff80"
        }}
      >
          <Table.Header>
          <Table.Column>NOME</Table.Column>
          <Table.Column>TIPO</Table.Column>
          <Table.Column>CATEGORIA</Table.Column>
          <Table.Column>PERIODICIDADE</Table.Column>
          <Table.Column>VALOR</Table.Column>
          <Table.Column {...{ "hidden": "{true}" }} >ID</Table.Column>
        </Table.Header>

        <Table.Body>
        <Table.Row key={1}>
          <Table.Cell key={1}>
            -
          </Table.Cell>
          <Table.Cell key={2}>
            -
          </Table.Cell>
          <Table.Cell key={3}>
            -
          </Table.Cell>
          <Table.Cell key={4}>
            -
          </Table.Cell>
          <Table.Cell key={5}>
            -
          </Table.Cell>
          <Table.Cell key={6}>
            {undefined}
          </Table.Cell>
        </Table.Row>
        </Table.Body>
      </Table>
      }
         <ToastContainer/>
      {errorMsg && <p hidden>{notify(errorMsg)}</p>}
      {successMessage && <p hidden>{notifySuccess(successMessage)}</p>}

    </>
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


export default Registers
