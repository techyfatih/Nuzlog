import React from 'react';
import { Modal, Media, Panel, Checkbox, Button, Row, Col, ControlLabel,
  Form } from 'react-bootstrap';
import { Control, actions } from 'react-redux-form';
import { connect } from 'react-redux';

import natures from 'data/natures.json';
import abilities from 'data/abilities.json';

import male from 'img/male.png';
import female from 'img/female.png';

import PokeSlot from 'components/pokemon/slot/PokeSlot';
import PokeSprite from 'components/pokemon/sprite/PokeSprite';

import RRForm from 'components/form/RRForm';
import RRFPokemon from 'components/form/RRFPokemon';
import RRFForms from 'components/form/RRFForms';
import { RRFText, RRFCombobox, RRFNumber, RRFToggle, RRFSelect,
  RRFMoves } from 'components/form/RRFControls';
import { addPokemon } from 'actions';

class AddModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {pokemon: null};
    this.handleEnter = this.handleEnter.bind(this);
    this.updatePokemon = this.updatePokemon.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleEnter() {
    this.setState({pokemon: null});
    this.dispatch(actions.change('local.location', this.props.location));
    this.dispatch(actions.setPristine('local'));
    this.dispatch(actions.focus('local.species'));
  }

  updatePokemon(pokemon) {
    this.setState(prevState => {
      return {
        pokemon: {...prevState.pokemon, ...pokemon}
      };
    });
  }

  handleSubmit(values) {
    this.props.onAddPokemon({
      species: values.species,
      nickname: values.nickname,
      location: values.location,
      level: values.level,
      gender: values.gender,
      shiny: values.shiny,
      form: values.form,
      nature: values.nature,
      ability: values.ability,
      moves: values.moves.filter(move => move),
      item: values.item,
      method: values.method
    });
    this.props.onHide();
  }

  render() {
    return (
      <Modal
        show={this.props.show}
        onEnter={this.handleEnter}
        onHide={this.props.onHide}>
        <RRForm
          getDispatch={dispatch => this.dispatch = dispatch}
          onUpdate={this.handleUpdate}
          onSubmit={this.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Add Pokémon</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <PokeSlot pokemon={this.state.pokemon} />
            <PokeSprite pokemon={this.state.pokemon} />

            <Row className='row-no-padding'>
              <Col xs={6}>
                <RRFPokemon model='.species' label='Pokemon*'
                  placeholder='Bulbasaur' required
                  onChange={species => this.updatePokemon({species})} />
              </Col>
              <Col xs={6}>
                <RRFText model='.nickname' label='Nickname'
                  placeholder='Bulby' />
              </Col>
            </Row>

            <ControlLabel>Location*</ControlLabel>
            <Row className='row-no-padding'>
              <Col xs={6}>
                <RRFSelect model='.method'>
                  <option value='Received at:'>Received at:</option>
                  <option value='Caught at:'>Caught at:</option>
                </RRFSelect>
              </Col>
              <Col xs={6}>
                <RRFText model='.location' placeholder='Pallet Town' required />
              </Col>
            </Row>

            <Panel collapsible header='More Details' className='no-margin'>
              <Row>
                <Col sm={6} xs={12}>
                <RRFNumber model='.level' label='Level' placeholder='1-100'
                  onChange={level => this.updatePokemon({level})} />
                </Col>
                <Col sm={4} xs={7} style={{marginBottom: '10px'}}>
                  <RRFToggle type='radio' model='.gender' label='Gender'
                    onChange={gender => this.updatePokemon({gender})}>
                    <img src={male} value='M' />
                    <img src={female} value='F' />
                    <span value='N'>N/A</span>
                  </RRFToggle>
                </Col>
                <Col xs={2}>
                  <Control.checkbox model='.shiny' component={Checkbox}
                    onChange={e => this.updatePokemon({shiny: e.target.checked})}>
                    Shiny
                  </Control.checkbox>
                </Col>
              </Row>
              <Row>
                <Col xs={6}>
                  <RRFForms model='.form' label='Form' placeholder='Normal'
                    pokemon={this.state.pokemon}
                    onChange={form => this.updatePokemon({form})} />
                  <RRFCombobox model='.nature' label='Nature'
                    placeholder='Adamant'>
                    {natures}
                  </RRFCombobox>
                  <RRFCombobox model='.ability' label='Ability'
                    placeholder='Overgrow'>
                    {abilities}
                  </RRFCombobox>
                </Col>
                <Col xs={6}>
                  <RRFMoves label='Moves' />
                </Col>
              </Row>

              <RRFText model='.item' label='Item' placeholder='Oran Berry' />

            </Panel>
          </Modal.Body>
          <Modal.Footer>
            <Button type='submit' bsStyle='success' bsSize='large' block>
              Add Pokémon
            </Button>
          </Modal.Footer>
        </RRForm>
      </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddModal);