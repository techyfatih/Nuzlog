import React from 'react';
import { Media } from 'react-bootstrap';

import './PokeSlot.css';
import icon from 'img/icon.png';
import female from 'img/female-small.png';

export default class PokeSlot extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      level: 0
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.pokemon) {
      this.setState({
        name: nextProps.pokemon.name,
        level: nextProps.pokemon.level
      });
    }
  }

  render() {
    return (
      <Media className='poke-slot'>
        <Media.Left align='middle'><img src={icon} /></Media.Left>
        <Media.Body className={this.props.pokemon ? '' : 'invisible'}>
          <p>{this.state.name} <img src={female} /></p>
          <p>Level {this.state.level}</p>
        </Media.Body>
      </Media>
    );
  }
}