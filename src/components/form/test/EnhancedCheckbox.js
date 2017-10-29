import React from 'react';
import { Checkbox as BSCheckbox } from 'react-bootstrap';

import enhanceControl from './enhanceControl';

class Checkbox extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onChange(e.target.checked);
  }

  render() {
    return (
      <BSCheckbox
        onChange={this.handleChange}
        onKeyDown={this.props.onKeyDown}>
        {this.props.label}
      </BSCheckbox>
    )
  }
}

export default enhanceControl(Checkbox);