import { Container, Row } from 'mdbreact';
import * as React from 'react';
import { Redirect } from '../../interfaces';

interface Props {
  user: {
    firstName: string,
    key: string,
    secondName: string,
    url: string
  },
  redirect: Redirect['redirect']
};

const About: React.FunctionComponent<Props> = ({ user: { firstName, secondName, url }, redirect }) =>
  <Container>
    <button type="submit" className="btn btn-success" onClick={() => redirect('/')}>Powrót</button>
    {(firstName || secondName || url) &&
      <Row className="py-4 justify-content-center">
        <img
          src={url}
          alt="Zdjęcie profilowe"
          className="rounded-circle w-75 h-75"
        />
        <h4 className="font-weight-bold mb-3">{firstName} {secondName}</h4>
      </Row>}
  </Container>

export default About;
