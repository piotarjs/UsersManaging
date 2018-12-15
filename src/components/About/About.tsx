import { MDBBtn } from "mdbreact";
import { Container, Row } from 'mdbreact';
import * as React from 'react';
import { Action, ActionCreator } from 'redux';
import { UserDetails } from '../../interfaces';

interface Props {
  user: UserDetails['user'],
  redirect: ActionCreator<Action>,
  deleteUserFromFirebase: ActionCreator<Action>, 
  highligthChosenElement: ActionCreator<Action>
};

const About: React.FunctionComponent<Props> = ({ user: { firstName, secondName, url, key }, redirect, deleteUserFromFirebase, highligthChosenElement }) => {
  const onHighlightBack = () => {
    highligthChosenElement();
    redirect('/');
  } 
  return (
    <Container>
      <Row className="justify-content-center">
        <MDBBtn color="dark" size="sm" type="submit" onClick={onHighlightBack}>Powrót</MDBBtn>
        <MDBBtn color="danger" size="sm" type="submit" onClick={() => deleteUserFromFirebase(key)}>Usuń</MDBBtn>
      </Row>
      {(firstName && secondName && url) &&
        <Row className="py-4 justify-content-center">
          <img
            src={url}
            alt="Zdjęcie profilowe"
            className="rounded-circle w-75 h-75"
          />
          <h4 className="font-weight-bold mb-3">{firstName} {secondName}</h4>
        </Row>}
    </Container>
  );
}


export default About;
