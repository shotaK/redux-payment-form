import React, {
  Component,
} from 'react';
import {Field, reduxForm, FormSection, formValueSelector} from 'redux-form'
import get from 'lodash/get';
import has from 'lodash/has';
import { connect } from 'react-redux';

import creditCardType, { types as CardType } from 'credit-card-type';
import visa from '../../assets/images/visa.png';
import mastercard from '../../assets/images/mastercard.png';
import americanExpress from '../../assets/images/american_express.png';
import dinnersClub from '../../assets/images/dinners_club.png';
import discover from '../../assets/images/discover.png';
import jcb from '../../assets/images/jcb.png';
import unionpay from '../../assets/images/unionpay.png';
import maestro from '../../assets/images/maestro.png';

const supportedCards = [
  {
    name: CardType.VISA,
    image: visa
  },
  {
    name: CardType.MASTERCARD,
    image: mastercard
  },
  {
    name: CardType.AMERICAN_EXPRESS,
    image: americanExpress
  },
  {
    name: CardType.DINERS_CLUB,
    image: dinnersClub
  },
  {
    name: CardType.DISCOVER,
    image: discover
  },
  {
    name: CardType.JCB,
    image: jcb
  },
  {
    name: CardType.UNIONPAY,
    image: unionpay
  },
  {
    name: CardType.MAESTRO,
    image: maestro
  }
];

const generateNumberArray = (lowEnd, highEnd) => {
  const list = [];
  let i;
  for (i = lowEnd; i <= highEnd; i++) {
    list.push(i);
  }
  return list;
};

const monthNames = [ "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December" ];
const expiryYears = generateNumberArray(new Date().getFullYear(), 2031);

const getDetectedCard = (detectedCreditCard) => {
  if (detectedCreditCard.length === 1) {
    return detectedCreditCard[0]
  }
};

const isRequired = (value) => {
  if (!value) {
    return  'Required';
  }
};

const validateTextField = value => {
  if (!value) {
    return  'Required';
  } else if (value.length > 15) {
    return 'Must be 15 characters or less';
  }
};

const validateEmail = (value) => {
  if (!value) {
    return  'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return 'Invalid email address';
  }
};

const validateZip = (value) => {
  if (!value) {
    return  'Required';
  } else if (!/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(value)) {
    return 'Invalid Zip code';
  }
};

const validateCreditCard = (value) => {
  if (!value) {
    return 'Required';
  }
  const detectedCreditCard = getDetectedCard(creditCardType(value));

  if (!detectedCreditCard) {
    return 'Please enter a valid credit card number.';
  }

  if (has(detectedCreditCard, 'lengths') && detectedCreditCard.lengths.indexOf(value.length) === -1) {
    return 'Credit card number contains invalid number of characters.';
  }
};

const validateSecurityCode = (value, securityCodeLength) => {
  if (!value) {
    return 'Required';
  }

  if (get(value, 'length') !== securityCodeLength || get(value, 'length') === 0) {
    return 'Security code length not matched'
  }

  if (isNaN(value)) {
    return 'Must only contain numbers'
  }
};

const validate = values => {
  const getUserInfoSectionValue = (fieldName) => get(values, `userInfo.${fieldName}`);
  const getPaymentSectionValue = (fieldName) => get(values, `payment.${fieldName}`);

  const detectedCreditCard = creditCardType(getPaymentSectionValue('cardNumber'));
  const securityCodeLength = get(getDetectedCard(detectedCreditCard), 'code.size');

  return {
    userInfo: {
      firstName: validateTextField(getUserInfoSectionValue('firstName')),
      lastName: validateTextField(getUserInfoSectionValue('lastName')),
      email: validateEmail(getUserInfoSectionValue('email')),
      city: isRequired(getUserInfoSectionValue('city')),
      address: validateEmail(getUserInfoSectionValue('address')),
      stateProvince: isRequired(getUserInfoSectionValue('stateProvince')),
      zip : validateZip(getUserInfoSectionValue('zip')),
      country: isRequired(getUserInfoSectionValue('country'))
    },
    payment: {
      cardNumber: validateCreditCard(getPaymentSectionValue('cardNumber')),
      nameOnCard: isRequired(getPaymentSectionValue('nameOnCard')),
      expiryMonth: isRequired(getPaymentSectionValue('expiryMonth')),
      expiryYear: isRequired(getPaymentSectionValue('expiryYear')),
      securityCode: validateSecurityCode(getPaymentSectionValue('securityCode'), securityCodeLength)
    }
  };
};

const renderCreditCardPictures = (supportedCards, cardTypeName) => supportedCards.map((creditCard, index) => (cardTypeName === creditCard.name && <img key={index} src={creditCard.image} alt={cardTypeName} />));

const renderCreditCardField = ({input, label, type, meta: {touched, error, warning}}) => {
  const detectedCreditCard = getDetectedCard(creditCardType(input.value));
  const cardTypeName = get(detectedCreditCard, 'type');
  const cardNiceType = get(detectedCreditCard, 'niceType');

  return (
    <div className={`form-group ${touched && error && `has-error`}`}>
      <label htmlFor={label} className="col-lg-3 control-label">{label}</label>
      <div className="col-lg-6">
        <input {...input} placeholder={label} type={type} className="form-control" id={label}/>
        {touched && ((error && <span className="help-block">{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
      <div className="col-lg-3 reg-card-number">
        <div className="reg-card-number__content">
          {renderCreditCardPictures(supportedCards, cardTypeName)}
          <p className="reg-card-number__text">{cardNiceType}</p>
        </div>
      </div>
    </div>)
};

const renderDateFieldFull = ({ input, label, type, meta: { touched, error, warning }, options, valueInterceptor } ) => {
  return (
    <div className={`form-group ${touched && error && `has-error`}`}>
      <label htmlFor={label} className="col-lg-3 control-label">{label}</label>
      <div className="col-lg-3">
        <select className="form-control" {...input}>
          <option/>
          {
            options.map((option, index) => <option key={index} value={valueInterceptor(index)}>{option}</option>)
          }
        </select>
        {touched && ((error && <span className="help-block">{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    </div>
  );
};

const renderTextField = ({ input, label, type, meta: { touched, error, warning }, fieldGridSize }) => (
  <div className={`form-group ${touched && error && `has-error`}`} >
    <label htmlFor={label} className="col-lg-3 control-label">{label}</label>
    <div className={fieldGridSize ? `col-lg-${fieldGridSize}` : 'col-lg-9'}>
      <input {...input} placeholder={label} type={type} className="form-control" id={label}/>
      {touched && ((error && <span className="help-block">{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
);

const selector = formValueSelector('payment-form');

@reduxForm({
  form: 'payment-form',
  validate
})
@connect(
  state => {
    return {
      cardNumber: selector(state, 'payment.cardNumber')
    }
  }
)
class PaymentForm extends Component {
  render() {
    const {handleSubmit, cardNumber} = this.props;
    const detectedCreditCard = creditCardType(cardNumber);
    const securityCodeName = get(getDetectedCard(detectedCreditCard), 'code.name');

    return (
      <form onSubmit={handleSubmit} className="form-horizontal payment-form">
        <fieldset>
          <legend>Payment Information</legend>
          <FormSection name="payment">
            <Field name="cardNumber" type="text" label="Card Number" component={renderCreditCardField}  />
            <Field name="nameOnCard" type="text" label="Name on card" fieldGridSize="6" component={renderTextField} />
            <Field name="expiryMonth" type="text" label="Expiry Month" options={monthNames} valueInterceptor={(index) => index+1} component={renderDateFieldFull} />
            <Field name="expiryYear" type="text" label="Expiry Year" options={expiryYears} valueInterceptor={(index) => index} component={renderDateFieldFull} />
            <Field name="securityCode" type="text" label={securityCodeName ? securityCodeName : 'Security Code'} fieldGridSize="4" component={renderTextField} />
          </FormSection>
        </fieldset>
      </form>
    );
  }
}

PaymentForm.propTypes = {};
PaymentForm.defaultProps = {};

export default PaymentForm;
