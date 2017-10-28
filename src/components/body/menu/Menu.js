import React from 'react';
import { Panel, ButtonGroup, Button, Tabs, Tab } from 'react-bootstrap';

import AddPokemonButton from './addPokemon/AddPokemonButton';
import Party from './party/Party';

export default class Menu extends React.Component {
  render() {
    return (
      <Panel header='Menu' bsStyle='success'>
        <ButtonGroup justified>
          <AddPokemonButton />
          <Button bsStyle='info' href='#'>Catches</Button>
          <Button bsStyle='warning' href='#'>Bag</Button>
          <Button bsStyle='danger' href='#'>Battle</Button>
        </ButtonGroup>

        <Tabs defaultActiveKey={1} id='pokemon-tabs' justified>
          <Tab eventKey={1} title='Party'><Party /></Tab>
          <Tab eventKey={2} title='PC'>PC</Tab>
          <Tab eventKey={3} title='Cemetery'>Cemetery</Tab>
        </Tabs>
      </Panel>
    );
  }
}