import React from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { Control, actions } from 'react-redux-form';

class _NumberControl extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate() {
    if (this.props.focus)
      this.input.focus();
    if (this.props.pristine)
      this.props.onChange(this.props.initialValue);
  }

  handleChange(e) {
    this.props.touch();
    this.props.onChange(e);
  }

  render() {
    return (
      <FormGroup
        controlId={this.props.id}
        validationState={
          !this.props.required || this.props.pristine
          ? null : (this.props.valid ? 'success' : 'error')}>
        {this.props.label && <ControlLabel>{this.props.label}</ControlLabel>}
        <FormControl
          type='number'
          value={this.props.value}
          min={this.props.min}
          max={this.props.max}
          onFocus={this.props.onFocus}
          onChange={this.props.onChange}
          onBlur={this.props.onBlur}
          inputRef={ref => this.input = ref} />
      </FormGroup>
    );
  }
}

export default class NumberControl extends React.Component {
  constructor() {
    super();
    this.state = {pristine: true};
  }

  render() {
    return (
      <Control.text
        model={'.' + this.props.id}
        id={this.props.id}
        label={this.props.label}
        initialValue={this.props.initialValue}
        min={this.props.min}
        max={this.props.max}
        required={this.props.required}
        component={_NumberControl}
        touch={() => this.setState({pristine: false})}
        mapProps={{
          pristine: ({fieldValue}) => fieldValue.pristine,
          valid: ({fieldValue}) => fieldValue.valid,
          focus: ({fieldValue}) => fieldValue.focus
        }}
        validators={{
          required: val => !this.props.required || val && val.length,
          withinRange: val => !this.props.required ||
            val >= this.props.min && val <= this.props.max
        }} />
    );
  }
}