import React from 'react';
import { Panel, ButtonGroup, Button, Tabs, Tab } from 'react-bootstrap';

import AddPokemonModal from './addPokemon/AddPokemonModal';
import LUL from './LUL';
import Party from './party/Party';
import PC from './pc/PC';
import Cemetery from './cemetery/Cemetery';

export default class Menu extends React.Component {
  constructor() {
    super();
    this.state = {
      addOpen: false,
      lul: false
    };
    this.openAdd = this.openAdd.bind(this);
    this.closeAdd = this.closeAdd.bind(this);
    this.openLUL = this.openLUL.bind(this);
    this.closeLUL = this.closeLUL.bind(this);
  }

  openAdd() {
    this.setState({addOpen: true});
  }

  closeAdd() {
    this.setState({addOpen: false});
  }

  openLUL() {
    this.setState({lul: true});
  }

  closeLUL() {
    this.setState({lul: false});
  }

  render() {
    return (
      <Panel header='Menu' bsStyle='success'>
        <ButtonGroup justified>
          <Button bsStyle='success' href='#' onClick={this.openAdd}>
            Add <span className='hidden-xs'>Pokémon</span>
          </Button>
          <Button bsStyle='info' href='#' onClick={this.openLUL}>
            Catches
          </Button>
          <Button bsStyle='warning' href='#' onClick={this.openLUL}>
            Bag
          </Button>
          <Button bsStyle='danger' href='#' onClick={this.openLUL}>
            Battle
          </Button>
        </ButtonGroup>

        <Tabs defaultActiveKey={1} id='pokemon-tabs' justified>
          <Tab eventKey={1} title='Party'><Party /></Tab>
          <Tab eventKey={2} title='PC'><PC /></Tab>
          <Tab eventKey={3} title='Cemetery'><Cemetery /></Tab>
        </Tabs>
        
        <AddPokemonModal
          show={this.state.addOpen} onHide={this.closeAdd} />
        <LUL show={this.state.lul} onHide={this.closeLUL} />
      </Panel>
    );
  }
}