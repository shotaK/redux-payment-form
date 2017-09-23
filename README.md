# redux-payment-form

React Redux payment form with advanced credit card and security code detection/validation (based on [redux-form](http://redux-form.com) library)

## Installation:
1. ```git clone git@github.com:shotaK/redux-payment-form.git```
2. ```yarn```
3. ```npm start```

Please note that while this an npm module, it is not yet importable directly from node_modules into your code, you may clone the code or copy/paste it from the Github repo. 

## Features
 * Supports the most of credit/debit cards used today (Visa, Mastercard, American Express, Discover and so on)
 * Credit/Debit card detection.
 * Security code (CVV, CDI and so on) detection based on credit card number.
 * Instant validation of the above mentioned fields

## Credit/debit card detection
![alt text](http://res.cloudinary.com/shota-karkashadze/image/upload/c_scale,w_500/v1506182406/visa.png)
![alt text](http://res.cloudinary.com/shota-karkashadze/image/upload/c_scale,w_500/v1506182406/AMEX.png)

## Validation
![alt text](http://res.cloudinary.com/shota-karkashadze/image/upload/c_scale,w_500/v1506182788/Screen_Shot_2017-09-23_at_8.06.01_PM_rvvbsv.png)

## Demo
You can see demo here: https://shotak.github.io/redux-payment-form/