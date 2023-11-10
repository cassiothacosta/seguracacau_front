/* eslint-disable react-hooks/rules-of-hooks */
import { Input, Button, ModalFooter, ModalHeader } from '@nextui-org/react'
import React from 'react';
import { useTranslation } from "next-i18next";


export default function FormCategory({ onSubmit }: any) {
  const { t } = useTranslation('common')

  return (
    <form onSubmit={onSubmit} className='grid gap-4 pl-5 pr-5'>
      <ModalHeader>
        {t('addCategory')}
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

      <ModalFooter>
        <Button  type="submit" color='primary'>
        {t('send')}
        </Button>
      </ModalFooter>
    </form>
  )
}
