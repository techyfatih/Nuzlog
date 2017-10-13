import React from 'react';
import { Media } from 'react-bootstrap';
import icon from './img/icon.png';
import female from './img/female-small.png';

export default class PokeSlot extends React.Component {
  render() {
    return (
      <Media style={{margin:0}}>
        <Media.Left align='middle'><img src={icon} /></Media.Left>
        <Media.Body>
          <p style={{margin:0}} className='hidden-xxs'>
            Fletchinder <img src={female} /><br />
            Level 100
          </p>
        </Media.Body>
      </Media>
    );
  }
}