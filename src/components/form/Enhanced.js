import React from 'react';
import { OrderedMap } from 'immutable';

import Input from './controls/Input';
import Combobox from './controls/Combobox';
import Checkbox from './controls/Checkbox';

const Form = props => {
  return (
    <form autoComplete='off' noValidate onSubmit={props.onSubmit}>
      {props.children}
    </form>
  );
};

const enhanceForm = (EnhancedForm, fields) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      
      this.updateState = this.updateState.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.focus = this.focus.bind(this);
      this.reset = this.reset.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

      this.initial = [];
      for (let i = 0; i < fields.length; i++) {
        let id = fields[i][0]
        let props = fields[i][1];
        if (typeof props != 'object')
          props = {value: props};
        
        const validator = value => {
          let valid = !props.required || value != undefined && value != '';
          if (props.min) valid = valid && valid >= props.min;
          if (props.max) valid = valid && valid <= props.max;
          return valid;
        };
        this.initial.push([id, {
          value: props.value,
          required: props.required,
          min: props.min,
          max: props.max,
          pristine: true,
          validator,
          valid: validator(props.value),
          focus: false
        }]);
      }
      this.state = {
        data: OrderedMap(this.initial)
      };
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

    handleChange(id, value) {
      this.setState(({data}) => ({
        data: data.update(id, props => Object.assign({}, props, {
          value,
          pristine: false,
          valid: props.validator(value)
        }))
      }), () =>console.log(this.state.data.get(id)));
    }

    reset(initial) {
      for (let id in initial)
        this.initial.set(id, initial[id]);
      
      this.setState({
        data: OrderedMap(this.initial)
      }, () => this.focus(this.state.data.keys().next().value));
      
      if (typeof this.props.onReset == 'function')
        this.props.onReset();
    }

    handleSubmit(e, success) {
      let toFocus;
      let iter = this.state.data.entries();
      let i = iter.next();
      while (!i.done) {
        let id = i.value[0];
        let props = i.value[1];
        if (!props.valid) {
          toFocus = id;
          this.setState(({data}) => ({
            data: data.map(props => {
              return Object.assign({}, props, {pristine: false});
            })
          }), () => this.focus(toFocus));
          e.preventDefault();
          return;
        }
        i = iter.next();
        console.log(i);
      }
      success();
    }

    render() {
      return (
        <EnhancedForm {...this.props}
          state={this.state.data}
          onChange={this.handleChange}
          reset={this.reset}
          onSubmit={this.handleSubmit} />
      );
    }
  }
}

export default {
  Form,
  enhanceForm,
  Input,
  Combobox,
  Checkbox
};