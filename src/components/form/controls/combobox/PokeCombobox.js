import React from 'react';

import icons from 'img/icons';

//HAS TO BE JSON, NOT JS
const pokedex = require('data/pokedex.json').map((pokemon, index) => {
  const name = pokemon[1].name;
  return (
    <span value={name} key={index} style={{whiteSpace: 'nowrap'}} >
      <img src={icons[pokemon[0]]} /> {name}
    </span>
  )
});

import Combobox from './Combobox';

export default class PokeCombobox extends React.Component {
  render() {
    return (
      <Combobox id={this.props.id}
        placeholder={this.props.placeholder}
        value={this.props.value}
        focus={this.props.focus}
        onChange={this.props.onChange}
        onFocus={this.props.onFocus}
        onBlur={this.props.onBlur}
        rowHeight={40}>
        {pokedex}
      </Combobox>
    )
  }
}