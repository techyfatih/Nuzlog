import React from 'react';
import { Control, LocalForm, Fieldset } from 'react-redux-form';

import moves from 'data/moves.json';

import TextInput from './controls/TextInput';
import Combobox from './controls/Combobox';
import NumberInput from './controls/NumberInput';
import ToggleGroup from './controls/ToggleGroup';
import Moves from './controls/Moves';

export class RRFText extends React.Component {
  render() {
    return (
      <Control.text
        model={this.props.model}
        id={this.props.model}
        label={this.props.label}
        placeholder={this.props.placeholder}
        required={this.props.required}
        component={TextInput}
        validators={{
          required: (val) => !this.props.required || val && val.trim().length
        }}
        mapProps={{
          pristine: ({fieldValue}) => fieldValue.pristine,
          valid: ({fieldValue}) => fieldValue.valid,
          focus: ({fieldValue}) => fieldValue.focus
        }} />
    )
  }
}

export class RRFCombobox extends React.Component {
  render() {
    return (
      <Control.text
        model={this.props.model}
        id={this.props.model}
        label={this.props.label}
        placeholder={this.props.placeholder}
        rowHeight={this.props.rowHeight}
        required={this.props.required}
        component={Combobox}
        validators={{
          required: (val) => !this.props.required || val && val.trim().length
        }}
        mapProps={{
          pristine: ({fieldValue}) => fieldValue.pristine,
          valid: ({fieldValue}) => fieldValue.valid,
          focus: ({fieldValue}) => fieldValue.focus
        }}
        onChange={this.props.onChange}>
        {this.props.children}
      </Control.text>
    )
  }
}

export class RRFNumber extends React.Component {
  render() {
    return (
      <Control.text
        model={this.props.model}
        id={this.props.model}
        label={this.props.label}
        placeholder={this.props.placeholder}
        required={this.props.required}
        min={this.props.min}
        max={this.props.max}
        component={NumberInput}
        validators={{
          required: (val) => !this.props.required || val && val.trim().length,
          min: (val) => !this.props.min || val >= this.props.min,
          max: (val) => !this.props.max || val <= this.props.max
        }}
        mapProps={{
          pristine: ({fieldValue}) => fieldValue.pristine,
          valid: ({fieldValue}) => fieldValue.valid,
          focus: ({fieldValue}) => fieldValue.focus
        }} />
    )
  }
}

export class RRFToggle extends React.Component {
  render() {
    return (
      <Control 
        model={this.props.model}
        name={this.props.model}
        type={this.props.type}
        label={this.props.label}
        required={this.props.required}
        component={ToggleGroup}
        validators={{
          required: (val) => !this.props.required || val && val.length
        }}
        mapProps={{
          pristine: ({fieldValue}) => fieldValue.pristine,
          valid: ({fieldValue}) => fieldValue.valid,
          focus: ({fieldValue}) => fieldValue.focus
        }}
        onChange={this.props.onChange}>
        {this.props.children}
      </Control>
    )
  }
}

export class RRFMoves extends React.Component {
  render() {
    return (
      <Control model='.moves'
        component={Moves}
        validators={{required: val => val && val.length}}
        mapProps={{
          pristine: ({fieldValue}) => fieldValue.pristine,
          valid: ({fieldValue}) => fieldValue.valid,
          focus: ({fieldValue}) => fieldValue.focus
        }} />
    )
  }
}

export class RRFMoves2 extends React.Component {
  constructor() {
    super();
    this.state = {
      pristine: true,
      valid: false,
    }
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleUpdate(form) {
    const {pristine, valid} = form.$form;
    this.setState({pristine, valid})
  }

  render() {
    return (
      <LocalForm component='div' onUpdate={e=>console.log(e)}
        validators={{
          '': ({m1, m2, m3, m4}) => m1 && m2 && m3 && m4
        }}>
        <Control.text model='.m1' required
          id={this.props.id + '1'}
          label='Moves*'
          placeholder='Tackle'
          component={Combobox}
          pristine={this.state.pristine}
          valid={this.state.valid}
          mapProps={{
            focus: ({fieldValue}) => fieldValue.focus
          }}
          onChange={this.props.onChange}>
          {this.props.children}
        </Control.text>
      </LocalForm>
    )
  }
}