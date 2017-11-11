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
      levelOpen: false,
      movesOpen: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.openLevel = this.openLevel.bind(this);
    this.closeLevel = this.closeLevel.bind(this);

    this.openMoves = this.openMoves.bind(this);
    this.closeMoves = this.closeMoves.bind(this);
  }

  handleChange(index) {
    this.setState({index});
  }

  handleClick(e) {
    if (e.target.value && e.target.value == this.state.index)
      this.setState({index: -1});
  }

  openLevel() {
    this.setState({levelOpen: true});
  }

  closeLevel() {
    this.setState({levelOpen: false});
  }

  openMoves() {
    this.setState({movesOpen: true});
  }

  closeMoves() {
    this.setState({movesOpen: false});
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
            <Button href='#' bsStyle='primary' onClick={this.openLevel}
              disabled={this.state.index == -1}>Level Up</Button>
            <Button href='#' bsStyle='warning' onClick={this.openMoves}
              disabled={this.state.index == -1}>Moves</Button>
            <Button href='#' bsStyle='warning'
              disabled={this.state.index == -1}>Item</Button>
            <Button href='#' bsStyle='success'
              disabled={this.state.index == -1}>Evolve</Button>
            <Button href='#' bsStyle='info'
              disabled={this.state.index == -1}>Deposit</Button>
            <Button href='#' bsStyle='danger'
              disabled={this.state.index == -1}>Death</Button>
          </ButtonGroup>
        </div>
        <div className='pull-right'>
          <PokeCard pokemon={this.props.party[this.state.index]} />
        </div>

        <LevelModal show={this.state.levelOpen} index={this.state.index}
          onHide={this.closeLevel} />
        <MovesModal show={this.state.movesOpen} index={this.state.index}
          onHide={this.closeMoves} />
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