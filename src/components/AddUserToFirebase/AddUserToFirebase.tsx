import { Card, CardBody, Col, Container, Row } from "mdbreact";
import * as React from "react";
import Loader from 'react-loaders';
import { AddUserProps, GetUsersFromFirebase, UsersList } from '../../interfaces';
import About from "../About";
import AddUserForm from "../AddUserForm";
import ShowUsersList from "../ShowUsersList";
import "./AddUserToFirebase.css";
import "./AddUserToFirebase.scss";


class AddUserToFirebase extends React.Component<GetUsersFromFirebase & AddUserProps & UsersList> {
  public componentDidMount(){
    this.props.getUserFromFirebase();
  }
  public render(){
    const {users, isLoading, isError, match } = this.props;
    return(
      <Container>
        <Row className="mt-4">
          <Col lg="8">
            {isLoading && <Loader type="ball-clip-rotate-multiple" active={true} />}
            {isError && <p>Wystąpił błąd podczas pobierania danych!!!</p>}
            {Object.values(users).length > 0 && <ShowUsersList/>}
          </Col>
          <Col lg="4">
            <Card>
              <CardBody>
                {match.params.key? 
                <About user={users[match.params.key]}/> 
                : 
                <AddUserForm/>}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default AddUserToFirebase;
