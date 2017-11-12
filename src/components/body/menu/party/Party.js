import React from 'react';
import { Panel, ToggleButtonGroup, ToggleButton,
  ButtonGroup, Button } from 'react-bootstrap';
import { connect } from 'react-redux'

import './Party.css';

import PokeSlot from 'components/pokemon/PokeSlot';
import PokeCard from 'components/pokemon/PokeCard';

import PartyOptions from './PartyOptions'

const six = [...Array(6).keys()];

class Party extends React.Component {
  constructor() {
    super();
    this.state = {
      index: -1
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(index) {
    this.setState({index});
  }

  handleClick(e) {
    if (e.target.value && e.target.value == this.state.index)
      this.setState({index: -1});
  }

  render() {
    const {party} = this.props;
    const {index} = this.state;

    return (
      <Panel id='party'>
        <div id='party-tabs' className='pull-left'>
          <ToggleButtonGroup vertical
            type='radio'
            name='party'
            value={this.state.index}
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

const mapStateToProps = state => {
  return {
    party: state.party
  };
};

export default connect(mapStateToProps)(Party);