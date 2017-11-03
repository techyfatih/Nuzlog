import React from 'react';
import { Media, Panel, Thumbnail, Button, Grid, Row, Col, Table, ControlLabel, Form } from 'react-bootstrap';
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

import { Modal, ModalButton } from 'components/modal/Modal'
import { addPokemon } from 'actions';
import Enhanced from 'components/form/Enhanced';
import Pokemon from 'components/pokemon/Pokemon';

let fields = [
  ['pokemon', {value: '', required: true}],
  ['nickname', ''],
  ['gender', {value: '', required: true}],
  ['level', {value: '', required: true, min: 1, max: 100}],
  ['shiny', false],
  ['form', ''],
  ['nature', {value: '', required: true}],
  ['ability', {value: '', required: true}],
  ['move1', {value: '', required: true}],
  ['move2', ''],
  ['move3', ''],
  ['move4', ''],
  ['item', ''],
  ['method', {value: '', required: true}],
  ['location', {value: '', required: true}]
];

let pokemon = [];
for (var i = 0; i < pokedex.length; i++) {
  let name = pokedex[i][0];
  pokemon.push([name, <span><img src={icons[name]}/>{name}</span>]);
}

const genders = [
  ['M', <img src={male}/>],
  ['F', <img src={female}/>],
  ['N', 'N/A'],
];

class AddPokemonButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      icon,
      sprite
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    this.props.onSubmit(e, () => {
      let values = this.props.state;
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
      this.modal.close();
    });
  }

  render() {
    return (
      <ModalButton bsStyle='success' onOpen={this.props.reset} ref={ref => this.modal = ref}
        label={<span>Add <span className='hidden-xs'>Pokémon</span></span>}>
        <input type='text'/>
        <Enhanced.Form onSubmit={this.handleSubmit}>
          <Modal.Header><h2>Add Pokémon</h2></Modal.Header>

          <Modal.Body>
            <Panel id='add-pokemon' header={
              <Media>
                <Media.Left align='middle'>
                  <img src={this.state.icon} />
                </Media.Left>
                <Media.Body>
                  <input type='text'/>
                  <Row>
                    <Col xs={6}>
                      <Enhanced.Combobox id='pokemon' rowHeight={40}
                        state={this.props.state}
                        label='Pokémon*'
                        placeholder='Bulbasaur'
                        onChange={this.props.onChange}
                        items={pokemon} />
                    </Col>
                    <Col xs={6}>
                      <Enhanced.Input id='nickname'
                        state={this.props.state}
                        onChange={this.props.onChange}
                        label='Nickname'
                        placeholder='Bulby' />
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={4} xs={6}>
                      <Enhanced.ToggleGroup id='gender'
                        state={this.props.state}
                        onChange={this.props.onChange}
                        label='Gender*'
                        options={genders} />
                    </Col>
                    <Col xs={6}>
                      <Enhanced.Input id='level' type='number'
                        state={this.props.state}
                        onChange={this.props.onChange}
                        label='Level*'
                        placeholder={'1-100'} />
                    </Col>
                    <Col sm={2}>
                      <Enhanced.Checkbox id='shiny'
                        state={this.props.state}
                        onChange={this.props.onChange}
                        label='Shiny' />
                    </Col>
                  </Row>
                </Media.Body>
              </Media>
            }>
            <Thumbnail src={this.state.sprite} />
              <Row>
                <Col xs={6}>
                  <Enhanced.Input id='form'
                    state={this.props.state}
                    onChange={this.props.onChange}
                    label='Form'
                    placeholder='Normal' />
                  <Enhanced.Combobox id='nature'
                    state={this.props.state}
                    onChange={this.props.onChange}
                    label='Nature*'
                    placeholder='Adamant'
                    items={natures} />
                  <Enhanced.Combobox id='ability'
                    state={this.props.state}
                    onChange={this.props.onChange}
                    label='Ability*'
                    placeholder='Overgrow'
                    items={abilities} />
                </Col>
                <Col xs={6}>
                  <ControlLabel>Moves*</ControlLabel>
                  <Enhanced.Combobox id='move1'
                    state={this.props.state}
                    onChange={this.props.onChange}
                    placeholder='Tackle'
                    items={moves} />
                  <Enhanced.Combobox id='move2'
                    state={this.props.state}
                    onChange={this.props.onChange}
                    placeholder='Growl'
                    items={moves} />
                  <Enhanced.Combobox id='move3'
                    state={this.props.state}
                    onChange={this.props.onChange}
                    items={moves} />
                  <Enhanced.Combobox id='move4'
                    state={this.props.state}
                    onChange={this.props.onChange}
                    items={moves} />
                </Col>
              </Row>
              <Enhanced.Input id='item'
                state={this.props.state}
                onChange={this.props.onChange}
                label='Item'
                placeholder='Oran Berry' />
              <ControlLabel>Location*</ControlLabel>
              <Form id='add-location' componentClass='fieldset' inline>
                <Enhanced.Input id='method'
                  state={this.props.state}
                  onChange={this.props.onChange}
                  placeholder='Received at:' />
                <Enhanced.Input id='location'
                  state={this.props.state}
                  onChange={this.props.onChange}
                  placeholder='Pallet Town' />
              </Form>
            </Panel>
          </Modal.Body>
          <Modal.Footer>
            <Button type='submit' bsStyle='success' bsSize='large' block>
              Add Pokémon
            </Button>
          </Modal.Footer>
        </Enhanced.Form>
      </ModalButton>
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

const EnhancedAddPokemonButton = Enhanced.enhanceForm(AddPokemonButton, fields);
export default connect(mapStateToProps, mapDispatchToProps)(EnhancedAddPokemonButton);