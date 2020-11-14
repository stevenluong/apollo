import React from 'react';
import ReactDOM from 'react-dom';
import './Common/index.css';
import App from './Common/App';
import store from './Common/store';

import * as serviceWorker from './Common/serviceWorker';
//import { BrowserRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>,
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
