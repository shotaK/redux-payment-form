# redux-payment-form

React Redux payment form with advanced credit card and security code detection/validation (based on [redux-form](http://redux-form.com) library)

## Features
 * Supports the most of credit/debit cards used today (Visa, Mastercard, American Express, Discover and so on)
 * Credit/Debit card detection.
 * Security code (CVV, CDI and so on) detection based on credit card number.
 * Instant validation of the above mentioned fields
 
## Installation:
```npm install redux-form redux-payment-form --save```

## Usage

```javascript
import React, { Component } from 'react';
import PaymentForm from 'redux-payment-form';

class ExampleComp extends Component {
  render() {
    return (
      <div>
        <PaymentForm />
      </div>
    );
  }
}

export default ExampleComp;
```

Optional: the library was designed with Bootstrap 3, but Bootstrap styles are not included, so if you want the form to be styled instantly just import bootstrap styles.



## Credit/debit card detection
![alt text](http://res.cloudinary.com/shota-karkashadze/image/upload/c_scale,w_500/v1506182406/visa.png)
![alt text](http://res.cloudinary.com/shota-karkashadze/image/upload/c_scale,w_500/v1506182406/AMEX.png)

## Validation
![alt text](http://res.cloudinary.com/shota-karkashadze/image/upload/c_scale,w_500/v1506182788/Screen_Shot_2017-09-23_at_8.06.01_PM_rvvbsv.png)

## Demo
You can see demo here: https://shotak.github.io/redux-payment-form/