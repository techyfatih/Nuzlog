import React from 'react';
import { Media, Panel, Thumbnail, Button, Grid, Row, Col, Table } from 'react-bootstrap';
import { connect } from 'react-redux';

import './AddPokemon.css';
import pokedex from 'data/pokedex.json';
import icon from 'img/icon.png';
import male from 'img/male.png';
import female from 'img/female.png';
import sprite from 'img/sprite.png';
import icons from 'img/icons';

import { Modal, ModalButton, ModalButtonForm } from 'components/modal/Modal'
import ComboboxControl from 'components/form/controls/ComboboxControl';
import TextControl from 'components/form/controls/TextControl';
import CheckboxControl from'components/form/controls/CheckboxControl';
import NumberControl from 'components/form/controls/NumberControl';
import { addPokemon } from 'actions';

import { EnhancedForm, enhanceForm } from 'components/form/test/EnhancedForm';
import EnhancedInput from 'components/form/test/EnhancedInput';
import EnhancedCheckbox from 'components/form/test/EnhancedCheckbox';
import EnhancedCombobox from 'components/form/test/EnhancedCombobox';

let pokemon = [];
for (var i = 0; i < pokedex.length; i++) {
  let name = pokedex[i][0];
  pokemon.push([name, <span><img src={icons[name]}/>{name}</span>]);
}

let fields = new Map();
/*fields.set('pokemon', '');
fields.set('nickname', '');
fields.set('level', 5);
fields.set('shiny', false);
fields.set('form', 'Normal');
fields.set('nature', '');
fields.set('ability', '');
fields.set('move1', '');
fields.set('move2', '');
fields.set('move3', '');
fields.set('move4', '');
fields.set('item', '');
fields.set('method', 0);
fields.set('location', '');*/

class AddPokemonButton extends React.Component {
  render() {
    return (
      <ModalButton bsStyle='success' onOpen={this.props.reset}
        label={<span>Add <span className='hidden-xs'>Pokémon</span></span>}>
        <EnhancedForm onSubmit={this.props.onSubmit}>
          <Modal.Header><h2>Add Pokémon</h2></Modal.Header>

          <Modal.Body>
            <Panel id='add-pokemon' header={
              <Media>
                <Media.Left align='middle'>
                  <img src={this.props.icon ? this.props.icon : icon} />
                </Media.Left>
                <Media.Body>
                  <Row>
                    <Col sm={6}>
                      <EnhancedCombobox id='pokemon'
                        state={this.props.state}
                        form={this.props.form}
                        label='Pokémon*'
                        placeholder='Bulbasaur'
                        items={pokemon}
                        required />
                    </Col>
                    <Col sm={6}>
                      <EnhancedInput id='nickname'
                        state={this.props.state}
                        form={this.props.form}
                        label='Nickname'
                        placeholder='Bulby' />
                    </Col>
                  </Row>
                  <EnhancedInput id='level' type='number'
                    state={this.props.state}
                    form={this.props.form}
                    label='Level*'
                    placeholder={'1-100'}
                    required min={1} max={100} />
                  <EnhancedCheckbox id='shiny'
                    state={this.props.state}
                    form={this.props.form}
                    label='Shiny' />
                </Media.Body>
              </Media>
            }>
            </Panel>
          </Modal.Body>
          <Modal.Footer>
            <Button type='submit' bsStyle='success' bsSize='large' block>
              Add Pokémon
            </Button>
          </Modal.Footer>
        </EnhancedForm>
      </ModalButton>
      /*
      <ModalButtonForm bsStyle='success'
        label={<span>Add <span className='hidden-xs'>Pokémon</span></span>}>

        <Modal.Header><h2>Add Pokémon</h2></Modal.Header>

        <Modal.Body>
          <Panel id='add-pokemon' header={
            <Media>
              <Media.Left align='middle'>
                <img src={this.props.icon ? this.props.icon : icon} />
              </Media.Left>
              <Media.Body>
                <Row>
                  <Col sm={6}>
                    <ComboboxControl id='pokemon' label='Pokémon'
                      placeholder='Bulbasaur' items={pokemon} required />
                  </Col>
                  <Col sm={6}>
                    <TextControl id='nickname' label='Nickname'
                      placeholder='Bulby' required />
                  </Col>
                </Row>
                <Row>
                  <Col sm={6}>
                <NumberControl id='level' label='Level'
                  initialValue={5} min={1} max={100} required/>
                </Col>
                <Col sm={6}>
                <CheckboxControl id='shiny' label='Shiny' />
                </Col>
                </Row>
              </Media.Body>
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
        </Modal.Body>
        <Modal.Footer>
          <Button type='submit' bsStyle='success' bsSize='large' block>
            Add Pokémon
          </Button>
        </Modal.Footer>
      </ModalButtonForm>*/
    );
  }
}

const mapStateToProps = state => {
  return {
    location: state.location
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onAddPokemon: (pokemon) => {
      dispatch(addPokemon(pokemon))
    }
  };
};

const EnhancedAddPokemonButton = enhanceForm(AddPokemonButton, fields);
export default connect(mapStateToProps, mapDispatchToProps)(EnhancedAddPokemonButton);