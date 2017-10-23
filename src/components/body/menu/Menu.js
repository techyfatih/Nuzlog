import React from 'react';
import { Panel, ButtonGroup, Button, Tabs, Tab, ToggleButtonGroup, ToggleButton, Table } from 'react-bootstrap';

import AddPokemonButton from './AddPokemonButton';
import PokeSlot from 'components/pokemon/PokeSlot'
import PokeCard from 'components/pokemon/PokeCard';

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

        <Tabs defaultActiveKey={1} id='pokemon-tabs' justified style={{marginTop:'10px'}}>
          <Tab eventKey={1} title='Party'>
            <Panel style={{margin:0}}><Table style={{margin:0}} ><tbody><tr>
              <td style={{border:0, padding:0}}>
                <ToggleButtonGroup type='radio' name='party' vertical>
                  <ToggleButton value={1} disabled><PokeSlot /></ToggleButton>
                  <ToggleButton value={2} disabled><PokeSlot /></ToggleButton>
                  <ToggleButton value={3} disabled><PokeSlot /></ToggleButton>
                  <ToggleButton value={4} disabled><PokeSlot /></ToggleButton>
                  <ToggleButton value={5} disabled><PokeSlot /></ToggleButton>
                  <ToggleButton value={6} disabled><PokeSlot /></ToggleButton>
                </ToggleButtonGroup>
              </td>
              <td style={{border:0, padding:0}}><PokeCard /></td>
            </tr></tbody></Table></Panel>
          </Tab>
          <Tab eventKey={2} title='PC'>PC</Tab>
          <Tab eventKey={3} title='Cemetery'>Cemetery</Tab>
        </Tabs>
      </Panel>
    );
  }
}