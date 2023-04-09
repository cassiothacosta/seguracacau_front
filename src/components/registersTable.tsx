import { Table } from "@nextui-org/react";

const registersTable = ({ errorMessage, tableData }: any) => (


    <Table
      aria-label="Example table with static content"
      css={{
        height: "auto",
        minWidth: "100%",
        textDecorationColor: "#ffffff80"
      }}
    > 
      <Table.Header>
        <Table.Column>NAME</Table.Column>
        <Table.Column>TIPO</Table.Column>
        <Table.Column>CATEGORIA</Table.Column>
        <Table.Column>PERIODICIDADE</Table.Column>
        <Table.Column>VALOR</Table.Column>
      </Table.Header>
      
      <Table.Body>
      {tableData.forEach((element:any) => {
         <Table.Row key="1">
          {element.forEach((data: any) =>{
            <Table.Cell>{data}</Table.Cell>
          })}
       </Table.Row>
      })};
      </Table.Body>
    </Table>
    
);

  export default registersTable