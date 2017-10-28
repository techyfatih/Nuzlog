import React from 'react';
import { Checkbox } from 'react-bootstrap';
import { Control } from 'react-redux-form';

class _Checkbox extends React.Component {
  render() {
    return (
      <Checkbox onChange={this.props.onChange}>{this.props.label}</Checkbox>
    );
  }
}

export default class CheckboxControl extends React.Component {
  render() {
    return (
      <Control.checkbox
        model={'.' + this.props.id}
        label={this.props.label}
        component={_Checkbox} />
    );
  }
}