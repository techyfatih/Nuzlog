import React from 'react';

import getFullname from 'utilities/getFullname';

export default class PokeExport extends React.Component {
  render() {
    const {pokemon} = this.props;

    return (
      <span>
        {getFullname(pokemon)}
        {pokemon.gender ? ' (' + pokemon.gender + ')' : ''}
        {pokemon.item ? ' @ ' + pokemon.item : ''}

        {pokemon.ability ? (<span><br/>Ability: {pokemon.ability}</span>) : ''}
        {pokemon.level ? (<span><br/>Level: {pokemon.level}</span>) : ''}
        {pokemon.shiny ? (<span><br/>Shiny: Yes</span>) : ''}
        {pokemon.nature ? (<span><br/>{pokemon.nature} Nature</span>) : ''}
        {pokemon.moves ? pokemon.moves.map((move, key) => (
          <span key={key}><br/>-{move}</span>
        )) : ''}
        <br/>{pokemon.method}&nbsp;{pokemon.location}
      </span>
    )
  }
}