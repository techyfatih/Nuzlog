import React from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

export default class Select extends React.Component {
  render() {
    return (
      <FormGroup controlId={this.props.id}>
        {this.props.label && <ControlLabel>{this.props.label}</ControlLabel>}
        <FormControl componentClass='select'
          onChange={this.props.onChange}>
          {this.props.children}
        </FormControl>
      </FormGroup>
    )
  }
}