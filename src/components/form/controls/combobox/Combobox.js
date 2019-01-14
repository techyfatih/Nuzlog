import React from "react";
import PropTypes from "prop-types";
import { List, AutoSizer } from "react-virtualized";

import "./Combobox.css";

import normalize from "utilities/normalize";

const filterChildren = (children, value) => {
  return React.Children.map(children, child => {
    let item = child;
    if (child.props && child.props.value) item = child.props.value;
    if (normalize(item).indexOf(normalize(value)) == -1) return;
    return child;
  });
};

class ComboboxMenu extends React.Component {
  constructor() {
    super();
    this.rowRenderer = this.rowRenderer.bind(this);
  }

  rowRenderer({ key, parent, index, style }) {
    return (
      <ListGroupItem
        href="#"
        key={key}
        style={style}
        tabIndex={-1}
        active={index == this.props.activeIndex}
        onClick={e => {
          e.preventDefault();
          this.props.onSelect(index);
        }}
      >
        {this.props.children[index]}
      </ListGroupItem>
    );
  }

  render() {
    const count = React.Children.count(this.props.children);
    const rowHeight = this.props.rowHeight ? this.props.rowHeight : 30;
    let height = count * rowHeight;
    if (height == 0) height = 30;
    else if (height > 150) height = 150;

    const scroll = this.props.activeIndex != -1 ? this.props.activeIndex : 0;
    return (
      <Panel className="combobox-dropdown" onMouseDown={this.props.onMouseDown}>
        <ListGroup fill>
          <AutoSizer disableHeight>
            {({ width }) => (
              <List
                height={height}
                width={width - 1}
                rowCount={count}
                rowHeight={rowHeight}
                rowRenderer={this.rowRenderer}
                noRowsRenderer={() => (
                  <ListGroupItem>
                    <em>No results</em>
                  </ListGroupItem>
                )}
                scrollToIndex={this.props.activeIndex}
                tabIndex={-1}
              />
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
      focus: false,
      menuOpen: false,
      filtered: props.children,
      activeIndex: -1
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.children != nextProps.children) {
      this.setState({
        filtered: nextProps.children
      });
    }
    if (nextProps.focus) this.input.focus();
  }

  handleChange(e) {
    const value = e.target.value;
    this.setState({
      menuOpen: true,
      filtered: filterChildren(this.props.children, value),
      activeIndex: -1
    });
    this.props.onChange(value);
  }

  handleKeyDown(e) {
    switch (e.keyCode) {
      case 40: //down
        this.setState(prevState => {
          let activeIndex = prevState.activeIndex + 1;
          const length = prevState.filtered ? prevState.filtered.length : 0;
          if (activeIndex >= length) activeIndex = -1;
          return { menuOpen: true, activeIndex };
        });
        e.preventDefault();
        break;
      case 38: //up
        this.setState(prevState => {
          let activeIndex = prevState.activeIndex - 1;
          const length = prevState.filtered ? prevState.filtered.length : 0;
          if (prevState.activeIndex < 0) activeIndex = length - 1;
          return { menuOpen: true, activeIndex };
        });
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

  handleFocus() {
    this.setState({ focus: true });
    if (typeof this.props.onFocus == "function") this.props.onFocus();
  }

  handleBlur() {
    this.setState(
      ({ mousedown }) => {
        if (mousedown) {
          return {
            mousedown: false,
            focus: true
          };
        } else {
          return {
            menuOpen: false,
            filtered: this.props.children,
            focus: false
          };
        }
      },
      () => (this.state.focus ? this.input.focus() : null)
    );
    if (typeof this.props.onBlur == "function") this.props.onBlur();
  }

  handleMouseDown() {
    this.setState(({ focus }) => ({ mousedown: focus }));
  }

  handleClick() {
    this.setState(({ menuOpen }) => ({
      menuOpen: !menuOpen,
      filtered: this.props.children,
      activeIndex: -1
    }));
    this.input.focus();
  }

  handleSelect(index) {
    let value = this.state.filtered[index];
    if (value.props && value.props.value) value = value.props.value;
    this.props.onChange(value);
    this.input.focus();
    this.setState({
      menuOpen: false,
      filtered: this.props.children,
      activeIndex: -1
    });
  }

  render() {
    return (
      <div className="combobox">
        <InputGroup>
          <FormControl
            spellCheck="false"
            id={this.props.id}
            placeholder={this.props.placeholder}
            value={this.props.value ? this.props.value : ""}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            inputRef={ref => (this.input = ref)}
          />

          <InputGroup.Button>
            <Button
              tabIndex={-1}
              onMouseDown={this.handleMouseDown}
              onClick={this.handleClick}
            >
              <Glyphicon
                glyph={!this.state.menuOpen ? "chevron-down" : "chevron-up"}
              />
            </Button>
          </InputGroup.Button>
        </InputGroup>

        {this.state.menuOpen && (
          <ComboboxMenu
            rowHeight={this.props.rowHeight}
            activeIndex={this.state.activeIndex}
            onMouseDown={this.handleMouseDown}
            onSelect={this.handleSelect}
          >
            {this.state.filtered}
          </ComboboxMenu>
        )}
      </div>
    );
  }
}

Combobox.propTypes = {
  id: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  children: PropTypes.array
};
