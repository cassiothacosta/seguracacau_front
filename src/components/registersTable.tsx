import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/react";

export default function RegistersTable(tableData: any) {
  return (
    <Table
      aria-label="Example table with static content"
    >
      <TableHeader>
        <TableColumn>NOME</TableColumn>
        <TableColumn>TIPO</TableColumn>
        <TableColumn>CATEGORIA</TableColumn>
        <TableColumn>PERIODICIDADE</TableColumn>
        <TableColumn>VALOR</TableColumn>
        <TableColumn hidden >ID</TableColumn>
      </TableHeader>

      <TableBody>

        {Object.keys(tableData).map((item, index) => (
          <TableRow key={index}>
            {Object.keys(tableData[item]).map((item2, index2) => (
              <TableCell key={index2} >{
                item2 == "id" ? undefined : (item2 == "value" ? (tableData[item]['type'] == "Despesa" ? Number(-tableData[item][item2]).toLocaleString('pt-BR', {
                  style: "currency",
                  currency: "BRL"
                }) : Number(tableData[item][item2]).toLocaleString('pt-BR', {
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

