import React from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { Control } from 'react-redux-form';

export default class TextInput extends React.Component {
  componentWillReceiveProps(nextProps) {
    //console.log(nextProps.props);
    if (nextProps.focus)
      this.input.focus();
  }

  render() {
    return (
      <FormGroup controlId={this.props.id}
        validationState={
          !this.props.required || this.props.pristine
          ? null : (this.props.valid ? 'success' : 'error')}>
        {this.props.label && <ControlLabel>{this.props.label}</ControlLabel>}
        <FormControl type='text'
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={this.props.onChange}
          onFocus={this.props.onFocus}
          onBlur={this.props.onBlur}
          inputRef={ref => this.input = ref} />
      </FormGroup>
    );
  }
}

export class RRFText extends React.Component {
  render() {
    return (
      <Control.text
        model={this.props.model}
        id={this.props.model}
        required={this.props.required}
        label={this.props.label}
        placeholder={this.props.placeholder}
        component={TextInput}
        validators={{
          required: (val) => !this.props.required || val && val.trim().length
        }}
        mapProps={{
          props: (props) => props.fieldValue,
          pristine: ({fieldValue}) => fieldValue.pristine,
          valid: ({fieldValue}) => fieldValue.valid,
          focus: ({fieldValue}) => fieldValue.focus
        }} />
    )
  }
}