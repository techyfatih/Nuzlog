import React from 'react';
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap'

export default class ThemeSwitcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'default'};
    this.onChange = this.onChange.bind(this);
    this.stylesheet = document.getElementById('bootstrap');
  }

  onChange(value) {
    this.setState({ value });
    const link = 'bootstrap/css/bootstrap' + (value == 'dark' ? '-dark' : '') + '.min.css';
    this.stylesheet.setAttribute('href', link);
  }

  render() {
    return (
      <ToggleButtonGroup {...this.props} type='radio' name='theme' value={this.state.value} onChange={this.onChange}>
        <ToggleButton value='default'>Default</ToggleButton>
        <ToggleButton value='dark'>Dark</ToggleButton>
      </ToggleButtonGroup>
    )
  }
}