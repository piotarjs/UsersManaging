import 'bootstrap-css-only/css/bootstrap.min.css';
import { ConnectedRouter, routerMiddleware } from 'connected-react-router';
import 'font-awesome/css/font-awesome.min.css';
import { createBrowserHistory } from 'history';
import 'mdbreact/dist/css/mdb.css';
import * as React from "react";
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { base, storage } from './database';
import './index.css';
import createRootReducer, { MAIN_URL } from './module';
import AddUserToFirebase from "./routes/AddUserToFirebase";



const history = createBrowserHistory();
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  createRootReducer(history),
  composeEnhancers(
    applyMiddleware(
      thunk.withExtraArgument({ base, storage }),
      routerMiddleware(history)
    ),
  )
);

const List = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Switch>
          <Route path={`/${MAIN_URL}/:key?/:action?`} component={AddUserToFirebase} />
        </Switch>
      </div>
    </ConnectedRouter>
  </Provider>
)

render(<List />, document.querySelector("#container"));
