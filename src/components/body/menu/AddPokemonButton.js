import React from 'react';
import { Modal, Media, Panel, Thumbnail, Button, Grid, Row, Col, Table } from 'react-bootstrap';

import './AddPokemon.css';
import pokemon from 'data/pokemon.json';
import icon from 'img/icon.png';
import male from 'img/male.png';
import female from 'img/female.png';
import sprite from 'img/sprite.png';

import { ValidationForm, TextControl, ComboboxControl } from 'components/form/Form';
import { ModalButton } from 'components/other/ModalButton'

class AddPokemonForm extends React.Component {
  render() {
    return (
      <ValidationForm focus='pokemon'>
        <Modal.Body>
          <Panel header={
            <Media className='overflow'>
              <Media.Left align='middle'><img src={icon} /></Media.Left>
              <Media.Body className='overflow'>
                <Col xs={6}>
                  <ComboboxControl id='pokemon' label='Pokémon' items={pokemon} required />
                </Col>
                <Col xs={6}>
                  <TextControl id='nickname' label='Nickname' required />
                </Col>

              </Media.Body>
            </Media>
          }>
            <Thumbnail src={sprite} />
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
        </Modal.Body>
        <Modal.Footer>
          <Button type='submit' bsStyle='success' bsSize='large' block>
            Add Pokémon
          </Button>
        </Modal.Footer>
      </ValidationForm>
    )
  }
}

export default class AddPokemonButton extends React.Component {
  render() {
    return (
      <ModalButton bsStyle='success'
        label={<span>Add <span className='hidden-xs'>Pokémon</span></span>}>
        <Modal.Header><h2>Add Pokémon</h2></Modal.Header>
        <AddPokemonForm />
      </ModalButton>
    );
  }
}