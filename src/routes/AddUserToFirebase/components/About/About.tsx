import { MDBBtn } from "mdbreact";
import { Col, Container, Row } from 'mdbreact';
import * as React from 'react';
import { Action, ActionCreator } from 'redux';
import { UserDetails } from '../../../../interfaces';

interface Props {
  user: UserDetails['user'],
  redirect: ActionCreator<Action>,
  deleteUserFromFirebase: ActionCreator<Action>, 
  highligthChosenElement: ActionCreator<Action>
};

class About extends React.Component<Props>{
  public onHighlightBack = () => {
    this.props.highligthChosenElement();
    this.props.redirect('/UsersManaging');
  }
  public deleteUser = (userKey: string) => () => {
    this.props.deleteUserFromFirebase(userKey)
  }
  public render(){
    const { user: { firstName, secondName, key, url } } = this.props
    return(
      <Container>
        <Row className="justify-content-center">
          <MDBBtn color="dark" size="sm" type="submit" onClick={this.onHighlightBack}>Powrót</MDBBtn>
          <MDBBtn color="danger" size="sm" type="submit" onClick={this.deleteUser(key)}>Usuń</MDBBtn>
        </Row>
        {(firstName && secondName && url) &&
          <Row className="py-4 justify-content-center">
            <Col xs="6" sm="4" md="6">
              <img
                src={url}
                alt="Zdjęcie profilowe"
                className="rounded-circle img-fluid"
              />
            </Col>
            <Col xs="12">
              <h4 className="font-weight-bold my-3 text-center">{firstName} {secondName}</h4>
            </Col>
          </Row>}
      </Container>
    );
  }; 
}

export default About;
