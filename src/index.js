import React from "react";
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './index.css';
import AddUserToFirebase from "./components/AddUserToFirebase";
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import module from './module';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import {base, storage} from './firebase';


const store = createStore(
    module,
    composeWithDevTools(
      applyMiddleware(thunk.withExtraArgument({base, storage}))
    )
);

const List = () => (
    <Provider store={store}>
      <AddUserToFirebase/>
    </Provider>
  )
  render(<List />, document.querySelector("#container"));