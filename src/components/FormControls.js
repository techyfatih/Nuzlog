import './FormControls.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { FormGroup, ControlLabel, FormControl, Glyphicon, ListGroup, ListGroupItem } from 'react-bootstrap';

/** TextControl */

const ValidatedFormGroup = props => {
  return (
    <FormGroup controlId={props.id}
      validationState={props.required ? (props.value ? 'success' : 'error') : null}>
      {props.children}
    </FormGroup>
  );
}

class TextInput extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    if (this.props.focus)
      this.input.focus();
  }

  handleChange(e) {
    this.props.onChange(this.props.id, e.target.value);
  }

  render() {
    return (
      <FormControl type='text' 
        placeholder={this.props.placeholder}
        value={this.props.value}
        onChange={this.handleChange}
        onFocus={this.props.onFocus}
        onBlur={this.props.onBlur}
        onKeyDown={this.props.onKeyDown}
        inputRef={ref => this.input = ref} />
    );
  }
}

/** Combobox */

export class TextControl extends React.Component {
  render() {
    return (
      <ValidatedFormGroup {...this.props}>
        <ControlLabel>{this.props.label}</ControlLabel>
        <TextInput {...this.props} />
      </ValidatedFormGroup>
    );
  }
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
    this.props.onChange(this.props.id, e.target.text);
  }

  render() {
    return (
      <ListGroup className='custom-dropdown'>
        {this.props.items.map((item, key) => {
          const isActive = key == this.props.index;
          return (
            <ListGroupItem href='#' key={key}
              active={isActive}
              onMouseDown={this.handleMouseDown}
              ref={ref => {if (isActive) this.activeItem = ref}}>
              {item}
            </ListGroupItem>
          );
        })}
      </ListGroup>
    );
  }
}

const normalize = str => {
  return str.toLowerCase().replace(/é/g, 'e');
}

const filter = (items, value) => {
  return items.filter(item => {
    return normalize(item).indexOf(normalize(value)) !== -1;
  });
}

export class Combobox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      filtered: filter(props.items, props.value),
      index: -1,
      selected: props.value
    };
    this.openMenu = this.openMenu.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
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

  openMenu() {
    this.setState({menuOpen: true});
  }

  handleKeyDown(e) {
    const key = e.keyCode;
    if (key == 38 || key == 40) e.preventDefault();
    if (this.state.menuOpen && this.state.filtered.length > 0) {
      this.setState((prevState, props) => {
        var index = prevState.index;
        switch (key) {
          case 13: //enter
            if (index != -1)
              props.onChange(props.id, prevState.filtered[index])
            break;
          case 38: //up
            if (prevState.index <= 0)
              index = prevState.filtered.length - 1;
            else index = prevState.index - 1;
            break;
          case 40: //down
            if (prevState.index >= prevState.filtered.length - 1)
              index = 0;
            else index = prevState.index + 1;
            break;
        }
        return {index};
      });
    }
  }

  closeMenu() {
    this.setState({menuOpen: false});
  }

  render() {
    return (
      <ValidatedFormGroup {...this.props} >
        <ControlLabel>{this.props.label}</ControlLabel>
        <TextInput {...this.props}
          onFocus={this.openMenu}
          onBlur={this.closeMenu}
          onKeyDown={this.handleKeyDown} />
        <FormControl.Feedback>
          <Glyphicon glyph='chevron-down' />
        </FormControl.Feedback>
        {this.state.menuOpen && (this.state.filtered.length > 0) &&
          <ComboboxMenu {...this.props}
            items={this.state.filtered}
            index={this.state.index}/>
        }
      </ValidatedFormGroup>
    )
  }
}