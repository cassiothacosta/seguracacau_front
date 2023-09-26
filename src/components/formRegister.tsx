/* eslint-disable react-hooks/rules-of-hooks */
import { Input, Modal, Button, Dropdown } from '@nextui-org/react'
import { Grid, Card, Text } from "@nextui-org/react";
import { NumericFormat } from 'react-number-format';
import React, {useState} from 'react';
import { toast } from 'react-toastify';




export default function formRegister({ onSubmit }: any) {

  const [selectedType, setSelectedType] = useState(new Set(["despesa"]));

  React.useMemo(
    () => Array.from(selectedType).join(", ").replaceAll("_", " "),
    [selectedType]
  );

  const [selectedValue, setSelectedValue] = React.useState(new Set(["esporadico"]));

  React.useMemo(
    () => Array.from(selectedValue).join(", ").replaceAll("_", " "),
    [selectedValue]
  );

  const [selectedCategory, setSelectedCategory] = React.useState(new Set(["casa"]));


  React.useMemo(
    () => Array.from(selectedCategory).join(", ").replaceAll("_", " "),
    [selectedCategory]
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
        <Grid css={{
          paddingBottom: "1px"
        }} sm={10}><Text>Selecione um tipo</Text></Grid>
        <Grid css={{
          paddingTop: "1px"
        }} xs={10}>

          <Dropdown>
            <Dropdown.Button flat color="secondary" name="type" css={{ tt: "capitalize" }}>
              {selectedType}
            </Dropdown.Button>

            <Dropdown.Menu
              aria-label="Single selection example"
              color="secondary"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selectedType}
              onSelectionChange={setSelectedType as any}
            >
              <Dropdown.Item key="despesa">
                Despesa
              </Dropdown.Item>
              <Dropdown.Item key="fundo">
                Fundo
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Grid>
        <Grid css={{
          paddingBottom: "1px"
        }} sm={10}><Text>Selecione uma categoria</Text></Grid>
        <Grid css={{
          paddingTop: "1px"
        }} xs={10}>
          <Dropdown>
            <Dropdown.Button flat color="secondary" name="category" css={{ tt: "capitalize" }}>
              {selectedCategory}
            </Dropdown.Button>
            <Dropdown.Menu
              aria-label="Single selection actions"
              color="secondary"
              disallowEmptySelection={true}
              selectionMode="single"
              selectedKeys={selectedCategory}
              onSelectionChange={setSelectedCategory as any}
            >
              <Dropdown.Item key="casa">
                Casa
              </Dropdown.Item>
              <Dropdown.Item key="compras">
                Compras
              </Dropdown.Item>
              <Dropdown.Item key="telefone">
                Telefone
              </Dropdown.Item>
              <Dropdown.Item key="ferias">
                Férias
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Grid>
        <Grid css={{
          paddingBottom: "1px"
        }} sm={10}><Text>Selecione um Período</Text></Grid>
        <Grid css={{
          paddingTop: "1px"
        }} xs={10}>
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
              onSelectionChange={setSelectedValue as any}
            >
              <Dropdown.Item key="esporadico">
                Esporadico
              </Dropdown.Item>
              <Dropdown.Item key="mensal">
                Mensal
              </Dropdown.Item>
              <Dropdown.Item key="anual">
                Anual
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Grid>
        <Grid xs={10}>
          <Input
            aria-label='Valor'
            clearable
            bordered
            fullWidth
            color="primary"
            size="md"
            type="number" name="value" required
            placeholder="Valor"
            labelLeft="R$"
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
