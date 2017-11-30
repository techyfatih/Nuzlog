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

  handleChange(slot) {
    this.props.onChange(slot);
  }

  handleClick(e) {
    const {value} = e.target;
    if (value && value == this.props.slot)
      this.props.onChange(-1);
  }

  render() {
    const {bsStyle, pokemon, box, slot} = this.props;

    return (
      <Panel>
        <Panel className='box' bsStyle={bsStyle}>
          <ToggleButtonGroup fill vertical
            type='radio'
            name='box'
            value={slot}
            onChange={this.handleChange}
            ref={ref => this.box = ReactDOM.findDOMNode(ref)}>
            {box.map((val, key) => (
              <ToggleButton value={key} key={key}
                onClick={this.handleClick}
                ref={ref => {
                  if (key == slot) this.active = ReactDOM.findDOMNode(ref);
                }}>
                <PokeSlot pokemon={pokemon[box[key]]} />
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Panel>
      </Panel>
    );
  }
}

Box.propTypes = {
  box: PropTypes.array.isRequired,
  slot: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    pokemon: state.pokemon,
  };
};

export default connect(mapStateToProps)(Box);