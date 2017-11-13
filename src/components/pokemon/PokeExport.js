import React from 'react';

import getFullname from 'utilities/getFullname';

export default class PokeExport extends React.Component {
  render() {
    const {pokemon} = this.props;
    console.log(pokemon.moves);

    return (
      <p>
        {getFullname(pokemon)}&nbsp;
        {pokemon.gender ? '(' + pokemon.gender + ')' : ''}
        {pokemon.item ? ' @ ' + pokemon.item : ''}
        <br />
        {pokemon.ability ? (<span>Ability: {pokemon.ability}<br/></span>) : ''}
        {pokemon.level ? (<span>Level: {pokemon.level}<br/></span>) : ''}
        {pokemon.shiny ? (<span>Shiny: Yes<br/></span>) : ''}
        {pokemon.nature ? (<span>{pokemon.nature} Nature<br/></span>) : ''}
        {pokemon.moves ? pokemon.moves.map(move => (
          <span>-{move}<br/></span>
        )) : ''}
      </p>
    )
  }
}