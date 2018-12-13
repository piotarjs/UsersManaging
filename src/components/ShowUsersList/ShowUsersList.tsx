import { Card, CardBody, Col, Fa, Row, Table, TableBody, TableHead } from 'mdbreact';
import * as React from 'react';
import { Redirect, UsersList } from '../../interfaces';

interface Props {
  isEdited: string,
  toDelete: string,
  toEdit: string,
  users: UsersList['users'],
  redirect: Redirect['redirect'],
  deleteUserFromFirebase,
  highligthChosenElement,
  onDeleteHoverHighlight,
  onEditHoverHighlight
};

const ShowUsersList: React.FunctionComponent<Props> = ({ deleteUserFromFirebase, highligthChosenElement, isEdited, onDeleteHoverHighlight, onEditHoverHighlight, redirect, toDelete, toEdit, users }) => {
  const onDelete = (e, key) => {
    e.stopPropagation();
    deleteUserFromFirebase(`${key}`)
  }
  const onEdit = (e, key: string) => {
    const action = 'edit';
    e.stopPropagation();
    highligthChosenElement(key);
    redirect(`/${key}/${action}`);
  }
  const onDetails = (key: string) => {
    highligthChosenElement(key);
    redirect(`/${key}`);
  }
  const classNames = require('classnames');
  const isActive = (key) => classNames({
    "bg-danger": toDelete === key,
    "bg-info": toEdit === key,
    "disabled": isEdited === key,
    "isActive": isEdited === key,
  });
    return (
    <Card>
      <CardBody>
        <h2 className="text-center mb-3">LISTA UŻYTKOWNIKÓW</h2>
        <Table>
          <TableHead>
            <tr>
              <td className="font-weight-bold">Imię</td>
              <td className="font-weight-bold">Nazwisko</td>
              <td className="font-weight-bold text-center">Zdjęcie</td>
              <td className="font-weight-bold text-center">Usuń/Edytuj</td>
            </tr>
          </TableHead>
          <TableBody>
            {Object.values(users).map(({ firstName, secondName, url, key }) =>
              <tr key={key} onClick={() => onDetails(key)} className={isActive(key)} title="Wyświetl szczegóły o użytkowniku">
                <td>{firstName}</td>
                <td>{secondName}</td>
                <td>
                  <Row className="justify-content-center">
                    <Col sm="4">
                      <img src={url} alt="Zdjęcie profilowe" className="img-fluid rounded-circle" />
                    </Col>
                  </Row>
                </td>
                <td>
                  <Row className="justify-content-center">
                    <Fa 
                      icon="trash" 
                      id="delete" 
                      size="lg" 
                      title="Usuń" 
                      type="submit" 
                      onClick={(e) => onDelete(e, key)} 
                      onMouseEnter={({type}) => onDeleteHoverHighlight(type, key)}
                      onMouseLeave={({type}) => onDeleteHoverHighlight(type, key)}
                      className="mx-2 onDelete" 
                    />
                    <Fa 
                      icon="edit" 
                      id="edit" 
                      size="lg" 
                      title="Edytuj" 
                      type="submit" 
                      onClick={(e) => onEdit(e, key)} 
                      onMouseEnter={({type}) => onEditHoverHighlight(type, key)}
                      onMouseLeave={({type}) => onEditHoverHighlight(type, key)}
                      className="mx-2"
                    />
                  </Row>
                </td>
              </tr>
            )}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  )
}

export default ShowUsersList;
