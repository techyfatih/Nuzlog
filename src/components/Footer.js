import React from 'react';
import { Well } from 'react-bootstrap';

export default class Footer extends React.Component {
  render() {
    return (
      <Well id='footer' bsSize='small'>
        Source: <a href="https://github.com/techyfatih/nuzlog" target="_blank">https://github.com/techyfatih/nuzlog</a><br />
        Report issues here: <a href="https://github.com/techyfatih/nuzlog/issues" target="_blank">https://github.com/techyfatih/nuzlog/issues</a><br />
        Thread: <a href="http://s7.zetaboards.com/Nuzlocke_Forum/topic/11009490/1/" target="_blank">http://s7.zetaboards.com/Nuzlocke_Forum/topic/11009490/1/</a><br />
        <br />
        Nuzlog copyright &copy; 2016-2017 Fatih Ridha (TechForce)<br />
        Pokémon copyright &copy; 1995-2017 Nintendo<br />
        Credit for Pokémon images and icons goes to PkParaíso, Serebii, and Bulbapedia
      </Well>
    );
  }
}