import React from 'react';
import ReactDOM from 'react-dom';
import { InputGroup, Button, Glyphicon, Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import { OrderedMap } from 'immutable';

import { EnhancedGroup, EnhancedControl } from './Input';
import enhanceControl from './enhanceControl';

import './Combobox.css';

const normalize = str => {
  if (typeof str == 'string')
    return str.toLowerCase().replace(/é/g, 'e');
  return '';
}

const filter = (items, value) => {
  return items.filter(item => {
    if (Array.isArray(item))
      item = item[0];
    return normalize(item).indexOf(normalize(value)) !== -1;
  });
}

class ComboboxMenu extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.activeIndex != nextProps.activeIndex) {
      return true;
    }

    if (this.props.items.length != nextProps.items.length)
      return true;
    
    for (let i = 0; i < this.props.items.length; i++) {
      let item1 = this.props.items[i];
      let item2 = nextProps.items[i];
      if (item1.length != item2.length)
        return true;
      
      for (let j = 0; j < item1.length; j++) {
        if (item1[j] != item2[j])
          return true;
      }
    }
    return false;
  }

  componentDidUpdate() {
    if (this.activeItem)
      ReactDOM.findDOMNode(this.activeItem).scrollIntoView({block: 'nearest'});
    else ReactDOM.findDOMNode(this).parentNode.scrollTop = 0;
  }

  handleClick(e) {
    this.props.onSelect(e.target.text);
  }

  render() {
    return (
      <ListGroup>
        {this.props.items.map((item, key) => {
          if (Array.isArray(item))
            item = item[1];
          const isActive = key == this.props.activeIndex;
          return (
            <ListGroupItem href='#' key={key} tabIndex={-1} active={isActive}
              onClick={this.handleClick}
              ref={ref => {if (isActive) this.activeItem = ref}}>
              {item}
            </ListGroupItem>
          );
        })}
      </ListGroup>
    );
  }
}

class Combobox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      filtered: filter(props.items, props.value),
      activeIndex: -1,
      selected: props.value
    };
    this.getInput = this.getInput.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  getInput(ref) {
    this.input = ref;
    this.props.getInput(ref);
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

  handleClick(e) {
    if (this.state.menuOpen && !this.group.contains(e.target))
      this.closeMenu();
  }

  openMenu() {
    this.setState({menuOpen: true});
    document.addEventListener('click', this.handleClick);
  }

  closeMenu() {
    this.setState({menuOpen: false});
    document.removeEventListener('click', this.handleClick);
  }

  handleChange(value) {
    this.openMenu();
    this.props.onChange(value);
  }

  handleKeyDown(e) {
    switch (e.keyCode) {
      case 40: //down
        this.openMenu();
        this.setState(prevState => {
          let activeIndex = -1;
          if (prevState.activeIndex < prevState.filtered.length - 1)
            activeIndex = prevState.activeIndex + 1;
          return {activeIndex};
        })
        e.preventDefault();
        break;
      case 38: //up
        this.openMenu();
        this.setState(prevState => {
          let activeIndex = prevState.filtered.length - 1;
          if (prevState.activeIndex >= 0)
            activeIndex = prevState.activeIndex - 1;
          return {activeIndex};
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

  handleButtonClick() {
    if (!this.state.menuOpen) {
      this.openMenu();
      this.input.focus();
    } else this.closeMenu();
  }

  handleSelect(value) {
    this.closeMenu();
    if (Array.isArray(value))
      value = value[0];
    this.props.onChange(value);
  }

  render() {
    return (
      <EnhancedGroup className='combobox' {...this.props}>
        <InputGroup ref={ref => this.group = ReactDOM.findDOMNode(ref)}>
          <EnhancedControl {...this.props}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            inputRef={this.getInput} />
          <InputGroup.Button>
            <Button onClick={this.handleButtonClick} tabIndex={-1}>
              <Glyphicon glyph='chevron-down'/>
            </Button>
          </InputGroup.Button>
        </InputGroup>
        <Panel className='combobox-dropdown'
          hidden={!this.state.menuOpen || this.state.filtered.length == 0}>
          <ComboboxMenu fill
            items={this.state.filtered}
            activeIndex={this.state.activeIndex}
            onSelect={this.handleSelect} />
        </Panel>
      </EnhancedGroup>
    );
  }
}

export default enhanceControl(Combobox);