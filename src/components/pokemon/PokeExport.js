import React from 'react';

import exportPokemon from 'utilities/exportPokemon';

export default class PokeExport extends React.Component {
  render() {
    const {pokemon} = this.props;

    return (
      <span>
        {exportPokemon(pokemon).split('\n').map((line, index) => (
          <span key={index}>{index != 0 ? <br /> : ''}
            {line}
          </span>
        ))}
      </span>
    )
  }
}