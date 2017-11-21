import React from 'react';
import { Modal, Tabs, Tab, Panel, FormGroup, ControlLabel, Row, Col, Button } from 'react-bootstrap';
import { Control, actions } from 'react-redux-form';
import { connect } from 'react-redux';

import './EditModal.css';

import natures from 'data/natures.json';
import abilities from 'data/abilities.json';

import male from 'img/male.png';
import female from 'img/female.png';

import PokeSlot from 'components/pokemon/slot/PokeSlot';
import PokeSprite from 'components/pokemon/sprite/PokeSprite';

import equals from 'utilities/equals';
import exportDiff from 'utilities/exportDiff';
import toReact from 'utilities/toReact';

import { Input, Combobox, PokeCombobox, FormsCombobox, MovesList, ToggleGroup,
  Check } from 'components/form/controls/Controls';
import { editPokemon } from 'actions';

class EditModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {change: {}};
    this.reset = this.reset.bind(this);
    this.updatePokemon = this.updatePokemon.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }
  
  reset() {
    this.setState({change: {}});
  }
  
  updatePokemon(change) {
    this.setState(prevState => {
      change = {...prevState.change, ...change};
      for (let i in change) {
        if (equals(change[i], this.props.pokemon[i]))
          delete change[i];
      }
      return {change};
    });
  }

  handleEdit() {
    const {change} = this.state;
    if (Array.isArray(change.moves))
      change.moves = change.moves.filter(move => move);

    this.props.onEditPokemon(this.props.pokemon.index, change);
    this.props.onHide();
  }

  render() {
    const {change} = this.state;
    const prev = this.props.pokemon ? this.props.pokemon : {};
    const pokemon = {...prev, ...change};

    const level = change.level != null ? change.level : prev.level;
    const form = change.form != null ? change.form : prev.form;
    const moves = change.moves != null ? change.moves : prev.moves;
    const item = change.item != null ? change.item : prev.item;
    const species = change.species != null ? change.species : prev.species;
    const ability = change.ability != null ? change.ability : prev.ability;
    const nickname = change.nickname != null ? change.nickname : prev.nickname;
    const method = change.method != null ? change.method : prev.method;
    const location = change.location != null ? change.location : prev.location;
    const gender = change.gender != null ? change.gender : prev.gender;
    const nature = change.nature != null ? change.nature : prev.nature;
    const shiny = change.shiny != null ? change.shiny : prev.shiny;
    
    return (
      <Modal
        show={this.props.show}
        onEnter={this.reset}
        onHide={this.props.onHide}>
        <Modal.Header closeButton><h2>Edit Pokémon</h2></Modal.Header>

        <Modal.Body id='edit-body'>
          <PokeSlot pokemon={pokemon} />
          <PokeSprite pokemon={pokemon} />
          <Panel id='change' header='Change'>
            {toReact(exportDiff(prev, change))}
          </Panel>

          <Tabs defaultActiveKey={1} id='edit-tabs'>
            <Tab eventKey={1} title='Level'>
              <Panel bsStyle='info'>
                <p><em>Previous Level: </em>{prev.level}</p>
                <Input type='number' placeholder='1-100' value={level}
                  onChange={level => this.updatePokemon({level})} />
              </Panel>
            </Tab>

            <Tab eventKey={2} title='Form'>
              <Panel bsStyle='warning'>
                <p><em>Previous Form: </em>{prev.form}</p>
                <FormsCombobox placeholder='Normal' pokemon={pokemon}
                  value={form} onChange={form => this.updatePokemon({form})} />
              </Panel>
            </Tab>

            <Tab eventKey={3} title='Moves'>
              <Panel bsStyle='warning'>
                <p>
                  <em>Previous Moves: </em>
                  {Array.isArray(prev.moves) &&
                  prev.moves.map((move, index) => (
                    <span key={index}><br />-{move}</span>
                  ))}
                </p>
                <MovesList value={moves}
                  onChange={moves => this.updatePokemon({moves})} />
              </Panel>
            </Tab>

            <Tab eventKey={4} title='Item'>
              <Panel bsStyle='warning'>
              <p><em>Previous Item: </em>{prev.item}</p>
                <Input placeholder='Oran Berry' value={item}
                  onChange={item => this.updatePokemon({item})} />
              </Panel>
            </Tab>

            <Tab eventKey={5} title='Evolve/Ability'>
              <Panel bsStyle='success'>
                <Row className='row-no-padding'>
                  <Col xs={6}>
                    <p><em>Previously:</em> {prev.species}</p>
                  </Col>
                  <Col xs={6}>
                    <p><em>Previous Ability: </em>{prev.ability}</p>
                  </Col>
                </Row>
                <Row className='row-no-padding'>
                  <Col xs={6}>
                    <ControlLabel htmlFor='edit-species'>Pokémon</ControlLabel>
                    <PokeCombobox id='edit-species' placeholder='Ivysaur'
                      value={species}
                      onChange={species => this.updatePokemon({species})} />
                  </Col>
                  
                  <Col xs={6}>
                    <ControlLabel htmlFor='edit-ability'>Ability</ControlLabel>
                    <Combobox id='ability' placeholder='Overgrow'
                      value={ability}
                      onChange={ability => this.updatePokemon({ability})}>
                      {abilities}
                    </Combobox>
                  </Col>
                </Row>
              </Panel>
            </Tab>
            
            <Tab eventKey={6} title='Other'>
              <Panel>
                <p><em>Previous Nickname: </em>{prev.nickname}</p>
                <FormGroup controlId='nickname'>
                  <ControlLabel>Nickname</ControlLabel>
                  <Input placeholder='Bulby' value={nickname}
                    onChange={nickname => this.updatePokemon({nickname})} />
                </FormGroup>

                <p><em>Previous Location: </em>{prev.method} {prev.location}</p>
                <ControlLabel htmlFor='edit-location'>Location</ControlLabel>
                <Row className='row-no-padding'>
                  <Col xs={6}>
                    <Input componentClass='select' value={method}
                      onChange={method => this.updatePokemon({method})}>
                      <option value='Received at:'>Received at:</option>
                      <option value='Caught at:'>Caught at:</option>
                    </Input>
                  </Col>
                  <Col xs={6}>
                    <FormGroup>
                      <Input id='edit-location' placeholder='Pallet Town'
                        value={location}
                        onChange={location => this.updatePokemon({location})} />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col sm={4} xs={7}>
                    <p><em>Previous Gender: </em>{prev.gender}</p>
                    <FormGroup>
                      <ControlLabel>Gender</ControlLabel>
                      <ToggleGroup type='radio' name='edit-gender'
                        value={gender}
                        onChange={gender => this.updatePokemon({gender})}>
                        <img src={male} value='M' />
                        <img src={female} value='F' />
                        <span value='N'>N/A</span>
                      </ToggleGroup>
                    </FormGroup>
                  </Col>
                  <Col sm={8} xs={12}>
                    <p><em>Previous Nature: </em>{prev.nature}</p>
                    <ControlLabel htmlFor='edit-nature'>Nature</ControlLabel>
                    <Combobox id='edit-nature' placeholder='Adamant'
                      value={nature}
                      onChange={nature => this.updatePokemon({nature})}>
                      {natures}
                    </Combobox>
                  </Col>
                </Row>
                <p><em>Previously Shiny: </em>{prev.shiny ? 'Yes' : 'No'}</p>
                <Check value={shiny}
                  onChange={shiny => this.updatePokemon({shiny})}>
                  <strong>Shiny</strong>
                </Check>
              </Panel>
            </Tab>
          </Tabs>
          <Button bsStyle='primary' block onClick={this.reset}>Reset</Button>
        </Modal.Body>
        <Modal.Footer>
          <Button type='submit' bsStyle='warning' bsSize='large' block
            onClick={this.handleEdit}
            disabled={!species || !location
              || Object.values(change).length == 0}>
            Edit Pokémon
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onEditPokemon: (index, change) => {
      dispatch(editPokemon(index, change))
    }
  };
};

export default connect(null, mapDispatchToProps)(EditModal);