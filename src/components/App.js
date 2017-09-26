import React, {
  Component
} from 'react';
import {Provider} from 'react-redux'

import Payment from './payment/payment';
import configureStore from '../redux/common/configureStore';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Payment />
      </Provider>
    );
  }
}

App.propTypes = {};
App.defaultProps = {};

export default App;
