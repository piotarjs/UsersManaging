import * as classNames from 'classnames'
import { Card, CardBody, Col, Fa, Row, Table, TableBody, TableHead } from 'mdbreact';
import * as React from 'react';
import { Action, ActionCreator } from 'redux';
import { SortByColumn, SortColumn, SortingOrder, UsersList } from '../../../../interfaces';

interface Props {
  listElementIsEdited: string,
  sortColumn: SortColumn,
  sortingOrder: SortingOrder,
  listElementToDelete: string,
  listElementToEdit: string,
  usersFiltered: UsersList['users'],
  usersSorted: UsersList['users'],
  redirect: ActionCreator<Action>,
  deleteUserFromFirebase: ActionCreator<Action>,
  highligthChosenElement: ActionCreator<Action>,
  onDeleteHoverHighlight: ActionCreator<Action>,
  onEditHoverHighlight: ActionCreator<Action>,
  sortUsersList: ActionCreator<Action>
};

class ShowUsersList extends React.Component<Props> {

  public onDelete = (key: string) => (e: Event) => {
    e.stopPropagation();
    this.props.deleteUserFromFirebase(`${key}`)
  }

  public onEdit = (key: string) => (e: Event) => {
    e.stopPropagation();
    this.props.highligthChosenElement(key);
    this.props.redirect(`/${key}/edit`);
  }

  public onDetails = (key: string) => () => {
    this.props.highligthChosenElement(key);
    this.props.redirect(`/${key}`);
  }

  public highlightElementToDelete = (key: string) => ({ type }: Event) => {
    this.props.onDeleteHoverHighlight(type, key);
  }

  public highlightElementToEdit = (key: string) => ({ type }: Event) => {
    this.props.onEditHoverHighlight(type, key);
  }

  public isActive = (key: string) => classNames({
    "bg-danger": this.props.listElementToDelete === key,
    "bg-primary": this.props.listElementToEdit === key,
    "disabled": this.props.listElementIsEdited === key,
    "isActive": this.props.listElementIsEdited === key,
  });

  public isSorted = (id: SortByColumn) => classNames({
    [`fa fa-sort-${this.props.sortColumn? this.props.sortColumn.sortingOrder : ''}`]: this.props.sortColumn? this.props.sortColumn.sortedByColumn === id : '',
    "ml-1": true,
  });

  public sortList = (usersFiltered: UsersList['users'], sortingOrder: SortingOrder, columnName: SortByColumn) => () => {
    this.props.sortUsersList(usersFiltered, sortingOrder, columnName)
  }

  public render() {
    const { sortingOrder, usersFiltered, usersSorted } = this.props;
    return (
      <Card>
        <CardBody>
          <h2 className="text-center mb-3">LISTA UŻYTKOWNIKÓW</h2>
          <Table>
            <TableHead>
              <tr>
                <td
                  onClick={this.sortList(usersFiltered, sortingOrder, 'firstName')}
                  title="Sortuj"
                  className="font-weight-bold sortList">
                  Imię
                  <i className={this.isSorted('firstName')} />
                </td>
                <td
                  onClick={this.sortList(usersFiltered, sortingOrder, 'secondName')}
                  title="Sortuj" 
                  className="font-weight-bold sortList">
                  Nazwisko
                  <i className={this.isSorted('secondName')} />
                </td>
                <td className="font-weight-bold text-center">Zdjęcie</td>
                <td className="font-weight-bold text-center">Usuń/Edytuj</td>
              </tr>
            </TableHead>
            <TableBody>
              {Object.values(usersSorted).map(({ firstName, secondName, url, key }) =>
                <tr
                  key={key}
                  onClick={this.onDetails(key)}
                  className={this.isActive(key)}
                  title="Wyświetl szczegóły o użytkowniku"
                >
                  <td className="w-25">{firstName}</td>
                  <td className="w-25">{secondName}</td>
                  <td>
                    <Row className="justify-content-center">
                      <Col sm="4">
                        <img
                          src={url}
                          alt="Zdjęcie profilowe"
                          className="img-fluid rounded-circle"
                        />
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
                        onClick={this.onDelete(key)}
                        onMouseEnter={this.highlightElementToDelete(key)}
                        onMouseLeave={this.highlightElementToDelete(key)}
                        className="mx-2 onDelete"
                      />
                      <Fa
                        icon="edit"
                        id="edit"
                        size="lg"
                        title="Edytuj"
                        type="submit"
                        onClick={this.onEdit(key)}
                        onMouseEnter={this.highlightElementToEdit(key)}
                        onMouseLeave={this.highlightElementToEdit(key)}
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
    );
  };
}

export default ShowUsersList;
