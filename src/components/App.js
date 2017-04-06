import React, {
  Component,
  PropTypes,
} from 'react';
import Registration from './registration/registration';

class App extends Component {
  render() {
    return (
      <div>
        <Registration />
      </div>
    );
  }
}

App.propTypes = {};
App.defaultProps = {};

export default App;
