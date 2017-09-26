import React, {
  Component,
} from 'react';

import PaymentForm from './payment-form';

class Payment extends Component {
  render() {
    return (
      <div className="container payment">
        <div className="row">
          <div className="col-lg-6 col-lg-offset-3">
            <div className="well bs-component">
              <PaymentForm />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Payment;
