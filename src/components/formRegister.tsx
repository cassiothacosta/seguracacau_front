/* eslint-disable react-hooks/rules-of-hooks */
import { Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, ModalFooter, Select, SelectItem, ModalHeader } from '@nextui-org/react'
import React, { useState } from 'react';
import { toast } from 'react-toastify';




export default function FormRegister({ onSubmit }: any) {

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
    <form onSubmit={onSubmit} className='grid gap-4 pl-5 pr-5'>
      <ModalHeader>
        Adicionar Registro
      </ModalHeader>
      <Input
        isRequired
        aria-label='Nome'
        label="Escreva o nome"
        isClearable
        variant='bordered'
        fullWidth
        color="primary"
        size="md"
        type="text"
        name="name"
        placeholder="Nome"
        labelPlacement="outside"
      />

      <Select
        isRequired
        label="Escolha o tipo"
        placeholder="Despesa"
        defaultSelectedKeys={["despesa"]}
        className="max-w-xs"
        name="type"
      >
        <SelectItem key="despesa" value="despesa">
          Despesa
        </SelectItem>
        <SelectItem key="receita" value="receita">
          Receita
        </SelectItem>
      </Select>

      <Select
        isRequired
        label="Escolha uma categoria"
        placeholder="Casa"
        defaultSelectedKeys={["casa"]}
        className="max-w-xs"
        name="category"
      >
        <SelectItem key="casa" value="casa">
          Casa
        </SelectItem>
        <SelectItem key="compras" >
          Compras
        </SelectItem>
        <SelectItem key="telefone">
          Telefone
        </SelectItem>
        <SelectItem key="ferias">
          Férias
        </SelectItem>
      </Select>

      <Select
        isRequired
        label="Escolha um periodo"
        placeholder="Esporadico"
        defaultSelectedKeys={["esporadico"]}
        className="max-w-xs"
        name="period"
      >
        <SelectItem key="esporadico" value="esporadico">
          Esporadico
        </SelectItem>
        <SelectItem key="mensal" value="mensal">
          Mensal
        </SelectItem>
        <SelectItem key="anual" value="anual">
          Anual
        </SelectItem>
      </Select>

      <Input
        isRequired
        aria-label='Valor'
        isClearable
        variant='bordered'
        fullWidth
        color="primary"
        size="md"
        name="value" required
        type="number"
        label="Escreva o valor"
        placeholder="0.00"
        labelPlacement="outside"
        endContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-small">R$</span>
          </div>
        }
      />

      <ModalFooter>
        <Button type="submit" color='primary'>
          Enviar
        </Button>
      </ModalFooter>

    </form>
  )
}
