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
import * as firebase from "firebase";


// --------Przygotowanie bazy danych--------
const config = {
  apiKey: "AIzaSyDaBb-y1E-RB70QGIYnyz2xI_8ZDkhoC1c",
  authDomain: "reactlistwithfirebase.firebaseapp.com",
  databaseURL: "https://reactlistwithfirebase.firebaseio.com",
  projectId: "reactlistwithfirebase",
  storageBucket: "reactlistwithfirebase.appspot.com",
  messagingSenderId: "164262586929"
};
const app = firebase.initializeApp(config);
const prepareFirebase = app.database().ref('users');

//--------------------------------------------

const store = createStore(
    module,
    composeWithDevTools(
      applyMiddleware(thunk.withExtraArgument(prepareFirebase))
    )
);

const List = () => (
    <Provider store={store}>
      <AddUserToFirebase/>
    </Provider>
  )
  render(<List />, document.querySelector("#container"));