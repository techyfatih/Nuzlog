import React from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

import enhanceControl from './enhanceControl';

class Number extends React.Component {
  constructor(props) {
    super(props);
    this.validate = this.validate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    props.validator(this.validate);
  }

  validate(value) {
    let valid = !this.props.required || value;
    if (this.props.min)
      valid = valid && value >= this.props.min;
    if (this.props.max)
      valid = valid && value <= this.props.max;
    return valid;
  }

  handleChange(e) {
    this.props.onChange(e.target.value);
  }

  render() {
    return (
      <FormGroup controlId={this.props.id}
        validationState={
          !this.props.required || this.props.pristine
          ? null : (this.props.valid ? 'success' : 'error')}>
        {this.props.label && <ControlLabel>{this.props.label}</ControlLabel>}
        <FormControl type='number'
          value={this.props.value}
          min={this.props.min}
          max={this.props.max}
          onChange={this.handleChange}
          onKeyDown={this.props.onKeyDown}
          inputRef={ref => this.props.getInput(ref)} />
      </FormGroup>
    );
  }
}

export default enhanceControl(Number);