import { Container, Row } from "mdbreact";
import * as React from 'react';
import { Action, ActionCreator } from 'redux'

interface User{
  user:{
    firstName: string,
    key: string,
    secondName: string,
    url: string
  }
  redirect: ActionCreator<Action>
}

const About : React.SFC<User> = ( {user, redirect }) =>
  <Container>
    <button type="submit" className="btn btn-success" onClick={() => redirect('/')}>Powrót</button>
    {user &&
    <Row className="py-4 justify-content-center">
      <img
        src={user.url}
        alt="Zdjęcie profilowe"
        className="rounded-circle w-75 h-75"
      />
      <h4 className="font-weight-bold mb-3">{user.firstName} {user.secondName}</h4>
    </Row>}
  </Container>


export default About;