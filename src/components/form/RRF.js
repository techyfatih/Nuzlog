import React from 'react';
import PropTypes from 'prop-types';
import { LocalForm, actions, Control } from 'react-redux-form';

import { Input, Combobox, PokeCombobox, FormsCombobox, ToggleGroup, MovesList,
  Check } from './controls/Controls'
import validate from './controls/validate';

export class RRForm extends React.Component {
  constructor() {
    super();
    this.getDispatch = this.getDispatch.bind(this);
    this.handleSubmitFailed = this.handleSubmitFailed.bind(this);
  }

  getDispatch(dispatch) {
    this.dispatch = dispatch;
    if (this.props.getDispatch)
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
};

RRForm.propTypes = {
  getDispatch: PropTypes.func,
  onUpdate: PropTypes.func,
  onSubmit: PropTypes.func
};

export class RRFControl extends React.Component {
  constructor(props) {
    super(props);
    switch (props.component) {
      case 'combobox':
        this.component = validate(Combobox);
        break;
      case 'pokemon':
        this.component = validate(PokeCombobox);
        break;
      case 'forms':
        this.component = validate(FormsCombobox);
        break;
      case 'moves':
        this.component = validate(MovesList);
        break;
      case 'check':
        this.component = validate(Check);
        break;
      case 'toggle':
        this.component = validate(ToggleGroup);
        break;
      default:
        this.component = validate(Input);
    }
  }

  render() {
    return (
      <Control model={this.props.model}
        component={this.component}
        type={this.props.type}
        componentClass={this.props.componentClass}
        id={this.props.id}
        label={this.props.label}
        placeholder={this.props.placeholder}
        required={this.props.required}
        pokemon={this.props.pokemon}
        validators={{
          required: (val) => !this.props.required || val && val.trim().length
        }}
        mapProps={{
          pristine: ({fieldValue}) => fieldValue.pristine,
          valid: ({fieldValue}) => fieldValue.valid,
          focus: ({fieldValue}) => fieldValue.focus
        }}
        defaultValue={this.props.componentClass == 'select' ?
          this.props.children[0].props.value : undefined}
        onChange={this.props.onChange}>
        {this.props.children}
      </Control>
    )
  }
};