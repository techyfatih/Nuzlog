import React from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { Control } from 'react-redux-form';

class _TextControl extends React.Component {
  componentDidUpdate() {
    if (this.props.focus)
      this.input.focus();
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
          type='text'
          placeholder={this.props.placeholder}
          value={this.props.value}
          onFocus={this.props.onFocus}
          onChange={this.props.onChange}
          onBlur={this.props.onBlur}
          inputRef={ref => this.input = ref} />
      </FormGroup>
    );
  }
}

export default class TextControl extends React.Component {
  render() {
    return (
      <Control.text
        model={'.' + this.props.id}
        id={this.props.id}
        label={this.props.label}
        placeholder={this.props.placeholder}
        required={this.props.required}
        component={_TextControl}
        mapProps={{
          pristine: ({fieldValue}) => fieldValue.pristine,
          valid: ({fieldValue}) => fieldValue.valid,
          focus: ({fieldValue}) => fieldValue.focus
        }}
        validators={{
          required: val => !this.props.required || val && val.length
        }} />
    );
  }
}