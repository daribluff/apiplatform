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
      <label htmlFor={`review_${data.input.name}`} className="form-control-label">{data.input.name}</label>
      <input {...data.input} type={data.type} step={data.step} required={data.required} placeholder={data.placeholder} id={`review_${data.input.name}`}/>
      {isInvalid && <div className="invalid-feedback">{data.meta.error}</div>}
    </div>;
  }

  render() {
    const { handleSubmit } = this.props;

    return <form onSubmit={handleSubmit}>
      <Field component={this.renderField} name="rating" type="number" placeholder="The rating of this review (between 0 and 5)." />
      <Field component={this.renderField} name="body" type="text" placeholder="the body of the review." />
      <Field component={this.renderField} name="author" type="text" placeholder="The author of the review." />
      <Field component={this.renderField} name="publicationDate" type="dateTime" placeholder="The date of publication of this review." />
      <Field component={this.renderField} name="book" type="text" placeholder="The book this review is about." />

        <button type="submit" className="btn btn-success">Submit</button>
      </form>;
  }
}

export default reduxForm({form: 'review', enableReinitialize: true, keepDirtyOnReinitialize: true})(Form);
