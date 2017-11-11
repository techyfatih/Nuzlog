import React from 'react';
import { Modal, Media, Panel, Checkbox, Thumbnail, Button,
  Grid, Row, Col, Table, ControlLabel, Form } from 'react-bootstrap';
import { Control, actions } from 'react-redux-form';
import { connect } from 'react-redux';

import './AddPokemon.css';
import pokedexArr from 'data/pokedex.json';
import pokedex from 'data/pokedex';
import natures from 'data/natures.json';
import abilities from 'data/abilities.json';
import moves from 'data/moves.json';

import male from 'img/male.png';
import female from 'img/female.png';
import icons from 'img/icons';

import normalize from 'utilities/normalize';
import PokeIcon from 'components/pokemon/PokeIcon';
import PokeSprite from 'components/pokemon/PokeSprite';
import RRForm from 'components/form/RRForm';
import { RRFText, RRFCombobox, RRFNumber, RRFToggle } from 'components/form/RRFControls';
import { addPokemon } from 'actions';
import Pokemon from 'components/pokemon/Pokemon';

class AddPokemonModal extends React.Component {
  constructor(props) {
    super(props);

    this.initial = {
      pokemon: null,
      forms: ['Normal']
    }
    this.state = this.initial;

    this.reset = this.reset.bind(this);
    this.changePokemon = this.changePokemon.bind(this);
    this.changeGender = this.changeGender.bind(this);
    this.changeShiny = this.changeShiny.bind(this);
    this.changeForm = this.changeForm.bind(this);
    this.updatePokemon = this.updatePokemon.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  reset() {
    this.setState(this.initial);
    this.dispatch(actions.focus('local.pokemon'));
  }

  changePokemon(species) {
    let gender = '';
    let forms = ['Normal'];

    let pokemon = pokedex.get(normalize(species));
    if (pokemon) {
      gender = pokemon.gender[0];
      this.dispatch(actions.change('local.gender', gender));
      if (pokemon.forms)
        forms = forms.concat(pokemon.forms);
    }
    this.updatePokemon({species, gender, form: ''});
    
    this.dispatch(actions.change('local.form', ''));
    this.setState({forms});
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
    console.log(values);
    let moves = [];
    if (values.moves) {
      for (let move in values.moves) {
        moves.push(values.moves[move]);
      }
    }
    this.props.onAddPokemon(new Pokemon({
      species: values.pokemon,
      nickname: values.nickname,
      gender: values.gender,
      level: values.level,
      shiny: values.shiny,
      form: values.form,
      nature: values.nature,
      ability: values.ability,
      moves,
      item: values.item,
      method: values.method,
      location: values.location
    }));
    this.props.onHide();
  }

  render() {
    return (
      <Modal show={this.props.show}
        onEnter={this.reset} onHide={this.props.onHide}>
        <RRForm getDispatch={dispatch => this.dispatch = dispatch}
          onUpdate={this.handleUpdate}
          onSubmit={this.handleSubmit}
          validators={{
            '': ({m1, m2, m3, m4}) => m1 || m2 || m3 || m4
          }}>
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
                      <RRFCombobox model='.pokemon' label='Pokémon*'
                        placeholder='Bulbasaur' rowHeight={40}
                        onChange={this.changePokemon}
                        required>
                        {pokedexArr.map((pokemon, index) => {
                          const name = pokemon[1].name;
                          return (
                            <span value={name} key={index}>
                              <img src={icons[pokemon[0]]} />
                              {name}
                            </span>
                          )
                        })}
                      </RRFCombobox>
                    </Col>
                    <Col xs={6}>
                      <RRFText model='.nickname' label='Nickname'
                        placeholder='Bulby' />
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={4} xs={6}>
                      <RRFToggle type='radio' model='.gender'
                        label='Gender*' required
                        onChange={this.changeGender}>
                        <img src={male} value='M' />
                        <img src={female} value='F' />
                        <span value='N'>N/A</span>
                      </RRFToggle>
                    </Col>
                    <Col xs={6}>
                      <RRFNumber model='.level' label='Level*'
                        placeholder='1-100' required />
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
                  <RRFCombobox model='.form' label='Form' placeholder='Normal'
                    onChange={this.changeForm}>
                    {this.state.forms}
                  </RRFCombobox>
                  <RRFCombobox model='.nature' label='Nature*'
                    placeholder='Adamant' required>
                    {natures}
                  </RRFCombobox>
                  <RRFCombobox model='.ability' label='Ability*'
                    placeholder='Overgrow' required>
                    {abilities}
                  </RRFCombobox>
                </Col>
                <Col xs={6}>
                  <RRFCombobox model='.moves[0]' label='Moves*'
                    placeholder='Tackle' required>{moves}</RRFCombobox>
                  <RRFCombobox model='.moves[1]'
                    placeholder='Growl'>{moves}</RRFCombobox>
                  <RRFCombobox model='.moves[2]'
                    placeholder='Leech Seed'>{moves}</RRFCombobox>
                  <RRFCombobox model='.moves[3]'
                    placeholder='Razor Leaf'>{moves}</RRFCombobox>
                </Col>
              </Row>

              <RRFText model='.item' label='Item' placeholder='Oran Berry' />

              <ControlLabel>Location*</ControlLabel>
              <Form id='add-location' componentClass='fieldset' inline>
                <RRFCombobox model='.method' placeholder='Received at:'
                  required>
                  {['Received at:', 'Caught at:']}
                </RRFCombobox>
                <RRFText model='.location' placeholder='Pallet Town' required />
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