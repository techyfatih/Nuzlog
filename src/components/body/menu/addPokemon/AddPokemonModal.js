import React from 'react';
import { Modal, Media, Panel, Thumbnail, Button,
  Grid, Row, Col, Table, ControlLabel, Form } from 'react-bootstrap';
import { actions } from 'react-redux-form';
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
import { RRFText, RRFCombobox, RRFNumber } from 'components/form/RRFControls';
import { addPokemon } from 'actions';
import Pokemon from 'components/pokemon/Pokemon';

let pokemon = [];
for (let i = 0; i < pokedex.length; i++) {
  let name = pokedex[i][0];
  pokemon.push([name, <span><img src={icons[name]}/>{name}</span>]);
}

const genders = [
  ['M', <img src={male}/>],
  ['F', <img src={female}/>],
  ['N', 'N/A'],
];

class AddPokemonModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      icon,
      sprite
    };
    this.reset = this.reset.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  reset() {
    this.setState({
      icon,
      sprite
    });
    this.dispatch(actions.focus('local.pokemon'));
  }

  handleSubmit(values) {
    let moves = [
      values.get('move1').value,
      values.get('move2').value,
      values.get('move3').value,
      values.get('move4').value
    ]
    this.props.onAddPokemon(new Pokemon({
      species: values.get('pokemon').value,
      nickname: values.get('nickname').value,
      gender: values.get('gender').value,
      level: values.get('level').value,
      shiny: values.get('shiny').value,
      form: values.get('form').value,
      nature: values.get('nature').value,
      ability: values.get('ability').value,
      moves,
      item: values.get('item').value,
      method: values.get('method').value,
      location: values.get('location').value
    }));
    this.props.onHide();
  }

  render() {
    return (
      <Modal show={this.props.show}
        onEnter={this.reset} onHide={this.props.onHide}>
        <RRForm getDispatch={dispatch => this.dispatch = dispatch}
          onSubmit={this.handleSubmit}>
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
                        placeholder='Bulbasaur' items={pokemon} required />
                    </Col>
                    <Col xs={6}>
                      <RRFText model='.nickname' label='Nickname'
                        placeholder='Bulby' required />
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={4} xs={6}>
                    </Col>
                    <Col xs={6}>
                    </Col>
                    <Col sm={2}>
                    </Col>
                  </Row>
                </Media.Body>
              </Media>
            }>
            <Thumbnail src={this.state.sprite} />
              <Row>
                <Col xs={6}>
                  <RRFText model='.form' label='Form' placeholder='Normal' />
                  <RRFCombobox model='.nature' label='Nature*'
                    placeholder='Adamant' items={natures} required />
                  <RRFCombobox model='.ability' label='Ability*'
                    placeholder='Overgrow' items={abilities} required />
                </Col>
                <Col xs={6}>
                  <ControlLabel>Moves*</ControlLabel>
                  <RRFCombobox model='.move1' placeholder='Tackle' items={moves} />
                  <RRFCombobox model='.move2' placeholder='Tackle' items={moves} />
                  <RRFCombobox model='.move3' placeholder='Tackle' items={moves} />
                  <RRFCombobox model='.move4' placeholder='Tackle' items={moves} />
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