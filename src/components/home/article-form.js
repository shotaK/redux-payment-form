import React, {Component, PropTypes} from 'react';
import { Field, reduxForm } from 'redux-form';

@reduxForm({
  form: 'article',
})
class articleForm extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <Field name="firstName" component="input" type="text"/>
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

articleForm.propTypes = {};
articleForm.defaultProps = {};

export default articleForm;
