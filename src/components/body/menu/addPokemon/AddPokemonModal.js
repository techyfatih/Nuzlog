import React from 'react';
import { Modal, Media, Panel, Checkbox, Button, Row, Col, ControlLabel,
  Form } from 'react-bootstrap';
import { Control, actions } from 'react-redux-form';
import { connect } from 'react-redux';

import './AddPokemon.css';

import pokedex from 'data/pokedex';
import natures from 'data/natures.json';
import abilities from 'data/abilities.json';

import male from 'img/male.png';
import female from 'img/female.png';
import icons from 'img/icons';

import normalize from 'utilities/normalize';

import PokeIcon from 'components/pokemon/PokeIcon';
import PokeSprite from 'components/pokemon/PokeSprite';

import RRForm from 'components/form/RRForm';
import RRFPokemon from 'components/form/RRFPokemon';
import RRFForms from 'components/form/RRFForms';
import { RRFText, RRFCombobox, RRFNumber, RRFToggle, RRFSelect,
  RRFMoves } from 'components/form/RRFControls';
import { addPokemon } from 'actions';
import Pokemon from 'components/pokemon/Pokemon';

class AddPokemonModal extends React.Component {
  constructor(props) {
    super(props);

    this.initial = {
      pokemon: null
    }
    this.state = this.initial;

    this.handleEnter = this.handleEnter.bind(this);
    this.changeSpecies = this.changeSpecies.bind(this);
    this.changeGender = this.changeGender.bind(this);
    this.changeShiny = this.changeShiny.bind(this);
    this.changeForm = this.changeForm.bind(this);
    this.updatePokemon = this.updatePokemon.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleEnter() {
    this.setState(this.initial);
    this.dispatch(actions.change('local.location', this.props.location));
    this.dispatch(actions.setPristine('local'));
    this.dispatch(actions.focus('local.species'));
  }

  changeSpecies(species) {
    let gender = '';

    let pokemon = pokedex.get(normalize(species));
    if (pokemon) {
      gender = pokemon.gender[0];
      this.dispatch(actions.change('local.gender', gender));
    }
    this.updatePokemon({species, gender, form: ''});
    this.dispatch(actions.change('local.form', ''));
  }

  changeGender(gender) {
    this.updatePokemon({gender});
  }

  changeShiny(e) {
    this.updatePokemon({shiny: e.target.checked});
  }

  changeForm(form) {
    this.updatePokemon({form});
  }

  updatePokemon(pokemon) {
    this.setState(prevState => {
      return {
        pokemon: {...prevState.pokemon, ...pokemon}
      };
    });
  }

  handleUpdate(form) {
    //console.log(form);
  }

  handleSubmit(values) {
    console.log(values.moves.filter(move => move));
    this.props.onAddPokemon({
      species: values.species,
      nickname: values.nickname,
      gender: values.gender,
      level: values.level,
      shiny: values.shiny,
      form: values.form,
      nature: values.nature,
      ability: values.ability,
      moves: values.moves.filter(move => move),
      item: values.item,
      method: values.method,
      location: values.location
    });
    this.props.onHide();
  }

  render() {
    return (
      <Modal
        show={this.props.show}
        onEnter={this.handleEnter}
        onHide={this.props.onHide}>
        <RRForm
          getDispatch={dispatch => this.dispatch = dispatch}
          onUpdate={this.handleUpdate}
          onSubmit={this.handleSubmit}>
          <Modal.Header><h2>Add Pokémon</h2></Modal.Header>
          <Modal.Body>
            <Panel id='add-pokemon' header={
              <Media>
                <Media.Left align='middle'>
                  <PokeIcon pokemon={this.state.pokemon} />
                </Media.Left>
                <Media.Body>
                  <Row>
                    <Col xs={6}>
                      <RRFPokemon model='.species' label='Pokemon*'
                        placeholder='Bulbasaur' required
                        onChange={this.changeSpecies} />
                    </Col>
                    <Col xs={6}>
                      <RRFText model='.nickname' label='Nickname'
                        placeholder='Bulby' />
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={4} xs={6}>
                      <RRFToggle type='radio' model='.gender' label='Gender'
                        onChange={this.changeGender}>
                        <img src={male} value='M' />
                        <img src={female} value='F' />
                        <span value='N'>N/A</span>
                      </RRFToggle>
                    </Col>
                    <Col xs={6}>
                      <RRFNumber model='.level' label='Level'
                        placeholder='1-100' />
                    </Col>
                    <Col sm={2}>
                      <Control.checkbox model='.shiny' component={Checkbox}
                        onChange={this.changeShiny}>
                        Shiny
                      </Control.checkbox>
                    </Col>
                  </Row>
                </Media.Body>
              </Media>
            }>
              <PokeSprite pokemon={this.state.pokemon} />
              <Row>
                <Col xs={6}>
                  <RRFForms model='.form' label='Form' placeholder='Normal'
                    pokemon={this.state.pokemon}
                    onChange={this.changeForm} />
                  <RRFCombobox model='.nature' label='Nature'
                    placeholder='Adamant'>
                    {natures}
                  </RRFCombobox>
                  <RRFCombobox model='.ability' label='Ability'
                    placeholder='Overgrow'>
                    {abilities}
                  </RRFCombobox>
                </Col>
                <Col xs={6}>
                  <RRFMoves />
                </Col>
              </Row>

              <RRFText model='.item' label='Item' placeholder='Oran Berry' />

              <ControlLabel>Location</ControlLabel>
              <Form id='add-location' componentClass='fieldset' inline>
                <RRFSelect model='.method'>
                  <option value='Received at:'>Received at:</option>
                  <option value='Caught at:'>Caught at:</option>
                </RRFSelect>
                <RRFText model='.location' placeholder='Pallet Town' />
              </Form>
            </Panel>
          </Modal.Body>
          <Modal.Footer>
            <Button type='submit' bsStyle='success' bsSize='large' block>
              Add Pokémon
            </Button>
          </Modal.Footer>
        </RRForm>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    location: state.location
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onAddPokemon: (pokemon) => {
      dispatch(addPokemon(pokemon))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPokemonModal);