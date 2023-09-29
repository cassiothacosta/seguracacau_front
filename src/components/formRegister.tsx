/* eslint-disable react-hooks/rules-of-hooks */
import { Input, Modal, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, ModalFooter } from '@nextui-org/react'
import { Card } from "@nextui-org/react";
import { NumericFormat } from 'react-number-format';
import React, { useState } from 'react';
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
      <div>
        <div>
          <Input
            aria-label='Nome'
            isClearable
            variant='bordered'
            fullWidth
            color="primary"
            size="md"
            type="text"
            name="name"
            placeholder="Nome"
            required
          />
        </div>
        <div >Selecione um tipo</div>
        <div>

          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered"
                className="capitalize">
                {selectedType}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Single selection example"
              color="secondary"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selectedType}
              onSelectionChange={setSelectedType as any}
            >
              <DropdownItem key="despesa">
                Despesa
              </DropdownItem>
              <DropdownItem key="fundo">
                Fundo
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div>Selecione uma categoria</div>
        <div >
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered"
                className="capitalize">
                {selectedCategory}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Single selection actions"
              color="secondary"
              disallowEmptySelection={true}
              selectionMode="single"
              selectedKeys={selectedCategory}
              onSelectionChange={setSelectedCategory as any}
            >
              <DropdownItem key="casa">
                Casa
              </DropdownItem>
              <DropdownItem key="compras">
                Compras
              </DropdownItem>
              <DropdownItem key="telefone">
                Telefone
              </DropdownItem>
              <DropdownItem key="ferias">
                Férias
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div >Selecione um Período</div>
        <div >
          <Dropdown>
            <DropdownTrigger><Button variant="bordered"
              className="capitalize">
              {selectedValue}
            </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Single selection actions"
              color="secondary"
              disallowEmptySelection={true}
              selectionMode="single"
              selectedKeys={selectedValue}
              onSelectionChange={setSelectedValue as any}
            >
              <DropdownItem key="esporadico">
                Esporadico
              </DropdownItem>
              <DropdownItem key="mensal">
                Mensal
              </DropdownItem>
              <DropdownItem key="anual">
                Anual
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div>
          <Input
            aria-label='Valor'
            isClearable
            variant='bordered'
            fullWidth
            color="primary"
            size="md"
            name="value" required
            type="number"
            label="Price"
            placeholder="0.00"
            labelPlacement="outside"
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">$</span>
              </div>
            }
          />
        </div>
      </div>
      <ModalFooter>
        <Button type="submit">
          Enviar
        </Button>
      </ModalFooter>

    </form>
  )
}
