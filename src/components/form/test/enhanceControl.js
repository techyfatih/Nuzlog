import React from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

export default (EnhancedControl) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = props.form.get(props.id);
      this.handleChange = this.handleChange.bind(this);
      this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    componentDidMount() {
      if (typeof this.props.getValidator == 'function' &&
          typeof this.validator == 'function')
        this.props.getValidator(this.props.id, this.validator);
    }

    componentWillReceiveProps(nextProps) {
      this.setState(nextProps.form.get(nextProps.id));
    }

    componentDidUpdate() {
      if (this.input && this.state.focus)
        this.input.focus();
    }

    handleChange(value) {
      this.props.onChange(this.props.id, value);
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