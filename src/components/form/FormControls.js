import './FormControls.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { FormGroup, ControlLabel, FormControl, Glyphicon, Panel, ListGroup,
  ListGroupItem, Checkbox } from 'react-bootstrap';
import { LocalForm, Control } from 'react-redux-form';

/** Generalized validated form group */
class ValidatedFormGroup extends React.Component {
  render() {
    return (
      <FormGroup
        controlId={this.props.id}
        validationState={!this.props.required || this.props.pristine
          ? null : (this.props.valid ? 'success' : 'error')}>
        {this.props.label && <ControlLabel>{this.props.label}</ControlLabel>}
        {this.props.children}
      </FormGroup>
    );
  }
}

/** TextControl */
class _TextControl extends React.Component {
  componentDidUpdate() {
    if (this.props.focus)
      this.input.focus();
  }

  render() {
    return (
      <ValidatedFormGroup
        id={this.props.id}
        required={this.props.required}
        pristine={this.props.pristine}
        valid={this.props.valid}
        label={this.props.label}>
        <FormControl type='text' 
          placeholder={this.props.placeholder}
          value={this.props.value}
          onFocus={this.props.onFocus}
          onChange={this.props.onChange}
          onKeyDown={this.props.onKeyDown}
          onBlur={this.props.onBlur}
          inputRef={ref => this.input = ref} />
          {this.props.children}
      </ValidatedFormGroup>
    );
  }
}

/** Combobox */

const normalize = str => {
  if (str) return str.toLowerCase().replace(/é/g, 'e');
  return '';
}

const filter = (items, value) => {
  return items.filter(item => {
    return normalize(item).indexOf(normalize(value)) !== -1;
  });
}

class ComboboxMenu extends React.Component {
  constructor() {
    super();
    this.handleMouseDown = this.handleMouseDown.bind(this);
  }

  componentDidUpdate() {
    if (this.activeItem)
      ReactDOM.findDOMNode(this.activeItem).scrollIntoView({block: 'nearest'});
  }

  handleMouseDown(e) {
    this.props.onChange(e.target.text);
  }

  render() {
    return (
      <Panel className='custom-dropdown'>
        <ListGroup fill>
          {this.props.items.map((item, key) => {
            const isActive = key == this.props.index;
            return (
              <ListGroupItem href='#' key={key} active={isActive} tabIndex={-1}
                onMouseDown={this.handleMouseDown}
                ref={ref => {if (isActive) this.activeItem = ref}}>
                {item}
              </ListGroupItem>
            );
          })}
        </ListGroup>
      </Panel>
    );
  }
}

class _Combobox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      filtered: filter(props.items, props.value),
      index: -1,
      selected: props.value
    };
    this.handleFocus = this.handleFocus.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(prevState => {
      var index = prevState.index;
      var selected = prevState.selected;
      if (selected != nextProps.value) {
        index = -1;
        selected = nextProps.value;
      }
      return {
        filtered: filter(nextProps.items, nextProps.value),
        index,
        selected
      }
    });
  }

  handleFocus(e) {
    this.setState({menuOpen: true});
    this.props.onFocus(e);
  }

  handleKeyDown(e) {
    e.persist();
    if (this.state.menuOpen && this.state.filtered.length > 0) {
      this.setState((prevState, props) => {
        let menuOpen = prevState.menuOpen;
        let index = prevState.index;
        switch (e.keyCode) {
          case 13: //enter
            if (index != -1) {
              props.onChange(prevState.filtered[index])
              menuOpen = false;
              e.preventDefault();
            }
            break;
          case 38: //up
            if (prevState.index <= 0)
              index = prevState.filtered.length - 1;
            else index = prevState.index - 1;
            e.preventDefault();
            break;
          case 40: //down
            if (prevState.index >= prevState.filtered.length - 1)
              index = 0;
            else index = prevState.index + 1;
            e.preventDefault();
            break;
        }
        return {menuOpen, index};
      });
    }
  }

  handleBlur(e) {
    this.setState({menuOpen: false});
    this.props.onBlur(e);
  }

  render() {
    return (
      <_TextControl {...this.props}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onKeyDown={this.handleKeyDown}>
        <FormControl.Feedback>
          <Glyphicon glyph='chevron-down' />
        </FormControl.Feedback>
        {this.state.menuOpen && (this.state.filtered.length > 0) &&
          <ComboboxMenu {...this.props}
            items={this.state.filtered}
            index={this.state.index}/>}
      </_TextControl>
    )
  }
}

class _Checkbox extends React.Component {
  render() {
    return (
      <Checkbox onChange={this.props.onChange}>{this.props.label}</Checkbox>
    );
  }
}

class _MultiSelect extends React.Component {
  render() {
    return (
      <FormGroup controlId={this.props.id}>
        <FormControl componentClass='select' multiple>
          <option>lol</option>
        </FormControl>
      </FormGroup>
    );
  }
}

/** react-redux-form Control wrappers */

class ValidatedControl extends React.Component {
  render() {
    return (
      <Control.text {...this.props} model={'.' + this.props.id}
        mapProps={{
          pristine: ({fieldValue}) => fieldValue.pristine,
          valid: ({fieldValue}) => fieldValue.valid,
          focus: ({fieldValue}) => fieldValue.focus
        }}
        validators={{
          required: val => !this.props.required || val && val.length
        }} />
    )
  }
}

export class TextControl extends React.Component {
  render() {
    return (
      <ValidatedControl id={this.props.id} label={this.props.label}
        placeholder={this.props.placeholder}
        required={this.props.required} component={_TextControl} />
    );
  }
}

export class Combobox extends React.Component {
  render(){
    return (
      <ValidatedControl id={this.props.id} label={this.props.label}
        placeholder={this.props.placeholder} items={this.props.items}
        required={this.props.required} component={_Combobox} />
    );
  }
}

export class CheckboxControl extends React.Component {
  render() {
    return (
      <Control.checkbox model={'.' + this.props.id} label={this.props.label}
        component={_Checkbox} />
    );
  }
}

export class MultiSelect extends React.Component {
  render() {
    return (
      <Control.select model={'.' + this.props.id} id={this.props.id}
        label={this.props.label} component={_MultiSelect} />
    )
  }
}