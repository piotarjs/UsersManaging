import React from "react";
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './index.css';
import AddUserToFirebase from "./components/AddUserToFirebase";
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
//import module from './module';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import {base, storage} from './firebase';

import { createBrowserHistory } from 'history'
//import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import createRootReducer from './module'
import { Route, Switch } from 'react-router' // react-router v4
import { ConnectedRouter } from 'connected-react-router'




const history = createBrowserHistory();


const store = createStore(
  createRootReducer(history),
  composeWithDevTools(
    applyMiddleware(
      thunk.withExtraArgument({base, storage}),
      routerMiddleware(history)
    ),
  ),
);

const List = () => (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
          <Switch>
            <Route exact path="/" component={AddUserToFirebase}/>
            <Route path="/:key" component={AddUserToFirebase} />
          </Switch>
        </div>
      </ConnectedRouter>
    </Provider>
  )
  render(<List />, document.querySelector("#container"));