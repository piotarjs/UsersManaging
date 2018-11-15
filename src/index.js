import React from "react";
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './index.css';
import TodoList from "./components/TodoList";
//import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import module from './module';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
//import axios from 'axios';
import createSagaMiddleware from 'redux-saga';
import { getListSaga } from './module'; // bez { } nie działało - nie widziało akcji
 

/*const api =  axios.create({
  //baseURL: process.env.REACT_APP_API_URL
  baseURL: 'https://api.github.com'
});*/

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    module,
    composeWithDevTools(
      applyMiddleware(sagaMiddleware /*, thunk.withExtraArgument(api)*/)
    )
);

sagaMiddleware.run(getListSaga);

const List = () => (
    <Provider store={store}>
      <TodoList/>
    </Provider>
  )
  render(<List />, document.querySelector("#container"));