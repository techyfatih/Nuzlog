import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

import AddModal from './AddModal';
import LUL from './LUL';

export default class Options extends React.Component {
  constructor() {
    super();
    this.state = {
      add: false,
      lul: false
    };
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  open(modal) {
    this.setState({[modal]: true});
  }

  close(modal) {
    this.setState({[modal]: false});
  }

  render() {
    const {add, lul, summary} = this.state;

    return (
      <ButtonGroup justified style={{marginBottom: '10px'}} >
        <Button bsStyle='success' href='#' onClick={() => this.open('add')}>
          Add <span className='hidden-xs'>Pokémon</span>
        </Button>
        <Button bsStyle='info' href='#' onClick={() => this.open('lul')}>
          Catches
        </Button>
        <Button bsStyle='warning' href='#' onClick={() => this.open('lul')}>
          Bag
        </Button>
        <Button bsStyle='danger' href='#' onClick={() => this.open('lul')}>
          Battle
        </Button>
      
        <AddModal show={add} onHide={() => this.close('add')} />
        <LUL show={lul} onHide={() => this.close('lul')} />
      </ButtonGroup>
    );
  }
}