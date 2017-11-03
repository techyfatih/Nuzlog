import React from 'react';
import { ControlLabel, ButtonToolbar, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

import enhanceControl from './enhanceControl';

class ToggleGroup extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    if (e.target.value && e.target.value == this.props.value)
      this.props.onChange('');
  }

  render() {
    return (
      <div>
        {this.props.label && <ControlLabel>{this.props.label}</ControlLabel>}
        <ButtonToolbar>
        <ToggleButtonGroup name={this.props.id} type='radio'
          className={
            !this.props.required || this.props.pristine
            ? null : (this.props.valid ? 'has-success' : 'has-error')}
          value={this.props.value}
          onChange={this.props.onChange}>
          {this.props.options.map((value, key) => (
            <ToggleButton key={key} value={value[0]}
              onClick={this.handleClick}>
              {value[1]}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        </ButtonToolbar>
      </div>
    )
  }
}

export default enhanceControl(ToggleGroup);