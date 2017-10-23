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
          <Media.Left align='middle'><img src={icon} /></Media.Left>
          <Media.Body>
            <Media.Heading>Fletchinder (Fletchinder) <img src={male} /></Media.Heading>
            <p>Level 100</p>
          </Media.Body>
          <Media.Right>*</Media.Right>
        </Media>
      }>
        <Thumbnail src={'https://www.pkparaiso.com/imagenes/sol-luna/sprites/animados/celesteela.gif'} />
        <Table condensed>
          <tbody>
            <tr>
              <th>Form:</th>
              <td>Normal</td>
            </tr>
            <tr>
              <th>Nature:</th>
              <td>Adamant</td>
            </tr>
            <tr>
              <th>Ability:</th>
              <td>New Bark Town</td>
            </tr>
            <tr>
              <th>Moves:</th>
              <td>
                - Ice Beam <br/>
                - Thunderbolt <br/>
                - Nasty Plot <br/>
                - Protect
              </td>
            </tr>
            <tr>
              <th>Item:</th>
              <td>Gyaradosite</td>
            </tr>
            <tr>
              <th>Received at:</th>
              <td>Lake of Rage</td>
            </tr>
          </tbody>
        </Table>
      </Panel>
    );
  }
}