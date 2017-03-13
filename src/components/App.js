import React, {
  Component,
  PropTypes,
} from 'react';
import Article from './home/article'
import Registration from './registration/registration';

class App extends Component {
  render() {
    return (
      <div>
        <Article />
        <Registration />
      </div>
    );
  }
}

App.propTypes = {};
App.defaultProps = {};

export default App;
