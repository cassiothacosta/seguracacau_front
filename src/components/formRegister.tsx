import { Input, Button, ModalFooter, Select, SelectItem, ModalHeader } from '@nextui-org/react'
import React, { useEffect, useState } from 'react';
import { useTranslation } from "next-i18next";
import DatePicker from "react-datepicker";

enum periodicity {
  ESPORADICO = 'E',
  MENSAL = 'M',
  ANUAL = 'A'

}

const apiLink = process.env.BACKEND_API

const defaultCategories = [
  { name: "casa" },
  { name: "compras" },
  { name: "telefone" },
  { name: "ferias" }
]

export default function FormRegister({ onSubmit, username, tableDate }: any) {
  const { t } = useTranslation('common')
  const [selectedType, setSelectedType] = useState(new Set(["despesa"]));
  const [data, setCategorias] = useState(defaultCategories as any[])
  const [startDate, setStartDate] = React.useState(new Date(tableDate));

  useEffect(() => {
    async function carregaCategorias() {
      const res = await fetch(apiLink + '/api/getCategories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username }),
        credentials: 'include'
      })
      const categorias = await res.json()
      setCategorias([...defaultCategories, ...categorias.data])
    }
    carregaCategorias()
  }, [username])

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
        {t('addValue')}
      </ModalHeader>
      <Input
        isRequired
        aria-label='Nome'
        label={t('typeName')}
        isClearable
        variant='bordered'
        fullWidth
        color="primary"
        size="md"
        type="text"
        name="name"
        placeholder={t('name')}
        labelPlacement="outside"
      />
      <div className='flex-auto grid justify-start'>
        {t('selectPeriod')}

        <DatePicker className="p-1 rounded-lg"
          selected={startDate}
          onChange={(date) => setStartDate(date as any)}
          showMonthYearPicker
          dateFormat="MM/yyyy"
          name="registerDate"
        />
      </div>

      <Select
        label={t('chooseType')}
        placeholder={t('debit')}
        defaultSelectedKeys={["despesa"]}
        className="max-w-xs"
        name="type"
      >
        <SelectItem key="despesa" value="despesa">
          {t('debit')}
        </SelectItem>
        <SelectItem key="receita" value="receita">
          {t('credit')}
        </SelectItem>
      </Select>

      <Select
        label={t('chooseCategory')}
        placeholder={t('house')}
        defaultSelectedKeys={["casa"]}
        className="max-w-xs"
        items={...data}
        name="category"
      >
        {(item: any) => (
          <SelectItem key={item.name} value={item.name}>
            {item.name}
          </SelectItem>
        )}
      </Select>

      <Select
        label={t('choosePeriod')}
        placeholder={t('sporadic')}
        defaultSelectedKeys={[periodicity.ESPORADICO]}
        className="max-w-xs"
        name="period"
      >
        <SelectItem key={periodicity.ESPORADICO}>
          {t('sporadic')}
        </SelectItem>
        <SelectItem key={periodicity.MENSAL}>
          {t('montly')}
        </SelectItem>
        <SelectItem key={periodicity.ANUAL}>
          {t('yearly')}
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
        step="0.01"
        label={t('typeValue')}
        placeholder="0.00"
        labelPlacement="outside"
        endContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-small">$</span>
          </div>
        }
      />

      <ModalFooter>
        <Button type="submit" color='primary'>
          {t('send')}
        </Button>
      </ModalFooter>
    </form>
  )
}
