import React, {
  Component,
} from 'react';
import RegistrationForm from './registration-form';

class Registration extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-lg-offset-3">
            <div className="well bs-component">
              <RegistrationForm />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Registration;
