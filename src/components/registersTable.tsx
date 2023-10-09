import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/react";
import { useTranslation } from "next-i18next";

export default function RegistersTable(tableData: any) {
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
        <TableColumn hidden >ID</TableColumn>
      </TableHeader>

      <TableBody>

        {Object.keys(tableData).map((item, index) => (
          <TableRow key={index}>
            {Object.keys(tableData[item]).map((item2, index2) => (
              tableData[item]['type'] === "despesa" ? 
              <TableCell className="text-rose-500" key={index2} >{
                item2 == "id" ? undefined : (item2 == "value" ? (tableData[item]['type'] == "Despesa" ? Number(-tableData[item][item2]).toLocaleString('ptbr', {
                  style: "currency",
                  currency: "BRL"
                }) : Number(tableData[item][item2]).toLocaleString('ptbr', {
                  style: "currency",
                  currency: "BRL"
                })) : tableData[item][item2])
              }</TableCell>
               :
               <TableCell  className="text-green-500" key={index2} >{
                item2 == "id" ? undefined : (item2 == "value" ? (tableData[item]['type'] == "Despesa" ? Number(-tableData[item][item2]).toLocaleString('ptbr', {
                  style: "currency",
                  currency: "BRL"
                }) : Number(tableData[item][item2]).toLocaleString('ptbr', {
                  style: "currency",
                  currency: "BRL"
                })) : tableData[item][item2])
              }</TableCell>
              
            ))}
          </TableRow>
        ))}

      </TableBody>
    </Table>

  )
}

