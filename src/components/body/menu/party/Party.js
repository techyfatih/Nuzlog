import React from 'react';
import PropTypes from 'prop-types';
import { Panel, ToggleButtonGroup, ToggleButton, ButtonGroup,
  Button } from 'react-bootstrap';
import { connect } from 'react-redux'

import './Party.css';

import PokeSlot from 'components/pokemon/PokeSlot';
import PokeCard from 'components/pokemon/PokeCard';

import PartyOptions from './PartyOptions'

const six = [...Array(6).keys()];

export default class Party extends React.Component {
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
    const {party, index} = this.props;

    return (
      <Panel id='party'>
        <div id='party-tabs' className='pull-left'>
          <ToggleButtonGroup vertical
            type='radio'
            name='party'
            value={index}
            onChange={this.handleChange}>
            {six.map(key => (
              <ToggleButton value={key} key={key}
                disabled={!party[key]}
                onClick={this.handleClick}>
                <PokeSlot pokemon={party[key]} />
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
          <PartyOptions index={index} />
        </div>
        <div className='pull-right'>
          <PokeCard pokemon={party[index]} bsStyle='info' />
        </div>
      </Panel>
    );
  }
};

Party.propTypes = {
  party: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
}