import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, Button, Image } from "@nextui-org/react";
import { parseISO, format } from 'date-fns';
import { useTranslation } from "next-i18next";

function formatDate(dateString: any) {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>;
}

export default function RegistersTable(tableData: any, {handleDeleteRegister}: any ) {
  const { t } = useTranslation('common')
  return (

    <Table
      aria-label="Tabela contendo os registros do usuario"
    >
      <TableHeader>
        <TableColumn className="uppercase">{t('registerTable.name')}</TableColumn>
        <TableColumn className="uppercase">{t('registerTable.type')}</TableColumn>
        <TableColumn className="uppercase">{t('registerTable.category')}</TableColumn>
        <TableColumn className="uppercase">{t('registerTable.pariod')}</TableColumn>
        <TableColumn className="uppercase">{t('registerTable.value')}</TableColumn>
        <TableColumn className="uppercase">{t('registerTable.added')}</TableColumn>
        <TableColumn className="uppercase">{t('registerTable.delete')}</TableColumn>
      </TableHeader>

      <TableBody>

        {Object.keys(tableData).map((item, index) => (
          <TableRow key={index}>
            {Object.keys(tableData[item]).map((item2, index2) => (
              item2 == "id" ? <TableCell className="text-rose-500" key={index2}> <Button onClick={handleDeleteRegister} variant="light" isIconOnly size="sm" > 
              <Image
                alt="Moon Outline - Iconfinder"
                src="/trash.png"
              /></Button></TableCell> :
                tableData[item]['type'] === "despesa" ?
                  <TableCell className="text-rose-500" key={index2} >{
                    item2 == "value" ? (tableData[item]['type'] == "despesa" ? Number(tableData[item][item2]).toLocaleString('pt-br', {
                      style: "currency",
                      currency: "BRL"
                    }) : tableData[item]['type'] == "receita" && Number(tableData[item][item2]).toLocaleString('pt-br', {
                      style: "currency",
                      currency: "BRL"
                    })) :
                      item2 == "createdAt" ?
                        formatDate(tableData[item][item2])
                        : tableData[item][item2]
                  }</TableCell>
                  :
                  <TableCell className="text-green-500" key={index2} >{
                    item2 == "value" ? (tableData[item]['type'] == "despesa" ? Number(tableData[item][item2]).toLocaleString('pt-br', {
                      style: "currency"
                    }) : tableData[item]['type'] == "receita" && Number(tableData[item][item2]).toLocaleString('pt-br', {
                      style: "currency",
                      currency: "BRL"
                    })) : item2 == "createdAt" ?
                      formatDate(tableData[item][item2])
                      : tableData[item][item2]
                  }</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>

  )
}

