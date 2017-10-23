import React from 'react';
import ReactDOM from 'react-dom';
import { FormGroup, ControlLabel, InputGroup, FormControl, Button, Glyphicon,
  Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Control } from 'react-redux-form';

import './Combobox.css';

const normalize = str => {
  if (str) return str.toLowerCase().replace(/é/g, 'e');
  return '';
}

const filter = (items, value) => {
  return items.filter(item => {
    return normalize(item).indexOf(normalize(value)) !== -1;
  });
}

class _ComboboxMenu extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidUpdate() {
    if (this.activeItem)
      ReactDOM.findDOMNode(this.activeItem).scrollIntoView({block: 'nearest'});
  }

  handleClick(e) {
    this.props.onSelect(e.target.text);
  }

  render() {
    return (
      <Panel className='combobox-dropdown'
        hidden={!this.props.open || this.props.items.length == 0}>
        <ListGroup fill>
          {this.props.items.map((item, key) => {
            const isActive = key == this.props.activeIndex;
            return (
              <ListGroupItem
                href='#'
                key={key}
                tabIndex={-1}
                active={isActive}
                onClick={this.handleClick}
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
      activeIndex: -1,
      selected: props.value
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.clickListener = e => {
      if (this.state.menuOpen && !this.group.contains(e.target))
        this.setState({menuOpen: false});
    };
  }

  componentDidMount() {
    document.addEventListener('click', this.clickListener);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.clickListener);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(prevState => {
      var activeIndex = prevState.activeIndex;
      var selected = prevState.selected;
      if (selected != nextProps.value) {
        activeIndex = -1;
        selected = nextProps.value;
      }
      return {
        filtered: filter(nextProps.items, nextProps.value),
        activeIndex,
        selected
      };
    });
  }

  componentDidUpdate() {
    if (this.props.focus)
      this.input.focus();
  }

  handleChange(e) {
    this.setState({menuOpen: true});
    this.props.onChange(e);
  }

  handleKeyDown(e) {
    switch (e.keyCode) {
      case 40: //down
        this.setState(prevState => {
          let activeIndex = -1;
          if (prevState.activeIndex < prevState.filtered.length - 1)
            activeIndex = prevState.activeIndex + 1;
          return {menuOpen: true, activeIndex};
        })
        e.preventDefault();
        break;
      case 38: //up
        this.setState(prevState => {
          let activeIndex = prevState.filtered.length - 1;
          if (prevState.activeIndex >= 0)
            activeIndex = prevState.activeIndex - 1;
          return {menuOpen: true, activeIndex};
        })
        e.preventDefault();
        break;
      case 13: //enter
        if (this.state.activeIndex != -1) {
          this.handleSelect(this.state.filtered[this.state.activeIndex]);
          e.preventDefault();
        }
        break;
    }
  }

  handleClick() {
    this.setState(prevState => {return {menuOpen: !prevState.menuOpen}});
  }

  handleSelect(val) {
    this.setState({menuOpen: false});
    this.props.onChange(val);
  }

  render() {
    return (
      <FormGroup className='combobox'
        controlId={this.props.id}
        validationState={
          !this.props.required || this.props.pristine
          ? null : (this.props.valid ? 'success' : 'error')}>
        {this.props.label && <ControlLabel>{this.props.label}</ControlLabel>}
        <InputGroup ref={ref => this.group = ReactDOM.findDOMNode(ref)}>
          <FormControl
            type='text'
            placeholder={this.props.placeholder}
            value={this.props.value}
            onFocus={this.props.onFocus}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            onBlur={this.props.onBlur}
            inputRef={ref => this.input = ref} />
          <InputGroup.Button>
            <Button onClick={this.handleClick} tabIndex={-1}>
              <Glyphicon glyph='chevron-down'/>
            </Button>
          </InputGroup.Button>
        </InputGroup>
        <_ComboboxMenu
          open={this.state.menuOpen}
          items={this.state.filtered}
          activeIndex={this.state.activeIndex}
          onSelect={this.handleSelect} />
      </FormGroup>
    )
  }
}

export default class ComboboxControl extends React.Component {
  render(){
    return (
      <Control.text
        model={'.' + this.props.id}
        id={this.props.id}
        label={this.props.label}
        placeholder={this.props.placeholder}
        items={this.props.items}
        required={this.props.required}
        component={_Combobox}
        mapProps={{
          pristine: ({fieldValue}) => fieldValue.pristine,
          valid: ({fieldValue}) => fieldValue.valid,
          focus: ({fieldValue}) => fieldValue.focus
        }}
        validators={{
          required: val => !this.props.required || val && val.length
        }} />
    );
  }
}