import { Card, CardBody, Col, Container, Row } from 'mdbreact';
import * as React from 'react';
import Loader from 'react-loaders';
import { match as Match } from 'react-router';
import { Action, ActionCreator } from 'redux';
import { UsersList } from '../../interfaces';
import About from '../About';
import AddUserForm from '../AddUserForm';
import EditUser from '../EditUser';
import ShowUsersList from '../ShowUsersList';
import './AddUserToFirebase.css';
import './AddUserToFirebase.scss';

interface Props {
  user,
  users: UsersList['users'],
  match: Match<{key: string, action: string}>,
  isError: boolean,
  isLoading: boolean,
  editUser: ActionCreator<Action>,
  getUserFromFirebase: ActionCreator<Action>
}

class AddUserToFirebase extends React.Component<Props> {
  public componentDidMount() {
    this.props.getUserFromFirebase();
  }
  public componentDidUpdate() {
    const { editUser, match, users } = this.props;
    if(match.params.key){
      editUser(users[match.params.key]);
    }
  }
  public render() {
    const { users, isLoading, isError, match } = this.props;
    return (
      <Container>
        <Row className="mt-4">
          <Col lg="8">
            {
              isLoading? <Row className="justify-content-center mt-5"><Loader type="ball-clip-rotate-multiple" active={true} /></Row> :
                isError? <p>Wystąpił błąd podczas pobierania danych!!!</p> :
                  users != null? <ShowUsersList /> : <h2>Brak listy do wyświetlenia</h2>
            }
          </Col>
          <Col lg="4" className="mt-3 mt-lg-0">
            <Card>
              <CardBody>
                {match.params.key
                  ? match.params.action && match.params.action === 'edit'
                    ? <EditUser/>
                    : <About/> 
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
