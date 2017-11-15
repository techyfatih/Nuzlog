import React from 'react';
import { Modal, Panel, Checkbox, Button, Row, Col, ControlLabel,
  Form } from 'react-bootstrap';
import { Control, actions } from 'react-redux-form';
import { connect } from 'react-redux';

import natures from 'data/natures.json';
import abilities from 'data/abilities.json';

import male from 'img/male.png';
import female from 'img/female.png';

import PokeSlot from 'components/pokemon/slot/PokeSlot';
import PokeSprite from 'components/pokemon/sprite/PokeSprite';

import RRForm from 'components/form/RRForm';
import RRFPokemon from 'components/form/RRFPokemon';
import RRFForms from 'components/form/RRFForms';
import { RRFText, RRFCombobox, RRFNumber, RRFToggle, RRFSelect,
  RRFMoves } from 'components/form/RRFControls';
import { death } from 'actions';

class DeathModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEnter() {
    this.dispatch(actions.change('local.cause', ''));
    this.dispatch(actions.focus('local.cause'));
    this.dispatch(actions.setPristine('local'));
  }

  handleSubmit(values) {
    const {pokemon} = this.props;
    if (pokemon) {
      this.props.onDeath(pokemon.index, values.cause);
      this.props.onHide();
    }
  }

  render() {
    return (
      <Modal
        show={this.props.show}
        onEnter={this.handleEnter}
        onHide={this.props.onHide}>
        <RRForm
          getDispatch={dispatch => this.dispatch = dispatch}
          onSubmit={this.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Death</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <PokeSlot pokemon={this.props.pokemon} />
            <RRFText model='.cause' placeholder='Freaking crit' required />
          </Modal.Body>

          <Modal.Footer>
            <h4 style={{color: 'red'}}>
              WARNING: Once a Pokémon dies, you cannot bring it back to life!
            </h4>
            <Button type='submit' bsStyle='danger' bsSize='large' block>
              Death
            </Button>
          </Modal.Footer>
        </RRForm>
      </Modal>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onDeath: (index, cause) => {
      dispatch(death(index, cause));
    }
  };
};

export default connect(null, mapDispatchToProps)(DeathModal);