import React from 'react';
import { Control } from 'react-redux-form';

import pokedex from 'data/pokedex.json'; //HAS TO BE JSON, NOT JS

import TextInput from './controls/TextInput';
import Combobox from './controls/Combobox';
import NumberInput from './controls/NumberInput';
import ToggleGroup from './controls/ToggleGroup';
import Select from './controls/Select';
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
        onChange={this.props.onChange}
        defaultValue={this.props.defaultValue}>
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
          required: (val) => !this.props.required || typeof val == 'number',
          min: (val) => !this.props.min || val >= this.props.min,
          max: (val) => !this.props.max || val <= this.props.max
        }}
        mapProps={{
          pristine: ({fieldValue}) => fieldValue.pristine,
          valid: ({fieldValue}) => fieldValue.valid,
          focus: ({fieldValue}) => fieldValue.focus
        }}
        defaultValue={this.props.defaultValue}
        onChange={this.props.onChange}>
          {this.props.children}
      </Control.text>
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

export class RRFSelect extends React.Component {
  render() {
    let child = this.props.children;
    if (Array.isArray(child)) child = child[0];
    return (
      <Control.select model={this.props.model}
        id={this.props.model}
        component={Select}
        defaultValue={child.props.value}>
        {this.props.children}
      </Control.select>
    )
  }
}

export class RRFMoves extends React.Component {
  render() {
    return (
      <Control model='.moves'
        label={this.props.label}
        required={this.props.required}
        component={Moves}
        validators={{
          required: moves => {
            if (!this.props.required) return true;
            for (let i in moves) {
              if (moves[i]) return true;
            }
            return false;
          }
        }}
        mapProps={{
          pristine: ({fieldValue}) => fieldValue.pristine,
          valid: ({fieldValue}) => fieldValue.valid,
          focus: ({fieldValue}) => fieldValue.focus
        }}
        defaultValue={this.props.defaultValue ?
          this.props.defaultValue : ['', '', '' ,'']} />
    )
  }
}