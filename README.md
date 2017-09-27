# redux-payment-form

React Redux payment form with advanced credit card and security code detection/validation (based on [redux-form](http://redux-form.com) library)

## Features
 * Supports the most of credit/debit cards used today (Visa, Mastercard, American Express, Discover and so on)
 * Credit/Debit card detection.
 * Security code (CVV, CDI and so on) detection based on credit card number.
 * Instant validation of the above-mentioned fields
 
## Installation:
1. ```npm install redux-form redux-payment-form --save```
2. Optional: Import Bootstrap CSS if you want the form to be formatted nicely (it was not included in the library to give users more flexibility to style the form)

## Usage

```javascript
import React, {Component} from 'react';
import PaymentForm from 'redux-payment-form';

class ExampleComp extends Component {

  onCardChange(paymentForm) {
    console.log("payment form updated:", paymentForm)
    /*
    payment form updated: {
       "card":{  
          "cardNumber":"342987115456829",
          "nameOnCard":"user name",
          "expiryMonth":"1",
          "expiryYear":"14",
          "securityCode":"1234"
       },
       "valid":true
    }
    */
  }

  render() {
    return (
      <div>
        <PaymentForm
          onCardChange={this.onCardChange}
          acceptedCards={['visa', 'american-express']}
        />
      </div>
    );
  }
}

export default ExampleComp;

```

## Props
* onCardChange {function}: callback function which will be called every time user interacts with form. The passed argument contains user entered card field data and its validity status.
* acceptedCards {array}: limit the accepted cards (e.g. ["visa", "master-card", "american-express", "diners-club", "discover", "jcb", "unionpay", "maestro"]). By default(no prop passed) all the cards are accepted

## Credit/debit card detection
![alt text](http://res.cloudinary.com/shota-karkashadze/image/upload/c_scale,w_500/v1506182406/visa.png)
![alt text](http://res.cloudinary.com/shota-karkashadze/image/upload/c_scale,w_500/v1506182406/AMEX.png)

## Validation
![alt text](http://res.cloudinary.com/shota-karkashadze/image/upload/c_scale,w_500/v1506182788/Screen_Shot_2017-09-23_at_8.06.01_PM_rvvbsv.png)

## Demo
You can see demo here: https://shotak.github.io/redux-payment-form/