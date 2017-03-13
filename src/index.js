import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import App from './components/App';

import './assets/styles/styles.scss';

import configureStore from './redux/common/configureStore';
const store = configureStore();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);