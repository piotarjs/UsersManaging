import React, {Component} from "react";
import ShowUsersList from "../ShowUsersList";
import AddUserForm from "../AddUserForm";
import About from "../About";
import "./AddUserToFirebase.css";
import "./AddUserToFirebase.scss";
import { Container, Row, Col, Card, CardBody } from "mdbreact";
import {reduxForm} from "redux-form";
import Loader from 'react-loaders';



class AddUserToFirebase extends Component{

  componentDidMount(){
    this.props.getUserFromFirebase();
  }


  
  render(){
    const {users, isLoading, isError, handleSubmit, addUserToFirebase, redirect, match} = this.props;
    return(
      <Container>
        <Row className="mt-4">
          <Col lg="8">
            {isLoading && <Loader type="ball-clip-rotate-multiple" />}
            {isError && <p>Wystąpił błąd podczas pobierania danych!!!</p>}
            {Object.values(users).length > 0 && <ShowUsersList entries={users} redirect={redirect}/>}
          </Col>
          <Col lg="4">
            <Card>
              <CardBody>
                {match.params.key? 
                <About redirect={redirect} user={users[match.params.key]}/> 
                : 
                <AddUserForm handleSubmit={handleSubmit} addUserToFirebase={addUserToFirebase}/>}
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
