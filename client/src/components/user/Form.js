import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class Form extends Component {
  renderField = (data) => {
    data.input.className = 'form-control';

    const isInvalid = data.meta.touched && !!data.meta.error;
    if (isInvalid) {
      data.input.className += ' is-invalid';
      data.input['aria-invalid'] = true;
    }

    if (this.props.error && data.meta.touched && !data.meta.error) {
      data.input.className += ' is-valid';
    }

    return <div className={`form-group`}>
      <label htmlFor={`user_${data.input.name}`} className="form-control-label">{data.input.name}</label>
      <input {...data.input} type={data.type} step={data.step} required={data.required} placeholder={data.placeholder} id={`user_${data.input.name}`}/>
      {isInvalid && <div className="invalid-feedback">{data.meta.error}</div>}
    </div>;
  }

  render() {
    const { handleSubmit } = this.props;

    return <form onSubmit={handleSubmit}>
      <Field component={this.renderField} name="email" type="text" placeholder="" required={true}/>
      <Field component={this.renderField} name="username" type="text" placeholder="" required={true}/>
      <Field component={this.renderField} name="plainPassword" type="text" placeholder="" required={true}/>
      <Field component={this.renderField} name="password" type="text" placeholder="The below length depends on the 'algorithm' you use for encoding
the password, but this works well with bcrypt." />
      <Field component={this.renderField} name="roles" type="text" placeholder="" />

        <button type="submit" className="btn btn-success">Submit</button>
      </form>;
  }
}

export default reduxForm({form: 'user', enableReinitialize: true, keepDirtyOnReinitialize: true})(Form);
