import React from 'react';
import { Container, Row } from "mdbreact";

const About = ( {user, redirect }) =>
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