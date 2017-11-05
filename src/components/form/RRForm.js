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
      if (!form[i].valid)
        toFocus = form[i].model;
    }
    this.dispatch(actions.focus(toFocus));
  }

  render() {
    return (
      <LocalForm autoComplete='off' hideNativeErrors
        getDispatch={this.getDispatch}
        onSubmitFailed={this.handleSubmitFailed}
        onSubmit={this.props.onSubmit}>
        {this.props.children}
      </LocalForm>
    );
  }
}