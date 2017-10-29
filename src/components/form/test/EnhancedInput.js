import React from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

import enhanceControl from './enhanceControl';

export class EnhancedGroup extends React.Component {
  render() {
    return (
      <FormGroup className={this.props.className} controlId={this.props.id}
        validationState={
          !this.props.required || this.props.pristine
          ? null : (this.props.valid ? 'success' : 'error')}>
        {this.props.label && <ControlLabel>{this.props.label}</ControlLabel>}
        {this.props.children}
      </FormGroup>
    )
  }
}

export class EnhancedControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onChange(e.target.value);
  }

  render() {
    return (
      <FormControl type={this.props.type ? this.props.type : 'text'}
        placeholder={this.props.placeholder}
        value={this.props.value}
        min={this.props.min}
        max={this.props.max}
        onChange={this.handleChange}
        onKeyDown={this.props.onKeyDown}
        inputRef={this.props.inputRef} />
    );
  }
};

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onChange(e.target.value);
  }

  render() {
    return (
      <EnhancedGroup {...this.props}>
        <EnhancedControl {...this.props}
          onChange={this.props.onChange}
          onKeyDown={this.props.onKeyDown}
          inputRef={ref => this.props.getInput(ref)} />
      </EnhancedGroup>
    );
  }
}

export default enhanceControl(Input);