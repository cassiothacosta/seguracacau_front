import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, Button, getKeyValue, Pagination, Spinner, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import { format, parseISO } from "date-fns";
import { useTranslation } from "next-i18next";
import React, { useCallback, useState } from "react";
import { ToastContainer } from "react-toastify";

function formatDate(dateString: any) {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>;
}

export default function RegistersTable(this: any, tableData: any) {
  tableData = Array.from(tableData.data)
  const { t } = useTranslation('common')

  const [renderData, setRenderedData] = React.useState(tableData)
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]))
  const [filterValue, setFilterValue] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const [page, setPage] = React.useState(1);
  const hasSearchFilter = Boolean(filterValue);

  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "createdAt",
    direction: "ascending",
  });

  const filteredItems = React.useMemo(() => {
    let filteredRegisters = renderData;

    if (hasSearchFilter) {
      filteredRegisters = filteredRegisters.filter((register: any) =>
        register.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

    return filteredRegisters;
  }, [renderData, hasSearchFilter, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);


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
    return filteredItems.slice(start, end);
  }, [page, rowsPerPage, filteredItems]);


  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      let first = ''
      let second = ''
      if (sortDescriptor.column == "value") {
        first = Number(a[sortDescriptor.column]) as any
        second = Number(b[sortDescriptor.column]) as any
      } else {
        first = a[sortDescriptor.column];
        second = b[sortDescriptor.column];
      }
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);



  const onRowsPerPageChange = React.useCallback((e: any) => {
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


  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Busque pelo nome..."
            startContent={""}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {sortedItems.length} {t("registers")}</span>
          <label className="flex items-center text-default-400 text-small">
            {t("rowsperpage")}
            <select
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
    );
  }, [filterValue, onSearchChange, sortedItems.length, t, onRowsPerPageChange, onClear]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all" as any
            ? t("allselected")
            : `${selectedKeys.size} ` + t('of') + ` ${filteredItems.length} ` + t('selected')}
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
            {t("previous")}
          </Button>
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
            {t("next")}
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, filteredItems.length, page, pages, onPreviousPage, t, onNextPage]);

  const bodyContent = React.useMemo(() => {

    return (
      <TableBody
        emptyContent={"No registers found"}
        items={sortedItems}
      >
        {(item: any) => (
          <TableRow key={item.id}>
            {(columnKey) => item['type'] == 'despesa' ? (columnKey == 'createdAt' ?

              <TableCell className="text-rose-500">{formatDate(getKeyValue(item, columnKey))}</TableCell> : columnKey == 'value' ?
                <TableCell className="text-rose-500">{Number(getKeyValue(item, columnKey)).toLocaleString('pt-br', { style: "currency", currency: "BRL" })}</TableCell> :
                <TableCell className="text-rose-500">{getKeyValue(item, columnKey)}</TableCell>
            ) : (columnKey == 'createdAt' ?

              <TableCell className="text-green-500">{formatDate(getKeyValue(item, columnKey))}</TableCell> : columnKey == 'value' ?
                <TableCell className="text-green-500">{Number(getKeyValue(item, columnKey)).toLocaleString('pt-br', { style: "currency", currency: "BRL" })}</TableCell> :
                <TableCell className="text-green-500">{getKeyValue(item, columnKey)}</TableCell>)
            }
          </TableRow>
        )}
      </TableBody>
    );
  }, [sortedItems])

  return (
    <>
      <Table
        aria-label="Tabela contendo os registros do usuario"
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys as any}
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        sortDescriptor={sortDescriptor as any}
        onSortChange={setSortDescriptor as any}
        classNames={{
          wrapper: "max-h-full",
        }}
        topContent={topContent}
        topContentPlacement="outside"

      >
        <TableHeader>
          <TableColumn className="uppercase" key="name" allowsSorting>{t('registerTable.name')}</TableColumn>
          <TableColumn className="uppercase" key="type" allowsSorting>{t('registerTable.type')}</TableColumn>
          <TableColumn className="uppercase" key="category" allowsSorting>{t('registerTable.category')}</TableColumn>
          <TableColumn className="uppercase" key="period" allowsSorting>{t('registerTable.period')}</TableColumn>
          <TableColumn className="uppercase" key="value" allowsSorting>{t('registerTable.value')}</TableColumn>
          <TableColumn className="uppercase" key="createdAt" allowsSorting>{t('registerTable.added')}</TableColumn>
          <TableColumn className="uppercase" hidden>ID</TableColumn>
        </TableHeader>

        {bodyContent}
        
      </Table>
      
    </>
  )
}

