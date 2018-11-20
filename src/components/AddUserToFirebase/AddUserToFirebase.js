import React, {Component} from "react";
import ShowUsersList from "../ShowUsersList";
import "./AddUserToFirebase.css";
import "./AddUserToFirebase.scss";
import styles from "./AddUserToFirebase.css";
import CSSModules from 'react-css-modules';
import { Container, Row, Col, Card, CardBody } from "mdbreact";
import {reduxForm, Field} from "redux-form";
import Loader from 'react-loaders';


class AddUserToFirebase extends Component{
  componentDidMount(){
    this.props.getUserFromFirebase();
  }
  render(){
    const {users, isLoading, isError, handleSubmit, addUserToFirebase} = this.props;
    return(
      <Container>
        <Row className="mt-4">
          <Col lg="8">
            {isLoading && <Loader type="ball-clip-rotate-multiple" />}
            {isError && <p>Wystąpił błąd podczas pobierania danych!!!</p>}
            {Object.values(users).length > 0 && <ShowUsersList entries={users}/>}
          </Col>
          <Col lg="4">
            <Card>
              <CardBody>
                <p className="h4 text-center py-4">Wpisz dane użytkownika</p>
                <form onSubmit={handleSubmit(addUserToFirebase)}>
                  <div>
                    <Field name="firstName" component='input' placeholder="Imię" type="text" />
                  </div>
                  <div>
                    <Field name="secondName" component='input' placeholder="Nazwisko" type="text" />
                  </div>
                  <button type="submit">Zapisz</button>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

const AddUserToFirebaseWithCSS = CSSModules(AddUserToFirebase, styles);

export default reduxForm({
  form: 'List'
})(AddUserToFirebaseWithCSS);
