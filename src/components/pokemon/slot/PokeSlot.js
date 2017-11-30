import React from 'react';
import { Media } from 'react-bootstrap';

import './PokeSlot.css';

import male from 'img/male-small.png';
import female from 'img/female-small.png';
import item from 'img/item.png';

import getFullname from 'utilities/getFullname';

import PokeIcon from '../PokeIcon';

export default class PokeSlot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {pokemon: props.pokemon};
  }

  componentWillReceiveProps(nextProps) {
    this.setState({pokemon: nextProps.pokemon});
  }

  render() {
    const {pokemon} = this.state;
    const name = getFullname(pokemon);

    return (
      <Media className='poke-slot'>
        <Media.Left align='middle'>
          <PokeIcon pokemon={pokemon} />
          {pokemon && pokemon.item && <img className='slot-item' src={item}/>}
        </Media.Left>
        <Media.Body className={pokemon ? '' : 'invisible'}>
          {name ? name : '?'} <img src={pokemon ?
            pokemon.gender == 'M' ? male :
            pokemon.gender == 'F' ? female : '' : ''}/>
            <br />
            <span className={pokemon && pokemon.level ? '' : 'invisible'}>
              Level {pokemon ? pokemon.level : ''}
            </span>
        </Media.Body>
      </Media>
    );
  }
}