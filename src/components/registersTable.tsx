import { Table, Text } from "@nextui-org/react";

const RegistersTable = (tableData: any) => (

  <Table
    aria-label="Example table with static content"
    css={{
      height: "auto",
      minWidth: "100%",
      textDecorationColor: "#ffffff80"
    }}
  >
    <Table.Header>
      <Table.Column>NOME</Table.Column>
      <Table.Column>TIPO</Table.Column>
      <Table.Column>CATEGORIA</Table.Column>
      <Table.Column>PERIODICIDADE</Table.Column>
      <Table.Column>VALOR</Table.Column>
      <Table.Column {...{ "hidden": "{true}" }} >ID</Table.Column>
    </Table.Header>

    <Table.Body>

      {Object.keys(tableData).map((item, index) => (
        <Table.Row key={index}>
          {Object.keys(tableData[item]).map((item2, index2) => (
            <Table.Cell key={index2} >{
              item2 == "id" ? undefined : ( item2 == "value" ? (tableData[item]['type'] == "Despesa" ? Number(-tableData[item][item2]).toLocaleString('pt-BR', {
                style: "currency",
                currency: "BRL"
              }): Number(tableData[item][item2]).toLocaleString('pt-BR', {
                style: "currency",
                currency: "BRL"
              })): tableData[item][item2])
            }</Table.Cell>
          ))}
        </Table.Row>
      ))}

    </Table.Body>
  </Table>

);

export default RegistersTable