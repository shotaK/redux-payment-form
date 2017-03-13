import React, {
  Component,
  PropTypes,
} from 'react';
import RegistrationForm from './registration-form';

class Registration extends Component {
  handleSubmit = (values) => {
    console.log(values);
  };
  render() {
    return (
      <div>
        <RegistrationForm onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

Registration.propTypes = {};
Registration.defaultProps = {};

export default Registration;
