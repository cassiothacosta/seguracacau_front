import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
  getKeyValue,
  Pagination,
  Input,
  Modal,
  ModalContent,
  Select,
  Selection,
  SelectItem,
  SortDescriptor
} from "@nextui-org/react";
import { format, parseISO } from "date-fns";
import { useTranslation } from "next-i18next";
import React, { useEffect } from "react";
import { TrashIcon } from "./TrashIcon"
import { Periodicity } from "./enums"
import { PlusIcon } from "./PlusIcon";
import Form from './formRegister'
import moment from "moment";


function formatDate(dateString: any) {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>;
}

export default function RegistersTable({ tableData, onSubmit, onSubmitAdd }: any) {

  const { t } = useTranslation('common')
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
  const [filterValue, setFilterValue] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const [page, setPage] = React.useState(1);
  const hasSearchFilter = Boolean(filterValue);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "createdAt",
    direction: "ascending",
  });

  const filteredItems = React.useMemo(() => {
    let filteredRegisters = tableData;

    if (hasSearchFilter) {
      filteredRegisters = filteredRegisters.filter((register: any) =>
        register.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

    return filteredRegisters;
  }, [tableData, hasSearchFilter, filterValue]);

  const pages = filteredItems && filteredItems.length > 0 ? Math.ceil(filteredItems.length / rowsPerPage) : 1;


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

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems && filteredItems.slice(start, end);
  }, [page, rowsPerPage, filteredItems]);


  const sortedItems = React.useMemo(() => {
    return items && [...items].sort((a: any, b: any) => {
      const first = sortDescriptor.column == "value" ? Number(a[sortDescriptor.column as keyof any]) as number : a[sortDescriptor.column as keyof any] as number;
      const second = sortDescriptor.column == "value" ? Number(b[sortDescriptor.column as keyof any]) as number : b[sortDescriptor.column as keyof any] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value: any) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("")
    setPage(1)
  }, [])

  const [visibleDelete, setVisibleDelete] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  const closeHandlerDelete = () => {
    setVisibleDelete(false);
    console.log("closed");
  };

  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };


  const topContent = React.useMemo(() => {

    const handlerDelete = () => (selectedKeys as any).size > 0 && setVisibleDelete(true);

    return (
      <div className="flex lg:flex-col gap-4 max-sm:p-4">
        <Modal closeButton
          aria-labelledby="modal-title"
          isOpen={visibleDelete}
          onOpenChange={closeHandlerDelete}>
          <ModalContent>
            <form onSubmit={onSubmit} className='grid grid-rows-2 grid-cols-1 gap-5 p-10'>
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
          isOpen={visible}
          onOpenChange={closeHandler}>

          <ModalContent>
            <Form onSubmit={onSubmitAdd} />
          </ModalContent>
        </Modal>

        <div className="max-sm:flex max-sm:grid lg:justify-between lg:gap-3 lg:items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%] pb-3"
            placeholder="Busque pelo nome..."
            startContent={""}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-2 pb-2">
            <div className="flex grid content-center justify-end">
              <Button color="warning" onPress={handlerDelete} endContent={<TrashIcon />}>
                {t('deleteValues')}
              </Button>
            </div>
            <div className="flex grid content-center justify-end">
              <Button color="primary" onPress={handler} endContent={<PlusIcon />}>
                {t('addValue')}
              </Button>
            </div>


          </div>
          <div className="lg:flex justify-between items-center">
            <span className="text-default-400 text-small">Total {sortedItems ? sortedItems.length : 0} {t("registers")}</span>
            <label className="flex items-center text-default-400 text-small">
              {t("rowsperpage")}
              <select name="rowsperpage"
                className="bg-transparent outline-none text-default-400 text-small"
                onChange={onRowsPerPageChange}
              >
                <option value="15">15</option>
                <option value="10">10</option>
                <option value="5">5</option>


              </select>
            </label>
          </div>
        </div>

      </div>
    );
  }, [visibleDelete, onSubmit, selectedKeys, t, visible, onSubmitAdd, filterValue, onSearchChange, sortedItems, onRowsPerPageChange, onClear]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems ? filteredItems.length : 0} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
          initialPage={1}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
            Previous
          </Button>
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, filteredItems, page, pages, onPreviousPage, onNextPage]);

  const bodyContent = React.useMemo(() => {

    return (
      <TableBody
        className="h-full overflow-x"
        emptyContent={"No registers found"}
        items={sortedItems ? sortedItems : []}
      >
        {(item: any) => (
          <TableRow key={item.id}>
            {(columnKey) => item['type'] == 'despesa' ? (columnKey == 'createdAt' ?

              <TableCell className="text-rose-500">{moment(new Date(getKeyValue(item, columnKey)).toISOString().split('T'), "YYYY/MM/DD").format(t('dateFormat'))}</TableCell> : columnKey == 'value' ?
                <TableCell className="text-rose-500">{Number(getKeyValue(item, columnKey)).toLocaleString('pt-br', { style: "currency", currency: "BRL" })}</TableCell> :
                columnKey == 'period' ? <TableCell className="text-rose-500">{t('' + String(item.period == 'E' ? Periodicity.E : item.period == 'M' ? Periodicity.M : Periodicity.A))}</TableCell> :
                  <TableCell className="text-rose-500">{getKeyValue(item, columnKey)}</TableCell>
            ) : (columnKey == 'createdAt' ?

              <TableCell className="text-green-500">{moment(new Date(getKeyValue(item, columnKey)).toISOString().split('T'), "YYYY/MM/DD").format(t('dateFormat'))}</TableCell> : columnKey == 'value' ?
                <TableCell className="text-green-500">{Number(getKeyValue(item, columnKey)).toLocaleString('pt-br', { style: "currency", currency: "BRL" })}</TableCell> :
                columnKey == 'period' ? (<TableCell className="text-green-500">{t('' + String(item.period == 'E' ? Periodicity.E : item.period == 'M' ? Periodicity.M : Periodicity.A))}</TableCell>) :
                  <TableCell className="text-green-500">{getKeyValue(item, columnKey)}</TableCell>)
            }
          </TableRow>
        )}
      </TableBody>
    );
  }, [sortedItems, t])

  return (
    <>
      <Table
        aria-label="Tabela contendo os registros do usuario"
        isHeaderSticky
        selectionMode="multiple"    
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys as any}
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        sortDescriptor={sortDescriptor as any}
        onSortChange={setSortDescriptor as any}
        classNames={{
          wrapper: "max-h-full max-sm:w-[412px]",
        }}
        topContent={topContent}
        topContentPlacement="outside"

      >
        <TableHeader>
          <TableColumn className="uppercase" key="name" allowsSorting>{t('name')}</TableColumn>
          <TableColumn className="uppercase" key="type" allowsSorting>{t('type')}</TableColumn>
          <TableColumn className="uppercase" key="category" allowsSorting>{t('category')}</TableColumn>
          <TableColumn className="uppercase" key="period" allowsSorting>{t('period')}</TableColumn>
          <TableColumn className="uppercase" key="value" allowsSorting>{t('value')}</TableColumn>
          <TableColumn className="uppercase" key="createdAt" allowsSorting>{t('added')}</TableColumn>
          <TableColumn className="uppercase" hidden>ID</TableColumn>
        </TableHeader>

        {bodyContent}

      </Table>
    </>
  )
}

