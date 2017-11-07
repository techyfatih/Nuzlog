import React from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

export default class NumberInput extends React.Component {
  componentWillReceiveProps(nextProps) {
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
        <FormControl type='number'
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={this.props.onChange}
          onFocus={this.props.onFocus}
          onBlur={this.props.onBlur}
          min={this.props.min}
          max={this.props.max}
          inputRef={ref => this.input = ref} />
      </FormGroup>
    );
  }
}