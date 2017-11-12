import React from 'react';

import icons from 'img/icons';
import defaultIcon from 'img/defaultIcon.png';

import pokedex from 'data/pokedex';

import normalize from 'utilities/normalize';
import getPokemon from 'components/pokemon/getPokemon';

import {RRFCombobox} from './RRFControls';

const getForms = pokemon => {
  let forms = ['Normal'];
  if (pokemon) {
    const entry = pokedex.get(normalize(pokemon.species));
    if (entry && entry.forms) {
      forms = forms.concat(entry.forms);
    }
  }
  return forms;
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

    return (
      <RRFCombobox model={this.props.model}
        label={this.props.label}
        placeholder={this.props.placeholder}
        rowHeight={40}
        onChange={this.props.onChange}
        required={this.props.required}>
        {forms.map((form, key) => {
          let _form = '-' + normalize(form);
          if (_form == '-normal') _form = '';
          
          let icon = icons[species + _form];
          if (!icon) icon = defaultIcon;

          return (
            <span value={form} key={key}>
              <img src={icon} /> {form}
            </span>
          )
        })}
      </RRFCombobox>
    )
  }
}