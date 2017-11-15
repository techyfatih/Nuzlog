import React from 'react';

import icons from 'img/icons';
import defaultIcon from 'img/defaultIcon.png';

import pokedex from 'data/pokedex';

import normalize from 'utilities/normalize';
import getPokemon from 'utilities/getPokemon';

import {RRFCombobox} from './RRFControls';

const getForms = pokemon => {
  if (pokemon) {
    const entry = pokedex.get(normalize(pokemon.species));
    if (entry && entry.forms) {
      return entry.forms
    }
  }
  return [];
}

export default class RRFForms extends React.Component {
  constructor(props) {
    super(props);
    const pokemon = getPokemon(props.pokemon);
    this.state = {
      pokemon,
      forms: getForms(pokemon)
    };
  }

  componentWillReceiveProps(nextProps) {
    const pokemon = getPokemon(nextProps.pokemon);
    this.setState({
      pokemon,
      forms: getForms(pokemon)
    });
  }

  render() {
    const {pokemon, forms} = this.state;
    const species = normalize(pokemon.species);
    let normalIcon = icons[species];
    if (!normalIcon) normalIcon = defaultIcon;

    return (
      <RRFCombobox model={this.props.model}
        label={this.props.label}
        placeholder={this.props.placeholder}
        rowHeight={40}
        onChange={this.props.onChange}
        required={this.props.required}
        defaultValue={pokemon.form}>
        {[
          <span value='Normal' key={0} style={{whiteSpace: 'nowrap'}}>
            <img src={normalIcon} /> Normal
          </span>,
          ...forms.map((form, key) => {
            let _form = '-' + normalize(form);
            
            let icon = icons[species + _form];
            if (!icon) icon = normalIcon;

            return (
              <span value={form} key={key + 1} style={{whiteSpace: 'nowrap'}}>
                <img src={icon} /> {form}
              </span>
            )
          })
        ]}
      </RRFCombobox>
    )
  }
}