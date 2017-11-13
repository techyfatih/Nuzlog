import React from 'react';
import { Modal, Panel, Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';

import pokedex from 'data/pokedex';
import abilities from 'data/abilities';

import normalize from 'utilities/normalize';
import getPokemon from 'utilities/getPokemon';

import PokeIcon from 'components/pokemon/PokeIcon';
import PokeSprite from 'components/pokemon/PokeSprite';

import RRForm from 'components/form/RRForm';
import RRFPokemon from 'components/form/RRFPokemon';
import { RRFCombobox } from 'components/form/RRFControls';

import { evolve } from 'actions';

class EvolveModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: getPokemon(),
      forms: ['Normal']
    };

    this.handleEnter = this.handleEnter.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
  }

  handleEnter() {
    this.dispatch(actions.focus('local.form'));
  }

  handleChange(species) {
  }

  handleSubmit(values) {
    this.props.onEvolve(this.props.index, values.species, values.ability);
    this.props.onHide();
  }

  render() {
    return (
      <Modal show={this.props.show}
        onEnter={this.handleEnter} onHide={this.props.onHide}>
        <RRForm getDispatch={dispatch => this.dispatch = dispatch}
          onUpdate={this.handleUpdate} onSubmit={this.handleSubmit}>
          <Modal.Header closeButton><h2>Evolve</h2></Modal.Header>
          <Modal.Body>
            <p><PokeIcon pokemon={this.state.pokemon} /> {this.state.pokemon.name}</p>
            <PokeSprite pokemon={this.state.pokemon} />
            <Row>
              <Col sm={6}>
                <RRFPokemon model='.species' label='Pokemon*' required
                  onChange={this.handleChange} />
              </Col>
              <Col sm={6}>
                <RRFCombobox model='.ability' label='Ability'>
                  {abilities}
                </RRFCombobox>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button type='submit' bsStyle='success' bsSize='large' block>
              Evolve
            </Button>
          </Modal.Footer>
        </RRForm>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    party: state.party
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onEvolve: (index, species, ability) => {
      dispatch(evolve(index, species, ability));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EvolveModal);