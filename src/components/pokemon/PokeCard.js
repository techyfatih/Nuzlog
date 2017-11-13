import React from 'react';
import { Media, Panel, Image, Thumbnail, Table, Button,
  Popover, OverlayTrigger } from 'react-bootstrap';

import './PokeCard.css';

import male from 'img/male.png';
import female from 'img/female.png';

import getPokemon from 'utilities/getPokemon';
import getFullname from 'utilities/getFullname';

import PokeExport from './PokeExport';
import PokeIcon from './PokeIcon';
import PokeSprite from './PokeSprite';

export default class PokeCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: getPokemon(props.pokemon)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      pokemon: getPokemon(nextProps.pokemon)
    });
  }

  render() {
    const {pokemon} = this.state;
    const name = getFullname(pokemon);
    const moves = Array.isArray(pokemon.moves);
    const popover = (
      <Popover id='export'>
        <PokeExport pokemon={pokemon} />
      </Popover>
    );
    
    return (
      <Panel className='poke-card' bsStyle={this.props.bsStyle} header={
        <Media>
          <Media.Left align='middle'>
            <PokeIcon pokemon={pokemon} />
          </Media.Left>
          <Media.Body>
            <Media.Heading>
              <span className='name'>{name ? name : 'No Pokémon'}</span>&nbsp;
              <img className='gender' src={
                pokemon.gender == 'M' ? male :
                pokemon.gender == 'F' ? female : ''} />
              </Media.Heading>
            <p className={pokemon.level ? '' : 'invisible'}>
              Level {pokemon.level}
            </p>
          </Media.Body>
          {pokemon.shiny && <Media.Right className='shiny'>*</Media.Right>}
        </Media>
      }>
        <PokeSprite pokemon={pokemon} />
        <div className={this.props.pokemon ? '' : 'invisible'}>
          <Table condensed>
            <tbody>
              <tr>
                <th width={100}>Form:</th>
                <td>{pokemon.form ? pokemon.form : 'Normal'}</td>
              </tr>
              <tr>
                <th>Nature:</th>
                <td>{pokemon.nature}</td>
              </tr>
              <tr>
                <th>Ability:</th>
                <td>{pokemon.ability}</td>
              </tr>
              <tr>
                <th>Moves:</th>
                <td>
                  - {moves && pokemon.moves[0]} <br/>
                  - {moves && pokemon.moves[1]} <br/>
                  - {moves && pokemon.moves[2]} <br/>
                  - {moves && pokemon.moves[3]}
                </td>
              </tr>
              <tr>
                <th>Item:</th>
                <td>{pokemon.item}</td>
              </tr>
              <tr>
                <th>{pokemon.method ? pokemon.method : 'Received at:'}</th>
                <td>{pokemon.location}</td>
              </tr>
            </tbody>
          </Table>
          <OverlayTrigger trigger='click' placement='top' overlay={popover}
            rootClose>
            <Button block>Export </Button>
          </OverlayTrigger>
        </div>
      </Panel>
    );
  }
}