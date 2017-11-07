import React from 'react';
import { Modal, Media, Panel, Checkbox, Thumbnail, Button,
  Grid, Row, Col, Table, ControlLabel, Form } from 'react-bootstrap';
import { Control, actions } from 'react-redux-form';
import { connect } from 'react-redux';

import './AddPokemon.css';
import pokedex from 'data/pokedex.json';
import natures from 'data/natures.json';
import abilities from 'data/abilities.json';
import moves from 'data/moves.json';

import icon from 'img/icon.png';
import male from 'img/male.png';
import female from 'img/female.png';
import sprite from 'img/sprite.png';
import icons from 'img/icons';

import RRForm from 'components/form/RRForm';
import { RRFText, RRFCombobox, RRFNumber, RRFToggle, RRFMoves } from 'components/form/RRFControls';
import { addPokemon } from 'actions';
import Pokemon from 'components/pokemon/Pokemon';

const pokedexMap = new Map(pokedex);
console.log(pokedexMap);

class AddPokemonModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      icon,
      sprite,
      gender: ''
    };
    this.reset = this.reset.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleSpriteError = this.handleSpriteError.bind(this);
    this.changeGender = this.changeGender.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  reset() {
    this.setState({
      icon,
      sprite
    });
    this.dispatch(actions.focus('local.pokemon'));
  }

  handleUpdate(form) {
    console.log(form.moves);
    const species = form.pokemon.value;
    let newIcon = icons[species];
    if (!newIcon) newIcon = icon;
    this.setState({
      icon: newIcon
    })
    /*
    let newIcon = icons[pokemon];
    if (!newIcon) newIcon = icon;
    this.setState({
      icon: newIcon,
      sprite: 'https://www.pkparaiso.com/imagenes/sol-luna/sprites/animados/' + pokemon.toLowerCase() + '.gif'
    })*/
  }

  handleSpriteError(e) {
    e.target.onerror = '';
    e.target.src = sprite;
    return true;
  }

  changeGender(value) {
    this.setState({gender: value});
  }

  handleSubmit(values) {
    this.props.onAddPokemon(new Pokemon({
      species: values.pokemon,
      nickname: values.nickname,
      gender: values.gender,
      level: values.level,
      shiny: values.shiny,
      form: values.form,
      nature: values.nature,
      ability: values.ability,
      moves: values.moves,
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
                  <img src={this.state.icon} />
                </Media.Left>
                <Media.Body>
                  <Row>
                    <Col xs={6}>
                      <RRFCombobox model='.pokemon' label='Pokémon*'
                        placeholder='Bulbasaur' rowHeight={40}
                        required>
                        {pokedex.map((pokemon, index) => (
                          <span value={pokemon[0]} key={index}>
                            <img src={icons[pokemon[0]]} />
                            {pokemon[0]}
                          </span>
                        ))}
                      </RRFCombobox>
                    </Col>
                    <Col xs={6}>
                      <RRFText model='.nickname' label='Nickname'
                        placeholder='Bulby' required />
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={4} xs={6}>
                      <RRFToggle type='radio' model='.gender'
                        label='Gender*' required>
                        <img src={male} value='M' />
                        <img src={female} value='F' />
                        <span value='N'>N/A</span>
                      </RRFToggle>
                    </Col>
                    <Col xs={6}>
                      <RRFNumber model='.level' label='Level*'
                        placeholder='1-100'
                        min={1} max={100} required />
                    </Col>
                    <Col sm={2}>
                      <Control.checkbox model='.shiny' component={Checkbox}>
                        Shiny
                      </Control.checkbox>
                    </Col>
                  </Row>
                </Media.Body>
              </Media>
            }>
            <Thumbnail src={this.state.sprite} onError={this.handleSpriteError} />
              <Row>
                <Col xs={6}>
                  <RRFCombobox model='.form' label='Form' placeholder='Normal'>
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
                  <RRFMoves />
                </Col>
              </Row>

              <RRFText model='.item' label='Item' placeholder='Oran Berry' />

              <ControlLabel>Location*</ControlLabel>
              <Form id='add-location' componentClass='fieldset' inline>
                <RRFText model='.method' placeholder='Received at:' />
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