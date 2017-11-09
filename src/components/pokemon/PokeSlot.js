import React from 'react';
import { Media } from 'react-bootstrap';

import './PokeSlot.css';

import male from 'img/male-small.png';
import female from 'img/female-small.png';

import PokeIcon from './PokeIcon';

const getPokemon = pokemon => {
  return {
    name: pokemon ? pokemon.name : 'No Pokémon',
    level: pokemon ? pokemon.level : null,
    gender: pokemon ? pokemon.gender : null
  };
}

export default class PokeSlot extends React.Component {
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
    return (
      <Media className='poke-slot'>
        <Media.Left align='middle'>
          <PokeIcon pokemon={this.state.pokemon} />
        </Media.Left>
        <Media.Body className={this.props.pokemon ? '' : 'invisible'}>
          <p>
            {this.state.name}
            <img className='gender' src={
              this.state.gender == 'M' ? male :
              this.state.gender == 'F' ? female : ''} />
          </p>
          <p>Level {this.state.level}</p>
        </Media.Body>
      </Media>
    );
  }
}