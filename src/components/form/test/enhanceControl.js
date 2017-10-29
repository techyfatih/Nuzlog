import React from 'react';

export default (EnhancedControl) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.validate = this.validate.bind(this);
      this.state = this.props.form.addField(
        props.id,
        props.value,
        this.validate(props.value)
      );
      this.handleChange = this.handleChange.bind(this);
      this.handleKeyDown = this.handleKeyDown.bind(this);
    }
    
    validate(value) {
      let valid = !this.props.required || value;
      if (this.props.min)
        valid = valid && value >= this.props.min;
      if (this.props.max)
        valid = valid && value <= this.props.max;
      return valid;
    }

    componentWillReceiveProps(nextProps) {
      this.setState(nextProps.state.get(nextProps.id));
    }

    componentDidUpdate() {
      if (this.input && this.state.focus)
        this.input.focus();
    }

    handleChange(value) {
      this.props.form.onChange(this.props.id, value, this.validate(value));
    }

    handleKeyDown(e) {
      e.stopPropagation();
      if (typeof this.props.onKeyDown == 'function') {
        this.props.onKeyDown(e);
      }
    }

    render() {
      return (
        <EnhancedControl {...this.props}
          value={this.state.value}
          pristine={this.state.pristine}
          valid={this.state.valid}
          validator={validator => this.validator = validator}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          getInput={input => this.input = input} />
      );
    }
  };
};