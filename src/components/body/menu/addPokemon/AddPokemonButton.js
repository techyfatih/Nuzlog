import React from 'react';
import { Media, Panel, Thumbnail, Button, Grid, Row, Col, Table } from 'react-bootstrap';
import { connect } from 'react-redux';

import './AddPokemon.css';
import pokedex from 'data/pokedex.json';
import icon from 'img/icon.png';
import male from 'img/male.png';
import female from 'img/female.png';
import sprite from 'img/sprite.png';
import icons from 'img/icons';

import { Modal, ModalButton } from 'components/modal/Modal'
import { addPokemon } from 'actions';
import Enhanced from 'components/form/Enhanced';

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

class AddPokemonButton extends React.Component {
  render() {
    return (
      <ModalButton bsStyle='success' onOpen={this.props.reset}
        label={<span>Add <span className='hidden-xs'>Pokémon</span></span>}>
        <Enhanced.Form onSubmit={this.props.onSubmit}>
          <Modal.Header><h2>Add Pokémon</h2></Modal.Header>

          <Modal.Body>
            <Panel id='add-pokemon' header={
              <Media>
                <Media.Left align='middle'>
                  <img src={this.props.icon ? this.props.icon : icon} />
                </Media.Left>
                <Media.Body>
                  <Row>
                    <Col sm={6}>
                      <Enhanced.Combobox id='pokemon'
                        state={this.props.state}
                        label='Pokémon*'
                        placeholder='Bulbasaur'
                        onChange={this.props.onChange}
                        items={pokemon} />
                    </Col>
                    <Col sm={6}>
                      <Enhanced.Input id='nickname'
                        state={this.props.state}
                        onChange={this.props.onChange}
                        label='Nickname'
                        placeholder='Bulby' />
                    </Col>
                  </Row>
                  <Enhanced.Input id='level' type='number'
                    state={this.props.state}
                    onChange={this.props.onChange}
                    label='Level*'
                    placeholder={'1-100'} />
                  <Enhanced.Checkbox id='shiny'
                    state={this.props.state}
                    onChange={this.props.onChange}
                    label='Shiny' />
                </Media.Body>
              </Media>
            }>
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