import { Card, CardBody, Col, Container, Row } from 'mdbreact';
import * as React from 'react';
import Loader from 'react-loaders';
import { match as Match } from 'react-router';
import { Action, ActionCreator } from 'redux';
import { UserDetails, UsersList } from '../../interfaces';
import './AddUserToFirebase.css';
import './AddUserToFirebase.scss';
import About from './components/About';
import AddUserForm from './components/AddUserForm';
import EditUser from './components/EditUser';
import ShowUsersList from './components/ShowUsersList';

interface Props {
  user: UserDetails['user'],
  users: UsersList['users'],
  usersFiltered: UsersList['users'],
  match: Match<{ key: string, action: string }>,
  isError: boolean,
  isLoading: boolean,
  editUser: ActionCreator<Action>,
  filterUsersList: ActionCreator<Action>,
  getUserFromFirebase: ActionCreator<Action>
}

class AddUserToFirebase extends React.Component<Props> {
  public componentDidMount() {
    this.props.getUserFromFirebase();
  }
  public componentDidUpdate() {
    const { editUser, match, users } = this.props;
    if (match.params.key && users) {
      editUser(users[match.params.key]);
    }
  }
  public filterList =(users: UsersList['users']) => ({ target: { value } }: React.ChangeEvent<HTMLInputElement> ) => {
    this.props.filterUsersList(users, value);
  }
  public render() {
    const { users, usersFiltered, isLoading, isError, match } = this.props;
    return (
      <Container>
        <Row className="mt-4">
          <Col lg="8">
            <form className="md-form">
              <input
                name="filerList"
                type="text"
                className="form-control mb-2"
                placeholder="Wpisz poszukiwanego użytkownika"
                onChange={this.filterList(users)}
              />
            </form>
            {isLoading
              ? <Row className="justify-content-center mt-5"><Loader type="ball-clip-rotate-multiple" active={true} /></Row>
              : isError
                ? <p>Wystąpił błąd podczas pobierania danych!!!</p>
                : usersFiltered !== null
                  ? Object.values(usersFiltered).length > 0
                    ? <ShowUsersList />
                    : <h2>Brak listy do wyświetlenia</h2>
                  : <h2>Brak listy do wyświetlenia</h2>
            }
          </Col>
          <Col lg="4" className="mt-3 mt-lg-0">
            <Card>
              <CardBody>
                {match.params.key
                  ? match.params.action && match.params.action === 'edit'
                    ? <EditUser />
                    : <About />
                  : <AddUserForm />
                }
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default AddUserToFirebase;
