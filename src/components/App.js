import React, {
  Component,
  PropTypes,
} from 'react';
import Payment from './payment/payment';

class App extends Component {
  render() {
    return (
      <div>
        <Payment />
      </div>
    );
  }
}

App.propTypes = {};
App.defaultProps = {};

export default App;
