import React from 'react';
import { Media, Panel, Image, Thumbnail, Table } from 'react-bootstrap';

import './PokeCard.css';
import icon from 'img/icon.png';
import male from 'img/male.png';
import female from 'img/female.png';
import sprite from 'img/sprite.png';

const getPokemon = pokemon => {
  return {
    icon,
    name: pokemon ? pokemon.name : 'No Pokémon',
    level: pokemon ? pokemon.level : null,
    gender: pokemon ? pokemon.gender : null,
    shiny: pokemon ? pokemon.shiny : null,
    form: pokemon ? pokemon.form : null,
    nature: pokemon ? pokemon.nature : null,
    ability: pokemon ? pokemon.ability : null,
    moves: pokemon ? pokemon.moves : null,
    item: pokemon ? pokemon.moves : null,
    method: pokemon ? pokemon.method : null,
    location: pokemon ? pokemon.location : null
  }
}

export default class PokeCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = getPokemon(props.pokemon);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(getPokemon(nextProps.pokemon));
  }

  render() {
    return (
      <Panel className='poke-card' header={
        <Media>
          <Media.Left align='middle'>
            <img src={this.state.icon ? this.state.icon : icon} />
          </Media.Left>
          <Media.Body>
            <Media.Heading>
              <span className='name'>
                {this.state.name ? this.state.name : 'No Pokémon'}
              </span>&nbsp;
              <img className='gender' src={
                this.state.gender == 'M' ? male :
                this.state.gender == 'F' ? female : ''} />
              </Media.Heading>
            <p className={this.state.level ? '' : 'invisible'}>
              Level {this.state.level}
            </p>
          </Media.Body>
          {this.state.shiny && <Media.Right className='shiny'>*</Media.Right>}
        </Media>
      }>
        <Thumbnail src={this.state.sprite ? this.state.sprite : sprite} />
        <Table condensed className={this.props.pokemon ? '' : 'invisible'}>
          <tbody>
            <tr>
              <th width={100}>Form:</th>
              <td><div>{this.state.form ? this.state.form : 'Normal'}</div></td>
            </tr>
            <tr>
              <th>Nature:</th>
              <td>{this.state.nature}</td>
            </tr>
            <tr>
              <th>Ability:</th>
              <td>{this.state.ability}</td>
            </tr>
            <tr>
              <th>Moves:</th>
              <td>
                - {this.state.moves && this.state.moves[0]} <br/>
                - {this.state.moves && this.state.moves[1]} <br/>
                - {this.state.moves && this.state.moves[2]} <br/>
                - {this.state.moves && this.state.moves[3]}
                </td>
            </tr>
            <tr>
              <th>Item:</th>
              <td>{this.state.item}</td>
            </tr>
            <tr>
              <th>{this.state.method}</th>
              <td>{this.state.location}</td>
            </tr>
          </tbody>
        </Table>
      </Panel>
    );
  }
}