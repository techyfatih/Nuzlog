import React from 'react';
import { LocalForm, actions } from 'react-redux-form';

export default class ValidationForm extends React.Component {
  constructor() {
    super();
    this.state = {form: {}};
    this.focus = this.focus.bind(this);
    this.getDispatch = this.getDispatch.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentDidMount() {
    console.log(this.refs.localform);
    /*for (let control in this.props.initialState) {
      let val = this.props.initialState[control];
      this.dispatch(actions.change('local.' + control, val));
    }*/
  }
  
  reset() {
    this.dispatch(actions.reset('local'));
  }

  focus(field) {
    this.dispatch(actions.focus('local.' + field));
  }

  getDispatch(dispatch) {
    this.dispatch = dispatch;
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
        let field = this.state.form[form];
        this.dispatch(actions.blur(field.model));
        if (!field.valid) {
          toFocus = field.model;
        }
      }
      this.dispatch(actions.focus(toFocus));
    } else this.props.onSubmit(values);
  }

  render() {
    return (
      <LocalForm autoComplete='off' noValidate ref='localform'
      initialState={this.props.initialState}
        getDispatch={this.getDispatch}
        onUpdate={this.handleUpdate}
        onSubmit={this.handleSubmit}>
        {this.props.children}
      </LocalForm>
    );
  }
}