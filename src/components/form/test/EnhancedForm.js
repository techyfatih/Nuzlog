import React from 'react';
import { OrderedMap } from 'immutable';

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
      
      this.updateState = this.updateState.bind(this);
      this.addField = this.addField.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.focus = this.focus.bind(this);
      this.reset = this.reset.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

      this.initial = [];
      this.state = {
        data: OrderedMap()
      };
      this.form = {
        addField: this.addField,
        onChange: this.handleChange
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

    addField(id, value, valid) {
      let fieldProps = {
        value: value ? value : '',
        pristine: true,
        focus: false,
        valid
      };
      this.initial.push([id, fieldProps]);
      this.setState(({data}) => ({
        data: data.set(id, fieldProps)
      }));
      return fieldProps;
    }

    handleChange(id, value, valid) {
      this.updateState(id, {value, pristine: false, valid});
    }

    reset() {
      this.setState({
        data: OrderedMap(this.initial)
      }, () => this.focus(this.state.data.keys().next().value));
      
      if (typeof this.props.onReset == 'function')
        this.props.onReset();
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
          state={this.state.data}
          form={this.form}
          getValidator={this.getValidator}
          reset={this.reset}
          onSubmit={this.handleSubmit} />
      );
    }
  }
}