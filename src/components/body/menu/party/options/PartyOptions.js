import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import LevelModal from './LevelModal';
import FormModal from './FormModal';
import MovesModal from './MovesModal';
import ItemModal from './ItemModal';
import EvolveModal from './EvolveModal';
import DeathModal from './DeathModal';

import { deposit } from 'actions';

class PartyOptions extends React.Component {
  constructor() {
    super();
    this.state = {
      level: false,
      form: false,
      moves: false,
      item: false,
      evolve: false,
      death: false
    };
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  open(modal) {
    this.setState({[modal]: true});
  }

  close(modal) {
    this.setState({[modal]: false});
  }

  render() {
    const {index} = this.props;
    const {level, form, moves, item, evolve, death} = this.state;
    const disabled = index == -1;
    const close = this.close;

    return (
      <div>
        <ButtonGroup id='party-options' vertical block>
          <Button href='#' bsStyle='primary' disabled={disabled}
            onClick={() => this.open('level')}>
            Level Up
          </Button>

          <Button href='#' bsStyle='warning' disabled={disabled}
            onClick={() => this.open('form')}>
            Form
          </Button>

          <Button href='#' bsStyle='warning' disabled={disabled}
            onClick={() => this.open('moves')}>
            Moves
          </Button>

          <Button href='#' bsStyle='warning' disabled={disabled}
            onClick={() => this.open('item')}>
            Item
          </Button>

          <Button href='#' bsStyle='success' disabled={disabled}
            onClick={() => this.open('evolve')}>
            Evolve
          </Button>

          <Button href='#' bsStyle='info' disabled={disabled}
            onClick={() => this.props.onDeposit(index)}>
            Deposit
          </Button>

          <Button href='#' bsStyle='danger' disabled={disabled}
            onClick={() => this.open('death')}>
            Death
          </Button>
        </ButtonGroup>

        <LevelModal show={level} index={index} onHide={() => close('level')} />
        <FormModal show={form} index={index} onHide={() => close('form')} />
        <MovesModal show={moves} index={index} onHide={() => close('moves')} />
        <ItemModal show={item} index={index} onHide={() => close('item')} />
        <EvolveModal show={evolve} index={index} onHide={()=>close('evolve')} />
        <DeathModal show={death} index={index} onHide={() => close('death')} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onDeposit: index => {
      dispatch(deposit(index))
    }
  }
}

export default connect(null, mapDispatchToProps)(PartyOptions)