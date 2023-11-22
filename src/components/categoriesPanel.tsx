/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
  Modal,
  ModalContent,
  SelectItem,
  Select
} from "@nextui-org/react";
import {PlusIcon} from "./PlusIcon";
import {SearchIcon} from "./SearchIcon";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "next-i18next";
import Form from "./formCategory";

const apiLink = process.env.BACKEND_API

export async function addCategory({ body }: any) {
    try {
      const res = await fetch(apiLink + '/api/addCategory', {
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

  export async function removeCategories({ body }: any) {
    try {
      const res = await fetch(apiLink + '/api/deleteCategories', {
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
  

export default function CategoriesPanel({ user, handlePageTitle }: any) {

  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [errorMsg, setErrorMsg] = useState('')
  const [successMessage, setSuccessMsg] = useState('')
  const [visibleModal, setVisibleModal] = useState(false)
  const [visibleDelete, setVisibleDelete] = useState(false)
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });

  const classNames = React.useMemo(
    () => ({
      wrapper: ["max-h-[382px]", "max-w-[500px]", "place-self-center"],
      tbody: [""],
      th: ["text-default-500", "border-divider"],
      td: [
        // changing the rows border radius
        // first
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        // middle
        "group-data-[middle=true]:before:rounded-none",
        // last
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
      ],
    }),
    [],
  );

  const { t } = useTranslation('common')
  const [data, setCategorias] = useState([] as any[])

  useEffect(() => {
      handlePageTitle(t('reportsPage'))
      async function carregaCategorias() {
        const res = await fetch(apiLink + '/api/getCategories', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: user.username}),
            credentials: 'include'
        })
          const categorias = await res.json()
        setCategorias(categorias.data)
    }
    carregaCategorias()
  }, [user])

  const handleVisibleModal = () => {
    setVisibleModal(true)
  }

  const closeVisibleModal = () => {
    setVisibleModal(false)
  }

  const closeHandlerDelete = () => {
    setVisibleDelete(false)
  }

  async function carregaCategorias() {
    const res = await fetch(apiLink + '/api/getCategories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user.username}),
        credentials: 'include'
    })

    const categorias = await res.json()
    setCategorias(categorias.data)
}

  async function handleSubmit(e: Event & {
    currentTarget: any
  }) {

    e.preventDefault()
    if (errorMsg) setErrorMsg('')
    if (successMessage) setSuccessMsg('')

    console.log(e.currentTarget)
    const body = {
      username: user.username,
      name: e.currentTarget.elements.name.value
    }
    try {
      await addCategory({ body }).then((response: any) => {
        if (response.status == 200) {
          setSuccessMsg(t('sucessMsg'))
          carregaCategorias()
        } else {
          setErrorMsg(t('errorMsg') + response.text())
          throw new Error(response.text())
        }
      })
    } catch (error: any) {
      console.error(t('unexError'), error)
      setErrorMsg(error.message)
    }
  }

  async function submitDeleteCategories(e: Event & {
    currentTarget: any
  }) {

    e.preventDefault()
    if (errorMsg) setErrorMsg('')
    if (successMessage) setSuccessMsg('')

    let selectValues: any = []
    for (const item in e.currentTarget.selectedKeys.options) selectValues.push(e.currentTarget.selectedKeys.options[item].value)
    const body = {
      username: user.username,
      selectedKeys: selectValues
    }

    try {
      await removeCategories({ body }).then((response: any) => {
        if (response.status == 200) {
          setSuccessMsg(t('sucessDeleteMsg'))
          setTimeout(() => {
            carregaCategorias()
          }, 10);
        } else {
          setErrorMsg(t('errorDeleteMsg') + response.text())
          throw new Error(response.text())
        }
      })
    } catch (error: any) {
      console.error(t('unexError'), error)
      setErrorMsg(error.message)
    }
  }

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filteredCategories = [...data];

    if (hasSearchFilter) {
      filteredCategories = filteredCategories && filteredCategories.filter((category) =>
      category.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

    return filteredCategories;
  }, [data, hasSearchFilter, filterValue]);

  const pages = filteredItems.length > 0 ? Math.ceil(filteredItems.length / rowsPerPage) : 1 ;

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: any, b: any) => {
      const first = a[sortDescriptor.column as keyof any] as number;
      const second = b[sortDescriptor.column as keyof any] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(()=>{
    setFilterValue("")
    setPage(1)
  },[])

  const handlerDelete = () => (selectedKeys as any).size > 0 && setVisibleDelete(true);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
                <Modal closeButton
          aria-labelledby="modal-title"
          isOpen={visibleDelete}
          onOpenChange={closeHandlerDelete}>
          <ModalContent>
            <form onSubmit={submitDeleteCategories as any} className='grid grid-rows-2 grid-cols-1 gap-5 p-10'>
              <div hidden>
                <Select aria-label='registers' name='selectedKeys' selectionMode="multiple">
                  {Array.from(selectedKeys).map((key: any) => (
                    <SelectItem key={key} value={key}>
                      {key}
                    </SelectItem>
                  ))}
                </Select>
              </div>

              <div className='flex grid content-center justify-center'>
                {t('confirmDelete')}
              </div>
              <div className='grid grid-cols-2 gap-5'>
                <Button color="danger" onPress={closeHandlerDelete} type="submit">
                  {t('confirm')}
                </Button>
                <Button color="primary" onPress={closeHandlerDelete}>
                  {t('cancel')}
                </Button>
              </div>
            </form>
          </ModalContent>
        </Modal>

        <Modal closeButton
          aria-labelledby="modal-title"
          isOpen={visibleModal}
          onOpenChange={closeVisibleModal}>

          <ModalContent>
            <Form onSubmit={handleSubmit} />
          </ModalContent>
        </Modal>
        
        <div className="flex justify-between gap-3 items-end">
        
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder={t('searchByRegister')}
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Button color="primary" onPress={handleVisibleModal} endContent={<PlusIcon />}>
              {t('addValue')}
            </Button>
            <Button color="warning" onPress={handlerDelete} endContent={<PlusIcon />}>
              {t('delete')}
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {data.length} {t('categories')}</span>
          <label className="flex items-center text-default-400 text-small">
            {t('rowsperpage')}
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [visibleModal, handleSubmit, t, filterValue, onSearchChange, data.length, onRowsPerPageChange, onClear]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} ` + t('of') + ` ${filteredItems.length} `+ t('selected')}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
            {t('previous')}
          </Button>
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
            {t('next')}
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, filteredItems.length, page, pages, onPreviousPage, onNextPage]);

  return (
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={classNames}
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader className="text-start">
          <TableColumn className="uppercase" key="name" allowsSorting>{t('name')}</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No custom categories found"} items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>
             <TableCell>{item.name}</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
