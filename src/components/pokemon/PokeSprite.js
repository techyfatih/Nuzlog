import React from 'react';
import { Panel } from 'react-bootstrap';

import './PokeSprite.css';

import defaultSprite from 'img/defaultSprite.png';
import loading from 'img/loading.gif';

import pokedex from 'data/pokedex';

import normalize from 'utilities/normalize';

export default class PokeSprite extends React.Component {
  constructor() {
    super();

    this.initial = {
      sprite: defaultSprite,
      loading: false
    }
    this.state = this.initial;

    this.handleLoad = this.handleLoad.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let sprite = defaultSprite;
    if (nextProps.pokemon) {
      let {species, gender, shiny, form} = nextProps.pokemon;
      species = normalize(species);
      form = normalize(form);

      let pokemon = pokedex.get(species);
      if (pokemon) {
        switch (species) {
          case 'nidoranf':
            species = 'nidoran_f';
            break;
          case 'nidoranm':
            species = 'nidoran_m';
            break;
        }
        if (pokemon.forms) {
          for (let i = 0; i < pokemon.forms.length; i++) {
            if (form == normalize(pokemon.forms[i])) {
              species += '-' + form;
              break;
            }
          }
        }
        if (species.indexOf('-') == -1 && gender == 'F' && pokemon.femaleForm)
          species += '-f';

        sprite = 'https://www.pkparaiso.com/imagenes/';
        if (form != 'alola' && pokemon.num <= 721)
          sprite += 'xy/sprites/animados';
        else
          sprite += 'sol-luna/sprites/animados';
        if (shiny) sprite += '-shiny';
        sprite += '/' + species + '.gif';
      }
    }
    if (this.state.sprite != sprite) {
      this.setState({
        sprite,
        loading: true
      });
    }
  }

  handleLoad() {
    this.setState({loading: false});
  }

  handleError(e) {
    this.setState({
      sprite: null,
      loading: false
    });
  }

  render() {
    return (
      <Panel className='sprite'>
        <span className='helper' />
        <img src={loading} hidden={!this.state.loading}/>
        <img src={this.state.sprite} hidden={this.state.loading}
          onLoad={this.handleLoad} onError={this.handleError}
          alt='Image Not Found'/>
      </Panel>
    )
  }
}