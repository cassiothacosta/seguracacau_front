import { useState, useEffect } from 'react'
import Router from 'next/router'
import RegistersTable from './registersTable'
import Form from './formRegister'
import { Modal, Button, Text } from '@nextui-org/react'
import React from 'react'


const apiLink = process.env.BACKEND_API

const Registers = (props: any) => {
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

  async function handleSubmit(e: Event & {
    currentTarget: any
  }) {

    e.preventDefault()
    if (errorMsg) setErrorMsg('')
    console.log( e.currentTarget.type)
    const body = {
      username: props.username,
      name: e.currentTarget.name.value,
      type: e.currentTarget.type.lastElementChild.innerText,
      category: e.currentTarget.category.value,
      period: e.currentTarget.period.lastElementChild.innerText,
      value: e.currentTarget.value.value,
    }

    await addRegisters({ body }).then((response: any) => {
    })

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
          <Form errorMessage={errorMsg} onSubmit={handleSubmit} />
        </Modal.Body>
      </Modal>

      {data[0] && (
        <>
          <RegistersTable {...data} />
        </>
      )}

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
    if (res.status === 200) {

      Router.push('/')
    } else {
      throw new Error(await res.text())
    }
  } catch (error: any) {
    console.error('An unexpected error happened occurred:', error)

  }
  
}


export default Registers
