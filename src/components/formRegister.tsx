/* eslint-disable react-hooks/rules-of-hooks */
import { Input, Button, ModalFooter, Select, SelectItem, ModalHeader } from '@nextui-org/react'
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from "next-i18next";




export default function FormRegister({ onSubmit }: any) {
  const { t } = useTranslation('common')
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
        {t('registerTable.addValue')}
      </ModalHeader>
      <Input
        isRequired
        aria-label='Nome'
        label={t('registerTable.typeName')}
        isClearable
        variant='bordered'
        fullWidth
        color="primary"
        size="md"
        type="text"
        name="name"
        placeholder={t('registerTable.name')}
        labelPlacement="outside"
      />

      <Select
        label={t('registerTable.chooseType')}
        placeholder={t('registerTable.debit')}
        defaultSelectedKeys={["despesa"]}
        className="max-w-xs"
        name="type"
      >
        <SelectItem key="despesa" value="despesa">
          {t('registerTable.debit')}
        </SelectItem>
        <SelectItem key="receita" value="receita">
          {t('registerTable.credit')}
        </SelectItem>
      </Select>

      <Select
        label= {t('registerTable.chooseCategory')}
        placeholder= {t('registerTable.house')}
        defaultSelectedKeys={["casa"]}
        className="max-w-xs"
        name="category"
      >
        <SelectItem key="casa" value="casa">
        {t('registerTable.house')}
        </SelectItem>
        <SelectItem key="compras" value="compras">
        {t('registerTable.expenses')}
        </SelectItem>
        <SelectItem key="telefone" value="telefone">
        {t('registerTable.phone')}
        </SelectItem>
        <SelectItem key="ferias" value="ferias">
        {t('registerTable.vacations')}
        </SelectItem>
      </Select>

      <Select
        label= {t('registerTable.choosePeriod')}
        placeholder= {t('registerTable.sporadic')}
        defaultSelectedKeys={["esporadico"]}
        className="max-w-xs"
        name="period"
      >
        <SelectItem key="esporadico" value="esporadico">
        {t('registerTable.sporadic')}
        </SelectItem>
        <SelectItem key="mensal" value="mensal">
        {t('registerTable.montly')}
        </SelectItem>
        <SelectItem key="anual" value="anual">
        {t('registerTable.yearly')}
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
        label={t('registerTable.typeValue')}
        placeholder="0.00"
        labelPlacement="outside"
        endContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-small">$</span>
          </div>
        }
      />

      <ModalFooter>
        <Button  type="submit" color='primary'>
        {t('registerTable.send')}
        </Button>
      </ModalFooter>
      <ToastContainer />
    </form>
  )
}
