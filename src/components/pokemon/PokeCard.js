import React from 'react';
import { Media, Panel, Image, Thumbnail, Table } from 'react-bootstrap';

import './PokeCard.css';
import icon from 'img/icon.png';
import male from 'img/male.png';
import female from 'img/female.png';
import sprite from 'img/sprite.png';

export default class PokeCard extends React.Component {
  render() {
    return (
      <Panel className='poke-card' header={
        <Media>
          <Media.Left align='middle'>
            <img src={this.props.icon ? this.props.icon : icon} />
          </Media.Left>
          <Media.Body>
            <Media.Heading>
              <span className='name'>
                {this.props.name ? this.props.name : 'No Pokémon'}
              </span>&nbsp;
              <img className='gender' src={
                this.props.gender == 'M' ? male :
                this.props.gender == 'F' ? female : ''} />
              </Media.Heading>
            <p className={this.props.level ? '' : 'invisible'}>
              Level {this.props.level}
            </p>
          </Media.Body>
          {this.props.shiny && <Media.Right>*</Media.Right>}
        </Media>
      }>
        <Thumbnail src={this.props.sprite ? this.props.sprite : sprite} />
        <Table condensed>
          <tbody>
            <tr className={this.props.form ? '' : 'invisible'}>
              <th>Form:</th>
              <td>{this.props.form}</td>
            </tr>
            <tr className={this.props.nature ? '' : 'invisible'}>
              <th>Nature:</th>
              <td>{this.props.nature}</td>
            </tr>
            <tr className={this.props.ability ? '' : 'invisible'}>
              <th>Ability:</th>
              <td>{this.props.ability}</td>
            </tr>
            <tr className={this.props.moves ? '' : 'invisible'}>
              <th>Moves:</th>
              <td>
                - {this.props.moves && this.props.moves[0]} <br/>
                - {this.props.moves && this.props.moves[1]} <br/>
                - {this.props.moves && this.props.moves[2]} <br/>
                - {this.props.moves && this.props.moves[3]}
                </td>
            </tr>
            <tr className={this.props.item ? '' : 'invisible'}>
              <th>Item:</th>
              <td>{this.props.item}</td>
            </tr>
            <tr className={this.props.location ? '' : 'invisible'}>
              <th>{this.props.method}</th>
              <td>{this.props.location}</td>
            </tr>
          </tbody>
        </Table>
      </Panel>
    );
  }
}