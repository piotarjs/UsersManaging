import React from "react";
import { Table, TableHead, TableBody, Card, CardBody } from "mdbreact";
import "./ShowUsersList.css";

const ShowUsersList = ({ entries, deleteItem }) =>
  <Card>
    <CardBody>
      <h2 className="text-center mb-3">LISTA ZAWODNIKÓW</h2>
      <Table striped>
        <TableHead>
          <tr>
            <td className="font-weight-bold">ID</td>
            <td className="font-weight-bold">Login</td>
          </tr>
        </TableHead>
        <TableBody>
          {Object.values(entries).map(({key, login}) =>
          <tr onClick={() => deleteItem(key)}
              key={key}>
            <td>{key}</td>
            <td>{login}</td>
          </tr>
          )}
        </TableBody>
      </Table>
    </CardBody>
  </Card>

export default ShowUsersList;