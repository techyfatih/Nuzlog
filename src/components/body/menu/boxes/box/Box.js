import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Panel, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import { connect } from 'react-redux';

import './Box.css'

import PokeSlot from 'components/pokemon/slot/PokeSlot';

class Box extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidUpdate(prevProps) {
    const {box, active} = this;
    if (active) {
      const top = active.offsetTop;
      const scrollTop = box.scrollTop;
      const height = box.offsetHeight;

      if (top > scrollTop + height) {
        box.scrollTop = top - height + active.offsetHeight;
      }
      else if (top < scrollTop) {
        box.scrollTop = top;
      }
    }
  }

  handleChange(index) {
    this.props.onChange(index);
  }

  handleClick(e) {
    if (e.target.value && e.target.value == this.props.index)
      this.props.onChange(-1);
  }

  render() {
    const {pokemon, box, index} = this.props;

    return (
      <Panel>
        <ToggleButtonGroup className='box' vertical
          type='radio'
          name='box'
          value={index}
          onChange={this.handleChange}
          ref={ref => this.box = ReactDOM.findDOMNode(ref)}>
          {box.map((val, key) => (
            <ToggleButton value={key} key={key}
              onClick={this.handleClick}
              ref={ref => {
                if (key == index) this.active = ReactDOM.findDOMNode(ref);
              }}>
              <PokeSlot pokemon={pokemon[box[key]]} />
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Panel>
    );
  }
}

Box.propTypes = {
  box: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    pokemon: state.pokemon,
  };
};

export default connect(mapStateToProps)(Box);