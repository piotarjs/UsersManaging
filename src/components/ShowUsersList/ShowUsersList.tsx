import { Card, CardBody, Table, TableBody, TableHead } from "mdbreact";
import * as React from "react";
import { Redirect, UsersList } from '../../interfaces';

const ShowUsersList: React.SFC<Redirect & UsersList> = ({ users, redirect }) => 
  <Card>
    <CardBody>
      <h2 className="text-center mb-3">LISTA UŻYTKOWNIKÓW</h2>
      <Table>
        <TableHead>
          <tr>
            <td className="font-weight-bold">Imię</td>
            <td className="font-weight-bold">Nazwisko</td>
            <td className="font-weight-bold">Zdjęcie</td>
          </tr>
        </TableHead>
        <TableBody>
          {Object.values(users).map(({firstName, secondName, url, key}) =>
          <tr key={key} onClick={() => redirect(`${key}`)}>
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