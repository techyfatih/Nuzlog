import React from 'react';
import { Panel } from 'react-bootstrap';

import './PokeSprite.css';

import defaultSprite from 'img/defaultSprite.png';
import loading from 'img/loading.gif';

import pokedex from 'data/pokedex';

import normalize from 'utilities/normalize';

const getSprite = pokemon => {
  let sprite = defaultSprite;
  if (pokemon) {
    let {species, gender, shiny, form} = pokemon;
    species = normalize(species);
    form = normalize(form);

    let _pokemon = pokedex.get(species);
    if (_pokemon) {
      switch (species) {
        case 'nidoranf':
          species = 'nidoran_f';
          break;
        case 'nidoranm':
          species = 'nidoran_m';
          break;
        case 'mimejr':
          species = 'mime_jr';
          break;
        case 'mrmime':
          species = 'mr._mime';
          break;
        case 'jangmoo':
          species = 'jangmo-o';
          break;
        case 'hakamoo':
          species = 'hakamo-o';
          break;
        case 'kommoo':
          species = 'kommo-o';
          break;
      }
      if (_pokemon.forms) {
        for (let i = 0; i < _pokemon.forms.length; i++) {
          if (form == normalize(_pokemon.forms[i])) {
            species += '-' + form;
            break;
          }
        }
      }
      if (species.indexOf('-') == -1 && gender == 'F' && _pokemon.femaleForm)
        species += '-f';

      sprite = 'https://www.pkparaiso.com/imagenes/';
      switch (species) {
        case 'altaria-mega':
        case 'audino-mega':
        case 'beedrill-mega':
        case 'camerupt-mega':
        case 'diancie-mega':
        case 'gallade-mega':
        case 'glalie-mega':
        case 'groudon-primal':
        case 'hoopa-unbound':
        case 'kyogre-primal':
        case 'lopunny-mega':
        case 'metagross-mega':
        case 'pidgeot-mega':
        case 'pikachu-cosplay':
        case 'rayquaza-mega':
        case 'sableye-mega':
        case 'salamence-mega':
        case 'sceptile-mega':
        case 'sharpedo-mega':
        case 'slowbro-mega':
        case 'steelix-mega':
        case 'swampert-mega':
          sprite += 'rubi-omega-zafiro-alfa/sprites/animados';
          break;
        default:
          if (species.indexOf('-alola') == -1 && _pokemon.num <= 721)
            sprite += 'xy/sprites/animados';
          else sprite += 'sol-luna/sprites/animados';
          break;
      }

      if (shiny) sprite += '-shiny';
      sprite += '/' + species + '.gif';
    }
  }
  return sprite;
}

export default class PokeSprite extends React.Component {
  constructor(props) {
    super(props);
    const sprite = getSprite(props.pokemon);
    let loading = false;
    if (sprite != defaultSprite) loading = true;
    this.initial = {
      sprite,
      loading
    }
    this.state = this.initial;

    this.handleLoad = this.handleLoad.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const sprite = getSprite(nextProps.pokemon);
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