import React, {Component} from "react";
import ShowUsersList from "../ShowUsersList";
import UploadFile from "../UploadFile";
import "./AddUserToFirebase.css";
import "./AddUserToFirebase.scss";
import { Container, Row, Col, Card, CardBody } from "mdbreact";
import {reduxForm, Field} from "redux-form";
import Loader from 'react-loaders';


class AddUserToFirebase extends Component{

  
  componentDidMount(){
    this.props.getUserFromFirebase();
  }
  
  onSubmit(data){
    this.props.addUserToFirebase(data);
  }

  render(){
    const {users, isLoading, isError, handleSubmit} = this.props;
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
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                  <div>
                    <Field name="firstName" component='input' className="mb-2" placeholder="Imię" type="text" />
                  </div>
                  <div>
                    <Field name="secondName" component='input' className="mb-2" placeholder="Nazwisko" type="text" />
                  </div>
                  <div>
                    <Field name="uploadFile" component={UploadFile} />
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
