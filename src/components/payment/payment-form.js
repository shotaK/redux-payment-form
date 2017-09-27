import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm, FormSection, formValueSelector} from 'redux-form';
import get from 'lodash.get';
import has from 'lodash.has';
import contains from 'lodash.contains';
import { connect } from 'react-redux';

import creditCardType, { types as CardType } from 'credit-card-type';
import images from './images';

const supportedCards = [
  {
    name: CardType.VISA,
    image: images.visa
  },
  {
    name: CardType.MASTERCARD,
    image: images['master-card']
  },
  {
    name: CardType.AMERICAN_EXPRESS,
    image: images['american-express']
  },
  {
    name: CardType.DINERS_CLUB,
    image: images['diners-club']
  },
  {
    name: CardType.DISCOVER,
    image: images['discover']
  },
  {
    name: CardType.JCB,
    image: images['jcb']
  },
  {
    name: CardType.UNIONPAY,
    image: images['unionpay']
  },
  {
    name: CardType.MAESTRO,
    image: images['maestro']
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

const getDetectedCard = (detectedCreditCard, acceptedCards) => {
  if (detectedCreditCard.length === 1 && isCardSupported(acceptedCards, detectedCreditCard[0].type)) {
    return detectedCreditCard[0]
  }
};

const isCardSupported = (acceptedCards, cardType) => contains(acceptedCards, cardType);

const isRequired = (value) => {
  if (!value) {
    return  'Required';
  }
};

const validateCreditCard = (value, acceptedCards) => {
  if (!value) {
    return 'Required';
  }
  const detectedCreditCard = getDetectedCard(creditCardType(value), acceptedCards);

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

const validate = (values, props) => {
  const getPaymentSectionValue = (fieldName) => get(values, `payment.${fieldName}`);

  const detectedCreditCard = creditCardType(getPaymentSectionValue('cardNumber'));
  const securityCodeLength = get(getDetectedCard(detectedCreditCard, props.acceptedCards), 'code.size');

  return {
    payment: {
      cardNumber: validateCreditCard(getPaymentSectionValue('cardNumber'), props.acceptedCards),
      nameOnCard: isRequired(getPaymentSectionValue('nameOnCard')),
      expiryMonth: isRequired(getPaymentSectionValue('expiryMonth')),
      expiryYear: isRequired(getPaymentSectionValue('expiryYear')),
      securityCode: validateSecurityCode(getPaymentSectionValue('securityCode'), securityCodeLength)
    }
  };
};

const renderCreditCardPictures = (supportedCards, cardTypeName) => supportedCards.map((creditCard, index) => (cardTypeName === creditCard.name && <img key={index} width="40" src={creditCard.image} alt={cardTypeName} />));

const renderCreditCardField = ({input, label, type, meta: {touched, error, warning}, acceptedCards}) => {
  const detectedCreditCard = getDetectedCard(creditCardType(input.value), acceptedCards);
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
        <div className={`reg-card-number__content ${cardTypeName}`}>
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
      payment: {
        cardNumber: selector(state, 'payment.cardNumber'),
        nameOnCard: selector(state, 'payment.nameOnCard'),
        expiryMonth: selector(state, 'payment.expiryMonth'),
        expiryYear: selector(state, 'payment.expiryYear'),
        securityCode: selector(state, 'payment.securityCode'),
      }
    }
  }
)
class PaymentForm extends Component {

  componentWillReceiveProps(nextProps) {
    this.props.onCardChange(
      {
        card: nextProps.payment,
        valid: nextProps.valid,
      }
    );
  }

  render() {
    const {payment, handleSubmit, acceptedCards} = this.props;
    const detectedCreditCard = creditCardType(payment.cardNumber);
    const securityCodeName = get(getDetectedCard(detectedCreditCard, acceptedCards), 'code.name');

    return (
      <form onSubmit={handleSubmit} className="form-horizontal redux-payment-form">
        <fieldset>
          <legend>Payment Information</legend>
          <FormSection name="payment">
            <Field name="cardNumber" type="text" label="Card Number" acceptedCards={acceptedCards} component={renderCreditCardField}  />
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

PaymentForm.propTypes = {
  onCardChange: PropTypes.func,
  acceptedCards: PropTypes.array
};
PaymentForm.defaultProps = {
  onCardChange: () => {},
  acceptedCards: supportedCards.map((card) => card.name)
};

export default PaymentForm;
