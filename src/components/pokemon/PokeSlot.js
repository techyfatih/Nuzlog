import React from 'react';
import { Media } from 'react-bootstrap';

import './PokeSlot.css';

import male from 'img/male-small.png';
import female from 'img/female-small.png';

import getPokemon from 'utilities/getPokemon';
import getFullname from 'utilities/getFullname';

import PokeIcon from './PokeIcon';

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
    const {pokemon} = this.state;
    const name = getFullname(pokemon);
    
    return (
      <div className='poke-slot clearfix'>
        <div className='icon pull-left'>
          <PokeIcon pokemon={pokemon} />
        </div>
        <div className={this.props.pokemon ? '' : 'invisible'}>
          <div className='info pull-left'>
            <div className='clearfix'>
              <div className='name pull-left'>{name ? name : '?'}</div>
              <img className='gender pull-left' src={
                  pokemon.gender == 'M' ? male :
                  pokemon.gender == 'F' ? female : ''} />
            </div>
            <p className='pull-left'>
              <span className={pokemon.level ? '' : 'invisible'}>
                Level {pokemon.level}
              </span>
            </p>
          </div>
        </div>
      </div>
      /*<Media className='poke-slot'>
        <Media.Left align='middle'>
          <PokeIcon pokemon={pokemon} />
        </Media.Left>
        <Media.Body className={this.props.pokemon ? '' : 'invisible'}>
          <p className='clearfix'>
            <span className='name'>{getFullname(pokemon)}</span>
            <img className='gender pull-right' src={
              pokemon.gender == 'M' ? male :
              pokemon.gender == 'F' ? female : ''} />
          </p>
          <p className={pokemon.level ? '' : 'invisible'}>
            Level {pokemon.level}
          </p>
        </Media.Body>
      </Media>*/
    );
  }
}