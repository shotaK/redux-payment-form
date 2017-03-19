import React, {
  Component,
  PropTypes,
} from 'react';
import {Field, reduxForm} from 'redux-form'
import get from 'lodash.get';
import has from 'lodash.has';

import creditCardType, { getTypeInfo, types as CardType } from 'credit-card-type';
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

const getCardType = (detectedCreditCard) => {
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
  const detectedCreditCard = getCardType(creditCardType(value));

  if (!detectedCreditCard) {
    return 'Please enter a valid credit card number.';
  }

  if (has(detectedCreditCard, 'lengths') && detectedCreditCard.lengths.indexOf(value.length) == -1) {
    return 'Credit card number contains invalid number of characters.';
  }
};

const validate = values => {
  const errors = {};

  errors.firstName = validateTextField(values.firstName);
  errors.lastName = validateTextField(values.lastName);
  errors.email = validateEmail(values.email);
  errors.city = isRequired(values.city);
  errors.address = isRequired(values.address);
  errors['state-province'] = isRequired(values['state-province']);
  errors.zip = validateZip(values.zip);
  errors.city = isRequired(values.city);
  errors.country = isRequired(values.country);
  errors.country = isRequired(values.country);
  errors['card-number'] = validateCreditCard(values['card-number']);
  errors['name-on-card'] = isRequired(values['name-on-card']);

  return errors;
};

const renderCreditCardPictures = (supportedCards, cardTypeName) => supportedCards.map((creditCard, index) => (cardTypeName === creditCard.name && <img key={index} src={creditCard.image} alt={cardTypeName} />));

const renderCreditCardField = ({input, label, type, meta: {touched, error, warning}}) => {
  const detectedCreditCard = creditCardType(input.value);
  const cardTypeName = get(getCardType(detectedCreditCard), 'type');

  return (<div className={`form-group ${touched && error && `has-error`}`}>
    <label htmlFor={label} className="col-lg-3 control-label">{label}</label>
    <div className="col-lg-7">
      <input {...input} placeholder={label} type={type} className="form-control" id={label}/>
      {touched && ((error && <span className="help-block">{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
    <div className="col-lg-2">
      {renderCreditCardPictures(supportedCards, cardTypeName)}
    </div>
  </div>)
};

const renderTextFieldFull = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div className={`form-group ${touched && error && `has-error`}`} >
    <label htmlFor={label} className="col-lg-3 control-label">{label}</label>
    <div className="col-lg-9">
      <input {...input} placeholder={label} type={type} className="form-control" id={label}/>
      {touched && ((error && <span className="help-block">{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
);

const renderSelectFieldFull = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div className={`form-group ${touched && error && `has-error`}`}>
    <label htmlFor={label} className="col-lg-3 control-label">{label}</label>
    <div className="col-lg-9">
      <Field name="country" component="select" className="form-control" id={label}>
        <option value="">Select a country...</option>
        <option value="USA">USA</option>
        <option value="Germany">Germany</option>
        <option value="UK">UK</option>
      </Field>
      {touched && ((error && <span className="help-block">{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
);

@reduxForm({
  form: 'registration',
  validate
})
class RegistrationForm extends Component {
  render() {
    const {handleSubmit, pristine, reset, submitting} = this.props;
    return (
      <form onSubmit={handleSubmit} className="form-horizontal payment-form">
        <fieldset>
          <legend>Payment Information</legend>
          <Field name="firstName" type="text" label="First Name" component={renderTextFieldFull} />
          <Field name="lastName" type="text" label="Last Name" component={renderTextFieldFull} />
          <Field name="email" type="email" label="Email" component={renderTextFieldFull} />
          <Field name="address" type="text" label="Address" component={renderTextFieldFull} />
          <Field name="city" type="text" label="City" component={renderTextFieldFull} />
          <Field name="state-province" type="text" label="State/Province" component={renderTextFieldFull} />
          <Field name="zip" type="text" label="Zip" component={renderTextFieldFull} />
          <Field name="country" type="select" label="Country" component={renderSelectFieldFull} />
          <hr/>
          <Field name="card-number" type="text" label="Card Number" component={renderCreditCardField}  />
          <Field name="name-on-card" type="text" label="Name on card" component={renderTextFieldFull} />
          <Field name="expiry-date" type="text" label="Expiry Date" placeholder="MM/YY" component={renderTextFieldFull} />
        </fieldset>
      </form>
    );
  }
}

RegistrationForm.propTypes = {};
RegistrationForm.defaultProps = {};

export default RegistrationForm;
