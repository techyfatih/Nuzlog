import React from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

import enhanceControl from './enhanceControl';

class Text extends React.Component {
  constructor(props) {
    super(props);
    this.validate = this.validate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    props.validator(this.validate);
  }

  validate(value) {
    return !this.props.required || value && value.length;
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
        <FormControl type='text' placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={this.handleChange}
          onKeyDown={this.props.onKeyDown}
          inputRef={ref => this.props.getInput(ref)} />
      </FormGroup>
    );
  }
}

export default enhanceControl(Text);