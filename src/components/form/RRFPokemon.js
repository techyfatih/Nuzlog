import React from 'react';

import icons from 'img/icons';

import pokedex from 'data/pokedex.json'; //HAS TO BE JSON, NOT JS

import {RRFCombobox} from './RRFControls';

export default class RRFPokemon extends React.Component {
  render() {
    return (
      <RRFCombobox
        model={this.props.model}
        label={this.props.label}
        placeholder={this.props.placeholder}
        rowHeight={40}
        onChange={this.props.onChange}
        required={this.props.required}>
        {pokedex.map((pokemon, index) => {
          const name = pokemon[1].name;
          return (
            <span value={name} key={index}>
              <img src={icons[pokemon[0]]} />
              {name}
            </span>
          )
        })}
      </RRFCombobox>
    )
  }
}