import React from 'react';
import { Panel, ToggleButtonGroup, ToggleButton,
  ButtonGroup, Button } from 'react-bootstrap';
import { connect } from 'react-redux'

import './Party.css';

import PokeSlot from 'components/pokemon/PokeSlot';
import PokeCard from 'components/pokemon/PokeCard';
import LevelModal from './LevelModal';
import MovesModal from './MovesModal';

const six = [...Array(6).keys()];

class PartyView extends React.Component {
  constructor() {
    super();
    this.state = {
      index: -1,
      level: false,
      form: false,
      moves: false,
      item: false,
      evolve: false,
      deposit: false,
      death: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  handleChange(index) {
    this.setState({index});
  }

  handleClick(e) {
    if (e.target.value && e.target.value == this.state.index)
      this.setState({index: -1});
  }

  open(modal) {
    this.setState({[modal]: true});
  }

  close(modal) {
    this.setState({[modal]: false});
  }

  render() {
    return (
      <Panel id='party'>
        <div id='party-tabs' className='pull-left'>
          <ToggleButtonGroup vertical
            type='radio'
            name='party'
            value={this.state.index}
            onChange={this.handleChange}>
            {six.map(index => (
              <ToggleButton value={index} key={index}
                disabled={!this.props.party[index]}
                onClick={this.handleClick}>
                <PokeSlot pokemon={this.props.party[index]} />
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
          <ButtonGroup id='party-options' vertical block>
            <Button href='#' bsStyle='primary'
              disabled={this.state.index == -1}
              onClick={() => this.open('level')}>
              Level Up
            </Button>
            <Button href='#' bsStyle='warning'
              onClick={() => this.open('moves')}
              disabled={this.state.index == -1}>
              Moves
            </Button>
            <Button href='#' bsStyle='warning'
              onClick={() => this.open('item')}
              disabled={this.state.index == -1}>
              Item
            </Button>
            <Button href='#' bsStyle='success'
              onClick={() => this.open('evolve')}
              disabled={this.state.index == -1}>
              Evolve
            </Button>
            <Button href='#' bsStyle='info'
              onClick={() => this.open('deposit')}
              disabled={this.state.index == -1}>
              Deposit
            </Button>
            <Button href='#' bsStyle='danger'
              onClick={() => this.open('death')}
              disabled={this.state.index == -1}>
              Death
            </Button>
          </ButtonGroup>
        </div>
        <div className='pull-right'>
          <PokeCard pokemon={this.props.party[this.state.index]} />
        </div>

        <LevelModal show={this.state.level} index={this.state.index}
          onHide={() => this.close('level')} />
        <MovesModal show={this.state.moves} index={this.state.index}
          onHide={() => this.close('moves')} />
      </Panel>
    );
  }
}

const mapStateToProps = state => {
  return {
    party: state.party
  };
};

const Party = connect(mapStateToProps)(PartyView);
export default Party;