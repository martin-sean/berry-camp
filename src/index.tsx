import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import './index.css';

// Main App
import BerryCamp from './BerryCamp';

// React Router
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { Provider } from 'react-redux';
import store from './redux/store';

const history = createBrowserHistory();

const Root = () => (
  <React.StrictMode>
    <Provider store={ store }>
      <Router history={ history }>
        <BerryCamp />
      </Router>
    </Provider>
  </React.StrictMode>
);

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
