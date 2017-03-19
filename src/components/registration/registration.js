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
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-lg-offset-3">
            <div className="well bs-component">
              <RegistrationForm onSubmit={this.handleSubmit} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Registration.propTypes = {};
Registration.defaultProps = {};

export default Registration;
