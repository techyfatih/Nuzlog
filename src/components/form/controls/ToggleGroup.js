import React from "react";
import ReactDOM from "react-dom";

class ToggleGroupButton extends React.Component {
  constructor() {
    super();
    this.state = { focus: false };
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  focus() {
    this.input.focus();
  }

  handleFocus() {
    this.setState({ focus: true });
  }

  handleBlur() {
    this.setState({ focus: false });
  }

  render() {
    return (
      <ToggleButton
        {...this.props}
        ref={ref => (this.input = ReactDOM.findDOMNode(ref))}
        className={this.state.focus ? "focus" : ""}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      >
        {this.props.children}
      </ToggleButton>
    );
  }
}

export default class ToggleGroup extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.focus && this.input) {
      this.input.focus();
      if (typeof this.props.onBlur == "function") this.props.onBlur();
    }
  }

  handleClick(e) {
    const value = e.target.value;
    if (value && value == this.props.value) this.props.onChange("");
  }

  render() {
    return (
      <ButtonToolbar>
        <ToggleButtonGroup
          type={this.props.type}
          name={this.props.name}
          vertical={this.props.vertical}
          value={this.props.value}
          onChange={this.props.onChange}
        >
          {React.Children.map(this.props.children, (value, index) => (
            <ToggleGroupButton
              ref={ref => {
                if (index == 0) this.input = ref;
              }}
              value={value.props.value}
              onClick={this.handleClick}
            >
              {value}
            </ToggleGroupButton>
          ))}
        </ToggleButtonGroup>
      </ButtonToolbar>
    );
  }
}
