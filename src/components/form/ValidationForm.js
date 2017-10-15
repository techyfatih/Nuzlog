import React from 'react';
import { LocalForm, actions } from 'react-redux-form';

export default class ValidationForm extends React.Component {
  constructor() {
    super();
    this.state = {form: {}};
    this.getDispatch = this.getDispatch.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.dispatch(actions.focus('local.' + this.props.focus));
  }

  getDispatch(dispatch) {
    this.dispatch = dispatch;
    if (typeof this.props.getDispatch == 'function')
      this.props.getDispatch(dispatch);
  }
  
  handleUpdate(form) {
    this.setState({form});
  }

  handleSubmit(values) {
    if (!this.state.form.$form.valid) {
      this.dispatch(actions.setDirty('local'));
      let toFocus = '';
      for (var form in this.state.form) {
        if (form == '$form') continue;
        if (!this.state.form[form].valid) {
          toFocus = this.state.form[form].model;
        }
      }
      this.dispatch(actions.focus(toFocus));
    } else this.props.onSubmit(values);
  }

  render() {
    return (
      <LocalForm autoComplete='off' noValidate
        onUpdate={this.handleUpdate} onSubmit={this.handleSubmit}
        getDispatch={this.getDispatch}>
        {this.props.children}
      </LocalForm>
    );
  }
}