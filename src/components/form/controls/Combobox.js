import React from 'react';
import { FormGroup, ControlLabel, InputGroup, FormControl, Button, Glyphicon,
  Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import { List, AutoSizer,
  CellMeasurer, CellMeasurerCache } from 'react-virtualized';

import './Combobox.css';
import '../Controls.css';

import normalize from 'utilities/normalize';

const filterChildren = (children, value) => {
  return React.Children.map(children, child => {
    let item = child;
    if (child.props && child.props.value) item = child.props.value;
    if (normalize(item).indexOf(normalize(value)) == -1)
      return;
    return child;
  })
};

class ComboboxMenu extends React.Component {
  constructor() {
    super();
    this.cache = new CellMeasurerCache({
      fixedWidth: true,
      minHeight: 30
    })
    this.rowRenderer = this.rowRenderer.bind(this);
  }

  rowRenderer({key, parent, index, style}) {
    return (
      <ListGroupItem
        href='#'
        key={key}
        style={style}
        tabIndex={-1}
        active={index == this.props.activeIndex}
        onClick={() => this.props.onSelect(index)}>
        {this.props.children[index]}
      </ListGroupItem>
    )
  }

  render() {
    const count = React.Children.count(this.props.children);
    const rowHeight = this.props.rowHeight ? this.props.rowHeight : 30;
    let height = count * rowHeight;
    if (height == 0) height = 30;
    else if (height > 150) height = 150;

    const scroll = this.props.activeIndex != -1 ? this.props.activeIndex : 0;
    return (
      <Panel className='combobox-dropdown'
        onMouseDown={this.props.onMouseDown}>
        <ListGroup fill>
          <AutoSizer disableHeight>
            {({width}) => (
              <List
                height={height}
                width={width-1}
                rowCount={count}
                rowHeight={rowHeight}
                rowRenderer={this.rowRenderer}
                noRowsRenderer={() => (
                  <ListGroupItem><em>No results</em></ListGroupItem>
                )}
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
      filtered: filterChildren(props.children, props.value),
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
    if (this.props.children != nextProps.children ||
        this.props.value != nextProps.value) {
      this.setState({
        filtered: filterChildren(nextProps.children, nextProps.value),
        activeIndex: -1
      });
    }
    if (nextProps.focus)
      this.input.focus();
  }

  handleChange(e) {
    this.setState({menuOpen: true});
    this.props.onChange(e.target.value);
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
          this.handleSelect(this.state.activeIndex);
          e.preventDefault();
        }
        break;
    }
  }

  handleBlur(e) {
    this.setState(({mousedown}) => {
      if (mousedown) {
        this.input.focus();
        return {mousedown: false};
      }
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

  handleSelect(index) {
    this.setState({menuOpen: false});
    let value = this.state.filtered[index];
    if (value.props && value.props.value) value = value.props.value;
    this.props.onChange(value);
    this.input.focus();
  }

  render() {
    return (
      <FormGroup className='combobox' controlId={this.props.id}
        validationState={
          !this.props.required || this.props.pristine
          ? null : (this.props.valid ? 'success' : 'error')}>
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
          rowHeight={this.props.rowHeight}
          activeIndex={this.state.activeIndex}
          onMouseDown={this.handleMouseDown}
          onSelect={this.handleSelect}>
          {this.state.filtered}
        </ComboboxMenu>}
      </FormGroup>
    );
  }
}