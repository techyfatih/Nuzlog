import React from 'react';
import { LocalForm, actions } from 'react-redux-form';

export default class RRForm extends React.Component {
  constructor() {
    super();
    this.getDispatch = this.getDispatch.bind(this);
    this.handleSubmitFailed = this.handleSubmitFailed.bind(this);
  }

  getDispatch(dispatch) {
    this.dispatch = dispatch;
    if (typeof this.props.getDispatch == 'function')
      this.props.getDispatch(dispatch);
  }

  handleSubmitFailed(form) {
    this.dispatch(actions.setDirty('local'));
    let toFocus;
    for (let i in form) {
      let model = 'local.' + i;
      let valid = form[i].valid;
      if (valid == null) {
        valid = form[i].$form.valid;
      }
      if (!valid) {
        toFocus = model;
      }
    }
    this.dispatch(actions.focus(toFocus));
  }

  render() {
    return (
      <LocalForm autoComplete='off' hideNativeErrors
        getDispatch={this.getDispatch}
        onUpdate={this.props.onUpdate}
        onSubmitFailed={this.handleSubmitFailed}
        onSubmit={this.props.onSubmit}>
        {this.props.children}
      </LocalForm>
    );
  }
}