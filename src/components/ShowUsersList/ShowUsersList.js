import React from "react";
import { Table, TableHead, TableBody, Card, CardBody } from "mdbreact";

const ShowUsersList = ({ entries }) =>
  <Card>
    <CardBody>
      <h2 className="text-center mb-3">LISTA UŻYTKOWNIKÓW</h2>
      <Table striped>
        <TableHead>
          <tr>
            <td className="font-weight-bold">Imię</td>
            <td className="font-weight-bold">Nazwisko</td>
            <td className="font-weight-bold">Zdjęcie</td>
          </tr>
        </TableHead>
        <TableBody>
          {Object.values(entries).map(({firstName, secondName, url, key}) =>
          <tr key={key}>
            <td>{firstName}</td>
            <td>{secondName}</td>
            <td><img src={url} alt="Zdjęcie profilowe" className="img-fluid rounded h-25"/></td>
          </tr>
          )}
        </TableBody>
      </Table>
    </CardBody>
  </Card>

export default ShowUsersList;