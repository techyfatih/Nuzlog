import React from "react";

const stylesheet = document.getElementById("bootstrap");

export default class ThemeSwitcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "default" };
    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    this.setState({ value });
    const link =
      "bootstrap/css/bootstrap" + (value == "dark" ? "-dark" : "") + ".min.css";
    stylesheet.setAttribute("href", link);
  }

  render() {
    return (
      <ToggleButtonGroup
        type="radio"
        name="theme"
        value={this.state.value}
        onChange={this.onChange}
      >
        <ToggleButton value="default">Default</ToggleButton>
        <ToggleButton value="dark">Dark</ToggleButton>
      </ToggleButtonGroup>
    );
  }
}
