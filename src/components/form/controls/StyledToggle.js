import React from 'react';
import { ToggleButton } from 'react-bootstrap';

import './StyledToggle.css';

/** BS ToggleButton with focus styling */
export default class StyledToggle extends React.Component {
  constructor() {
    super();
    this.state = {focus: false};
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleFocus() {
    console.log('focus');
    this.setState({focus: true});
  }

  handleBlur() {
    this.setState({focus: false});
  }

  render() {
    return (
      <ToggleButton {...this.props}
        className={'toggle-button' + (this.state.focus ? ' focus-toggle' : '')}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}>
        {this.props.children}
      </ToggleButton>
    )
  }
}