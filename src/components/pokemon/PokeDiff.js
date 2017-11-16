import React from 'react';

import printDiff from 'utilities/printDiff';

export default class PokeDiff extends React.Component {
  render() {
    const {pokemon, change, noPrefix} = this.props;

    let diff = printDiff(pokemon, change).split('\n');
    if (noPrefix) diff = diff.slice(2);

    return (
      <span>
        {diff.map((line, index) => (
          <span key={index}>{index != 0 ? <br /> : ''}
            {line}
          </span>
        ))}
      </span>
    )
  }
}