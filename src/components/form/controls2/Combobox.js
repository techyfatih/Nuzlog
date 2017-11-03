import React from 'react';
import ReactDOM from 'react-dom';
import { FormGroup, InputGroup, FormControl, ControlLabel, Button, Glyphicon, Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import { List, AutoSizer } from 'react-virtualized';
import { Control } from 'react-redux-form';

import './Combobox.css';

const normalize = str => {
  if (typeof str == 'string')
    return str.trim().toLowerCase().replace(/é/g, 'e');
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
    this.rowRenderer = this.rowRenderer.bind(this);
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

  handleClick(e) {
    this.props.onSelect(e.target.text);
  }

  rowRenderer({key, index, style}) {
    let item = this.props.items[index];
    if (Array.isArray(item))
      item = item[1];
    return (
      <ListGroupItem href='#'
        key={key}
        style={style}
        tabIndex={-1}
        active={index == this.props.activeIndex}
        onClick={this.handleClick}>
        {item}
      </ListGroupItem>
    )
  }

  render() {
    const rowHeight = this.props.rowHeight ? this.props.rowHeight : 30;
    return (
      <Panel className='combobox-dropdown'
        onMouseDown={this.props.onMouseDown}>
        <ListGroup fill>
          <AutoSizer disableHeight>
            {({width}) => (
              <List
                height={Math.min(150, this.props.items.length * rowHeight)}
                width={width-1}
                rowCount={this.props.items.length}
                rowHeight={rowHeight}
                rowRenderer={this.rowRenderer}
                scrollToIndex={this.props.activeIndex}
                tabIndex={-1}/>
            )}
          </AutoSizer>
        </ListGroup>
      </Panel>
    );
  }
}

export default class Combobox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mousedown: false,
      menuOpen: false,
      filtered: filter(props.items, props.value),
      activeIndex: -1
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      filtered: filter(nextProps.items, nextProps.value),
      activeIndex: -1
    });
    if (nextProps.focus)
      this.input.focus();
  }

  handleChange(value) {
    this.setState({menuOpen: true});
    this.props.onChange(value);
  }

  handleKeyDown(e) {
    switch (e.keyCode) {
      case 40: //down
        this.setState(prevState => {
          let activeIndex = prevState.activeIndex + 1;
          if (activeIndex >= prevState.filtered.length)
            activeIndex = -1;
          return {menuOpen: true, activeIndex};
        })
        e.preventDefault();
        break;
      case 38: //up
        this.setState(prevState => {
          let activeIndex = prevState.activeIndex - 1;
          if (prevState.activeIndex < 0)
            activeIndex = prevState.filtered.length - 1;
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

  handleBlur(e) {
    this.setState(({mousedown}) => {
      if (mousedown) return {mousedown: false};
      else return {menuOpen: false};
    });
    if (typeof this.props.onBlur == 'function')
      this.props.onBlur(e);
  }

  handleMouseDown() {
    this.setState((s, {focus}) => ({mousedown: focus}));
  }

  handleClick() {
    this.setState(({menuOpen}) => ({menuOpen: !menuOpen}));
    this.input.focus();
  }

  handleSelect(value) {
    this.setState({menuOpen: false});
    if (Array.isArray(value))
      value = value[0];
    this.props.onChange(value);
    this.input.focus();
  }

  render() {
    return (
      <FormGroup className='combobox' controlId={this.props.id}
        validationState={
          !this.props.required || this.props.pristine
          ? null : (this.props.valid ? 'success' : 'error')}
        ref={ref=> this.group = ReactDOM.findDOMNode(ref)}>
        {this.props.label && <ControlLabel>{this.props.label}</ControlLabel>}
        <InputGroup>
          <FormControl type='text'
            placeholder={this.props.placeholder}
            value={this.props.value}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            onFocus={this.props.onFocus}
            onBlur={this.handleBlur}
            inputRef={ref => this.input = ref} />
          <InputGroup.Button>
            <Button tabIndex={-1}
              onMouseDown={this.handleMouseDown}
              onClick={this.handleClick}>
              <Glyphicon
                glyph={!this.state.menuOpen ? 'chevron-down' : 'chevron-up'}/>
            </Button>
          </InputGroup.Button>
        </InputGroup>
        {this.state.menuOpen &&
        <ComboboxMenu
          items={this.state.filtered}
          activeIndex={this.state.activeIndex}
          onMouseDown={this.handleMouseDown}
          onSelect={this.handleSelect} />}
      </FormGroup>
    );
  }
}

export class RRFCombobox extends React.Component {
  render() {
    return (
      <Control.text
        model={this.props.model}
        id={this.props.model}
        required={this.props.required}
        label={this.props.label}
        placeholder={this.props.placeholder}
        component={Combobox}
        items={this.props.items}
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