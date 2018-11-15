import React from "react";
import TodoItems from "../TodoItems";
import "./TodoList.css";
import "./TodoList.scss";
import { Container, Row, Col, Input } from "mdbreact";
//import {reduxForm, Field} from "redux-form";
import Loader from 'react-loaders';


const TodoList = ({deleteItem, findPending, items, isLoading, isError}) =>
  <Container>
    <Row className="mt-4">
      <Col lg="3">
      <form>
        <div>
          <Input
            label="Znajdź zawodnika"
            onChange={({ target }) => findPending(target.value)} //{({ target }) => getList(target.value) }
            group
            type="text"
            validate
            error="wrong"
            success="right"
          />
        </div>
      </form>
      </Col>
      <Col lg="9">
        {isLoading && <Loader type="ball-clip-rotate-multiple" />}
        {isError && <p>Wystąpił błąd podczas pobierania danych!!!</p>}
        {Object.values(items).length > 0 && <TodoItems entries={items} deleteItem={deleteItem}/>}
      </Col>
    </Row>
  </Container>

export default TodoList;
