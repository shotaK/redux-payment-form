import React from 'react';
import {Provider} from 'react-redux'

import PaymentForm from './payment/payment-form';
import configureStore from '../redux/common/configureStore';

const store = configureStore();

const App = (props) => (
  <Provider store={store}>
    <PaymentForm {...props} />
  </Provider>
);

export default App;
