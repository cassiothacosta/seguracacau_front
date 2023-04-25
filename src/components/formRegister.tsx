import { Input, Modal, Button, Dropdown } from '@nextui-org/react'
import { Grid, Card, Text } from "@nextui-org/react";
import { NumberFormatBase } from 'react-number-format';
import React from 'react';




export default function formRegister({ errorMessage, onSubmit }: any) {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [selectedType, setSelectedType] = React.useState(new Set(["Selecione um tipo"]));

  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useMemo(
    () => Array.from(selectedType).join(", ").replaceAll("_", " "),
    [selectedType]
  );

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [selectedValue, setSelectedValue] = React.useState(new Set(["Selecione um Periodo"]));

  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useMemo(
    () => Array.from(selectedValue).join(", ").replaceAll("_", " "),
    [selectedValue]
  );


  return (

    <form onSubmit={onSubmit}>
      <Grid.Container gap={2} justify="flex-start">
        <Grid xs={10}>
          <Input
            aria-label='Nome'
            clearable
            bordered
            fullWidth
            color="primary"
            size="md"
            type="text"
            name="name"
            placeholder="Nome"
            required
          />
        </Grid>
        <Grid xs={10}>
          <Dropdown>
            <Dropdown.Button flat color="secondary" name="type" css={{ tt: "capitalize" }}>
              {selectedType}
            </Dropdown.Button>
            <Dropdown.Menu
              aria-label="Single selection actions"
              color="secondary"
              disallowEmptySelection={true}
              selectionMode="single"
              selectedKeys={selectedType}
              defaultSelectedKeys="Selecione um tipo"
              
              onSelectionChange={setSelectedType}
            >
              <Dropdown.Item key="fundo">
                Fundo
              </Dropdown.Item>
              <Dropdown.Item key="despesa">
                Despesa
              </Dropdown.Item>

            </Dropdown.Menu>
          </Dropdown>
        </Grid>
        <Grid xs={10}>
          <Input
            aria-label='Categoria'
            clearable
            bordered
            fullWidth
            color="primary"
            size="md"
            type="text" name="category" required
            placeholder="Categoria"

          />
        </Grid>
        <Grid xs={10}>
        <Dropdown>
            <Dropdown.Button flat color="secondary" name="period" css={{ tt: "capitalize" }}>
              {selectedValue}
            </Dropdown.Button>
            <Dropdown.Menu
              aria-label="Single selection actions"
              color="secondary"
              disallowEmptySelection={true}
              selectionMode="single"
              selectedKeys={selectedValue}
              onSelectionChange={setSelectedValue}
            >
              <Dropdown.Item key="Esporadico">
                Esporadico
              </Dropdown.Item>
              <Dropdown.Item key="Mensal">
                Mensal
              </Dropdown.Item>
              <Dropdown.Item key="Anual">
                Anual
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Grid>
        <Grid xs={10}>
          <Input
            aria-label='a'
            clearable
            bordered
            fullWidth
            color="primary"
            size="md"
            type="float" name="value" required
            placeholder="Valor"
          />
        </Grid>
      </Grid.Container>
      <Modal.Footer>
        <Button auto type="submit">
          Enviar
        </Button>
      </Modal.Footer>

    </form>
  )
}
