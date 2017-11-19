import React from 'react';
import { Checkbox } from 'react-bootstrap';

export default class Check extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    if (typeof this.props.onChange == 'function')
      this.props.onChange(e.target.checked);
  }

  render() {
    return (
      <Checkbox checked={this.props.value ? true : false}
        onChange={this.handleChange}>
        {this.props.children}
      </Checkbox>
    );
  }
}