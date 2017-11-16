import React from 'react';

import icons from 'img/icons';
import defaultIcon from 'img/defaultIcon.png';

import pokedex from 'data/pokedex';

import normalize from 'utilities/normalize';

import Combobox from './Combobox';

const getForms = pokemon => {
  let forms = ['Normal'];
  if (pokemon) {
    const entry = pokedex.get(normalize(pokemon.species));
    if (entry && Array.isArray(entry.forms)) {
      forms = forms.concat(entry.forms)
    }
  }
  return forms;
}

export default class FormsCombobox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: props.pokemon,
      forms: getForms(props.pokemon)
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      pokemon: nextProps.pokemon,
      forms: getForms(nextProps.pokemon)
    });
  }

  render() {
    const {pokemon, forms} = this.state;
    const species = pokemon ? normalize(pokemon.species) : '';

    return (
      <Combobox id={this.props.id}
        placeholder={this.props.placeholder}
        value={this.props.value}
        focus={this.props.focus}
        onChange={this.props.onChange}
        onFocus={this.props.onFocus}
        onBlur={this.props.onBlur}
        rowHeight={40}>
        {forms.map((form, index) => {
          let _form = '';
          if (index != 0) _form = '-' + normalize(form);

          let icon = icons[species + _form];
          if (!icon) icon = icons[species];
          if (!icon) icon = defaultIcon;

          return (
            <span value={form} key={index} style={{whiteSpace: 'nowrap'}}>
              <img src={icon} /> {form}
            </span>
          )
        })}
      </Combobox>
    )
  }
}