import React from 'react';
import { Control } from 'react-redux-form';

import TextInput from './controls/TextInput';
import Combobox from './controls/Combobox';
import NumberInput from './controls/NumberInput';

export class RRFText extends React.Component {
  render() {
    return (
      <Control.text
        model={this.props.model}
        id={this.props.model}
        label={this.props.label}
        placeholder={this.props.placeholder}
        required={this.props.required}
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

export class RRFCombobox extends React.Component {
  render() {
    return (
      <Control.text
        model={this.props.model}
        id={this.props.model}
        label={this.props.label}
        placeholder={this.props.placeholder}
        items={this.props.items}
        required={this.props.required}
        component={Combobox}
        validators={{
          required: (val) => !this.props.required || val && val.trim().length
        }}
        mapProps={{
          pristine: ({fieldValue}) => fieldValue.pristine,
          valid: ({fieldValue}) => fieldValue.valid,
          focus: ({fieldValue}) => fieldValue.focus
        }} />
    )
  }
}

export class RRFNumber extends React.Component {
  render() {
    return (
      <Control.text
        model={this.props.model}
        id={this.props.model}
        label={this.props.label}
        placeholder={this.props.placeholder}
        required={this.props.required}
        min={this.props.min}
        max={this.props.max}
        component={NumberInput}
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