import React, {Component} from "react";
//import ShowUsersList from "../ShowUsersList";
import "./AddUserToFirebase.css";
import "./AddUserToFirebase.scss";
import { Container, Row, Col, Card, CardBody } from "mdbreact";
import {reduxForm, Field} from "redux-form";
//import Loader from 'react-loaders';



/*
const AddUserToFirebase = ({addUserToFirebase, handleSubmit}) =>
  <Container>
    <Row className="mt-4">
      <Col lg="8">
      {
        /*{isLoading && <Loader type="ball-clip-rotate-multiple" />}
        {isError && <p>Wystąpił błąd podczas pobierania danych!!!</p>}
        {Object.values(items).length > 0 && <ShowUsersList entries={items} deleteItem={deleteItem}/>}*/
      /*}
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
  */

class AddUserToFirebase extends Component{
  
  componentDidMount(){
    this.props.getUserFromFirebase();
  }
  render(){
    return(
      <Container>
        <Row className="mt-4">
          <Col lg="8">
           
          </Col>
          <Col lg="4">
            <Card>
              <CardBody>
                <p className="h4 text-center py-4">Wpisz dane użytkownika</p>
                <form onSubmit={this.props.handleSubmit(this.props.addUserToFirebase)}>
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

export default reduxForm({
  form: 'List'
})(AddUserToFirebase);
