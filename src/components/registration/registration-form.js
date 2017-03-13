import React, {
  Component,
  PropTypes,
} from 'react';
import {Field, reduxForm} from 'redux-form'


const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type}/>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
);

@reduxForm({
  form: 'registration'
})
class RegistrationForm extends Component {
  render() {
    const {handleSubmit, pristine, reset, submitting} = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <div>
            <Field name="firstName" component="input" type="text" placeholder="First Name"/>
          </div>
        </div>
      </form>
    );
  }
}

RegistrationForm.propTypes = {};
RegistrationForm.defaultProps = {};

export default RegistrationForm;
