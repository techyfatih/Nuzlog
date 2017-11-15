import React from 'react';
import PropTypes from 'prop-types';
import { Panel, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import { connect } from 'react-redux'

import PokeSlot from 'components/pokemon/slot/PokeSlot';

const six = [0, 1, 2, 3, 4, 5];

class Party extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(index) {
    this.props.onChange(index);
  }

  handleClick(e) {
    if (e.target.value && e.target.value == this.props.index)
      this.props.onChange(-1);
  }

  render() {
    const {pokemon, party, index} = this.props;

    return (
      <Panel>
        <ToggleButtonGroup vertical block
          type='radio'
          name='party'
          value={index}
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
    );
  }
};

Party.propTypes = {
  index: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    pokemon: state.pokemon,
    party: state.party
  };
};

export default connect(mapStateToProps)(Party);