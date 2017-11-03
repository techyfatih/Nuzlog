import React from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

export default class NumberInput extends React.Component {
  render() {
    return (
      <FormGroup controlId={this.props.id}
        validationState={
          !this.props.required || this.props.pristine
          ? null : (this.props.valid ? 'success' : 'error')}>
        {this.props.label && <ControlLabel>{this.props.label}</ControlLabel>}
        <FormControl type='number'
          placeholder={this.props.placeholder}
          value={this.props.value}
          min={this.props.min}
          max={this.props.max}
          onChange={this.handleChange} />
      </FormGroup>
    );
  }
}