import React from 'react';
import PropTypes from 'prop-types';
import { FormControl } from 'react-bootstrap';

export default class Input extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.focus)
      this.input.focus();
  }
  
  handleChange(e) {
    if (this.props.onChange)
      this.props.onChange(e.target.value);
  }

  render() {
    return (
      <FormControl type={this.props.type} spellCheck='false'
        componentClass={this.props.componentClass}
        id={this.props.id}
        placeholder={this.props.placeholder}
        value={this.props.value ? this.props.value : ''}
        onChange={this.handleChange}
        onFocus={this.props.onFocus}
        onBlur={this.props.onBlur}
        inputRef={ref => this.input = ref}>
        {this.props.children}
      </FormControl>
    );
  }
}

Input.propTypes = {
  type: PropTypes.string,
  componentClass: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  focus: PropTypes.bool,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func
}