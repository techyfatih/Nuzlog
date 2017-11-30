import React from 'react';
import PropTypes from 'prop-types';
import { Panel, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import { connect } from 'react-redux'

import PokeSlot from 'components/pokemon/slot/PokeSlot';
import { switchSlot } from 'actions';

const six = [0, 1, 2, 3, 4, 5];

class Party extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(index) {
    this.props.switchSlot(index);
  }

  handleClick(e) {
    const {value} = e.target;
    if (value && value == this.props.slot)
      this.props.switchSlot(-1);
  }

  render() {
    const {pokemon, party, slot} = this.props;

    return (
      <Panel>
        <Panel className='no-margin' bsStyle='info'>
          <ToggleButtonGroup vertical block fill
            type='radio'
            name='party'
            value={slot}
            onChange={this.handleChange}>
            {six.map(key => (
              <ToggleButton value={key} key={key}
                disabled={party[key] == null}
                onClick={this.handleClick}>
                <PokeSlot pokemon={pokemon[party[key]]} />
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Panel>
      </Panel>
    );
  }
};

const mapStateToProps = state => {
  return {
    pokemon: state.pokemon,
    party: state.party,
    slot: state.partySlot
  };
};

const mapDispatchToProps = dispatch => {
  return {
    switchSlot: slot => {
      dispatch(switchSlot(1, slot));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Party);