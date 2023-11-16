/* eslint-disable react-hooks/exhaustive-deps */
import React, { FunctionComponent, PureComponent } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Pagination,
  Selection,
  SortDescriptor,
  Input,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "next-i18next";
import { SearchIcon } from "./SearchIcon";
import DatePicker from "react-datepicker";
import generatePDF, { Options } from "react-to-pdf";
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';




export default function CategoryEvolutionReport({ user, handlePageTitle }: any) {

  const defaultCategories = [
    { name: "casa" },
    { name: "compras" },
    { name: "telefone" },
    { name: "ferias" }
  ]

  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [startDate, setStartDate] = useState(new Date());
  const [valores, setValores] = useState([] as any[])
  const [showEmptyMessage, setshowEmptyMessage] = useState<Boolean>(false)
  const { t } = useTranslation('common')
  const [data, setCategorias] = useState(defaultCategories as any[] as any[])
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

  const apiLink = process.env.BACKEND_API
const options: Options = {
  filename: t('categoryEvol') + ' - ' + startDate.getFullYear(),
  page: {
    margin: 25
  }
};

const dateObj = new Object({
  0: 'jan',
  1: 'feb',
  2: 'mar',
  3: 'apr',
  4: 'may',
  5: 'jun',
  6: 'jul',
  7: 'aug',
  8: 'sep',
  9: 'oct',
  10: 'nov',
  11: 'dec'
})

  useEffect(() => {
    handlePageTitle(t('reportsPage'))
    async function carregaCategorias() {
      const res = await fetch(apiLink + '/api/getCategories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user.username }),
        credentials: 'include'
      })
      const categorias = await res.json()
      setCategorias([...defaultCategories, ...categorias.data])
    }
    carregaCategorias()
  }, [user])


  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filteredCategories = [...data];

    if (hasSearchFilter) {
      filteredCategories = filteredCategories.filter((category) =>
        category.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

    return filteredCategories;
  }, [data, hasSearchFilter, filterValue]);

  const pages = filteredItems.length > 0 ? Math.ceil(filteredItems.length / rowsPerPage) : 1;

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

  const onClear = React.useCallback(() => {
    setFilterValue("")
    setPage(1)
  }, [])

  const isUserUsingMobile = () => {

    // User agent string method
    let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // Screen resolution method
    if (!isMobile) {
      let screenWidth = window.screen.width;
      let screenHeight = window.screen.height;
      isMobile = (screenWidth < 768 || screenHeight < 768);
    }

    // Touch events method
    if (!isMobile) {
      isMobile = (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.maxTouchPoints > 0));
    }

    // CSS media queries method
    if (!isMobile) {
      let bodyElement = document.getElementsByTagName('body')[0];
      isMobile = window.getComputedStyle(bodyElement).getPropertyValue('content').indexOf('mobile') !== -1;
    }

    return isMobile
  }

  const getTargetElement = () => document.getElementById("pdf-container");

  const downloadPdf = () => {
    const target: any = document.getElementById("pdf-container")

    if (!isUserUsingMobile()) {
      target.className = 'light bg-background flex-auto rounded-lg'
      generatePDF(getTargetElement, options)
      target.className = 'light bg-background lg:flex-auto lg:h-[350px] max-sm:h-[800px] max-sm:w-screen rounded-lg'
    } else {
      target.className = 'light bg-background flex-auto h-full w-[1080px] rounded-lg'
      generatePDF(getTargetElement, options)
      target.className = 'light bg-background flex-auto h-[600px] max-sm:w-screen rounded-lg'
    }

  }

  const carregaRelatorio = (async () => {
    const keysArray = Array.from(selectedKeys)
    const res = await fetch(apiLink + '/api/getFilteredValues', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: user.username, year: startDate.getFullYear(), keysArray }),
      credentials: 'include'
    })

    const registros = await res.json()
    setValores(registros.data)
    setshowEmptyMessage(true)
  })


  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder={t('seachByName')}
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className='flex grid-cols-3 gap-3'>

            <DatePicker className="p-1 rounded-lg"
              selected={startDate}
              onChange={(date) => setStartDate(date as any)}
              showYearPicker
              dateFormat="yyyy"
            />
            <div className="">
              <Button onPress={carregaRelatorio}>{t('loadReport')}</Button>
            </div>
            <div className="">
              <Button onClick={downloadPdf}>Download PDF</Button>
            </div>
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
              <option value="15">15</option>
              <option value="10">10</option>
              <option value="5">5</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [startDate, selectedKeys, filterValue, onSearchChange, data.length, onRowsPerPageChange, onClear]);


  const CustomizedAxisTick: FunctionComponent<any> = (props: any) => {
    const { x, y, payload } = props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="end"
          fill="#666"
          transform="rotate(-35)"
        >
          {t(dateObj[payload.index as keyof object])}
        </text>
      </g>
    );
  };

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
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
    <div>
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
            <TableRow key={item.name} >
              <TableCell>{item.name}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {valores.toString().includes('object') ?
        <div id="pdf-container" className="light bg-background lg:flex-auto lg:h-[350px] max-sm:h-[800px] max-sm:w-screen rounded-lg">
          <div className="p-10 overflow-y-scroll h-full max-sm:overflow-x-scroll max-sm:w-[1080px]">
            <div className="text-black text-center text-2xl font-semibold">{t('categoryEvol') + ' - ' + startDate.getFullYear()}</div>
            <div className="flex-rows">
              {Object.keys(Array.from(selectedKeys)).map((key, value) => (
                <>

                  <div key={key}>
                    <div className="text-black text-center capitalize p-10 text-xl">{Array.from(selectedKeys)[value] as any}</div>
                    <div className="flex justify-center">
                      <BarChart
                        width={1200}
                        height={400}
                        data={valores[value]}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 50,
                        }}
                        className=""
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" tick={<CustomizedAxisTick />} />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                      </BarChart>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
        :
        showEmptyMessage &&

        <div className="text-3xl text-center">
          Sem registros para o ano informado
        </div>



      }

    </div>
  );
}
