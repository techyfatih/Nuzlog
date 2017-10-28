import React from 'react';
import { Map as iMap, OrderedMap } from 'immutable';

const validate = (value, required, min, max) => {
  console.log(value + ' ' + required + ' ' + min + ' ' + max)
  let valid = !required || value && value.length;
  if (!valid && typeof value == 'number') {
    if (min != null)
      valid = valid && value >= min;
    if (max != null)
      valid = valid && value <= max;
  }
  return valid;
}

export const EnhancedForm = props => {
  return (
    <form autoComplete='off' noValidate onSubmit={props.onSubmit}>
      {props.children}
    </form>
  );
};

export const enhanceForm = (EnhancedForm, fields) => {
  return class extends React.Component {
    constructor(props) {
      super(props);

      this.initial = new Map();
      fields.forEach((value, field) => {
        this.initial.set(field, {
          value,
          pristine: true,
          focus: false,
          valid: true
        })
      });
      this.initial = Array.from(this.initial);
      this.state = {
        data: OrderedMap(this.initial),
        validators: iMap()
      };
      
      this.getValidator = this.getValidator.bind(this);
      this.updateState = this.updateState.bind(this);
      this.focus = this.focus.bind(this);
      this.reset = this.reset.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    getValidator(id, validator) {
      for (let i = 0; i < this.initial.length; i++) {
        let field = this.initial[i];
        if (field[0] == id) {
          field[1].valid = validator(field[1].value)
          break;
        }
      }

      this.setState(({data, validators}) => ({
        data: data.update(id, props => Object.assign({}, props, {
          valid: validator(props.value)
        })),
        validators: validators.set(id, validator)
      }));
    }

    updateState(id, props, callback) {
      this.setState(({data}) => ({
        data: data.update(id, oldProps => Object.assign({}, oldProps, props))
      }), callback);
    }

    focus(id) {
      this.updateState(id, {
        focus: true
      }, () => this.updateState(id, {
        focus: false
      }));
    }

    reset() {
      this.setState({
        data: OrderedMap(this.initial)
      }, () => this.focus(this.state.data.keys().next().value));
      
      if (typeof this.props.onReset == 'function')
        this.props.onReset();
    }

    handleChange(id, value) {
      this.setState(({data, validators}) => ({
        data: data.update(id, props => {
          let validator = validators.get(id);
          if (!validator)
            validator = () => true;

          return {
            value,
            pristine: false,
            valid: validator(value)
          }
        })
      }))
    }

    handleSubmit(e) {
      let toFocus;
      e.persist();

      this.setState(({data}) => ({
        data: data.map((props, field) => {
          if (!toFocus && !props.valid)
            toFocus = field;
          return Object.assign({}, props, {pristine: false});
        })
      }), () => {
        if (toFocus) {
          this.focus(toFocus);
          e.preventDefault();
        }
      });
    }

    render() {
      return (
        <EnhancedForm {...this.props}
          form={this.state.data}
          getValidator={this.getValidator}
          reset={this.reset}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit} />
      );
    }
  }
}