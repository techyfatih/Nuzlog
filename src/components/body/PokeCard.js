import React from 'react';
import { Media, Panel, Thumbnail, Table } from 'react-bootstrap';

import icon from 'img/icon.png';
import female from 'img/female.png';

export default class PokeCard extends React.Component {
  render() {
    const header = (
      <Media>
        <Media.Left><img src={icon} /></Media.Left>
        <Media.Body>
          <Media.Heading>Fletchinder <img src={female} /></Media.Heading>
          <p>Level 100</p>
        </Media.Body>
        <Media.Right>*</Media.Right>
      </Media>
    );
    return (
      <Panel header={header} style={{width:'270px', margin:0}} >
        <Thumbnail style={{margin:0}} ><img src='http://www.pkparaiso.com/imagenes/xy/sprites/animados/gyarados-mega.gif' /></Thumbnail>
        <Table condensed style={{margin:0}}>
          <tbody>
            <tr>
              <th width={1} style={{border: 0}} >Form:</th>
              <td width={2} style={{border: 0}}>Normal</td>
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