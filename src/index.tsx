import 'bootstrap-css-only/css/bootstrap.min.css';
import { ConnectedRouter, routerMiddleware } from 'connected-react-router';
import 'font-awesome/css/font-awesome.min.css';
import { createBrowserHistory } from 'history';
import 'mdbreact/dist/css/mdb.css';
import * as React from "react";
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router'; 
import { applyMiddleware, createStore } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import AddUserToFirebase from "./components/AddUserToFirebase";
import { base, storage } from './database';
import './index.css';
import createRootReducer from './module';



const history = createBrowserHistory();


const store = createStore(
  createRootReducer(history),
  applyMiddleware(
    thunk.withExtraArgument({base, storage}),
    routerMiddleware(history)
  ),
);

const List = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Switch>
          <Route path={'/:key?'}  component={AddUserToFirebase} />
        </Switch>
      </div>
    </ConnectedRouter>
  </Provider>
)

render(<List />, document.querySelector("#container"));
