import React from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

export default class NumberInput extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.focus)
      this.input.focus();
  }

  handleChange(e) {
    let num = parseInt(e.target.value);
    if (isNaN(num)) num = '';
    if (typeof this.props.onChange == 'function') {
      this.props.onChange(num);
    }
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
          onChange={this.handleChange}
          onFocus={this.props.onFocus}
          onBlur={this.props.onBlur}
          min={this.props.min}
          max={this.props.max}
          inputRef={ref => this.input = ref} />
      </FormGroup>
    );
  }
}