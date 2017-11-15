import React from 'react';
import { Modal, Panel, Checkbox, Button, Row, Col, ControlLabel,
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
import { editPokemon } from 'actions';

class EditModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {pokemon: null};
    this.handleEnter = this.handleEnter.bind(this);
    this.updatePokemon = this.updatePokemon.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({pokemon: nextProps.pokemon});
  }
  
  handleEnter() {
    const {dispatch} = this;
    const {pokemon} = this.state;

    dispatch(actions.change('local.level', pokemon && pokemon.level ? pokemon.level : ''));
    dispatch(actions.change('local.form', pokemon && pokemon.form ? pokemon.form : ''));
    //dispatch(actions.change('local.moves[0]', pokemon && pokemon.moves ? pokemon.moves[0] : ''));
    //dispatch(actions.change('local.moves[1]', pokemon && pokemon.moves ? pokemon.moves[1] : ''));
    //dispatch(actions.change('local.moves[2]', pokemon && pokemon.moves ? pokemon.moves[2] : ''));
    //dispatch(actions.change('local.moves[3]', pokemon && pokemon.moves ? pokemon.moves[3] : ''));
    dispatch(actions.change('local.item', pokemon && pokemon.item ? pokemon.item : ''));
    dispatch(actions.change('local.species', pokemon && pokemon.species ? pokemon.species : ''));
    dispatch(actions.change('local.ability', pokemon && pokemon.ability ? pokemon.ability : ''));
    dispatch(actions.change('local.nickname', pokemon && pokemon.nickname ? pokemon.nickname : ''));
    dispatch(actions.change('local.method', pokemon && pokemon.method ? pokemon.method : ''));
    dispatch(actions.change('local.location', pokemon && pokemon.location ? pokemon.location : ''));
    dispatch(actions.change('local.gender', pokemon && pokemon.gender ? pokemon.gender : ''));
    dispatch(actions.change('local.shiny', pokemon && pokemon.shiny ? pokemon.shiny : false));
    dispatch(actions.change('local.nature', pokemon && pokemon.nature ? pokemon.nature : ''));
    dispatch(actions.setPristine('local'));
  }

  updatePokemon(pokemon) {
    this.setState(prevState => {
      return {
        pokemon: {...prevState.pokemon, ...pokemon}
      };
    });
  }

  handleSubmit(values) {
    const {pokemon} = this.state;
    if (pokemon) {
      const moves = values.moves.filter(move => move);
      this.props.onEditPokemon(pokemon.index, {...values, moves});
      this.props.onHide();
    }
  }

  render() {
    const {pokemon} = this.state;

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
            <Modal.Title>Edit Pokémon</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <PokeSlot pokemon={pokemon} />
            <PokeSprite pokemon={pokemon} />

            <Panel bsStyle='info' collapsible header='Level'>
              <RRFNumber model='.level' placeholder='1-100'
                onChange={level => this.updatePokemon({level})} />
            </Panel>

            <Panel bsStyle='warning' collapsible header='Form'>
              <RRFForms model='.form' placeholder='Normal' pokemon={pokemon}
                onChange={form => this.updatePokemon({form})}/>
            </Panel>

            <Panel bsStyle='warning' collapsible header='Moves'>
              <RRFMoves />
            </Panel>

            <Panel bsStyle='warning' collapsible header='Item'>
              <RRFText model='.item' placeholder='Oran Berry' />
            </Panel>

            <Panel bsStyle='success' collapsible header='Evolve/Ability'>
                <RRFPokemon model='.species' label='Pokemon*'
                  placeholder='Bulbasaur'
                  onChange={species => this.updatePokemon({species})} />
                  <RRFCombobox model='.ability' label='Ability'
                    placeholder='Overgrow'>
                    {abilities}
                  </RRFCombobox>
            </Panel>

            <Panel collapsible header='Other' className='no-margin'>
                <RRFText model='.nickname' label='Nickname'
                  placeholder='Bulby' />

            <ControlLabel>Location*</ControlLabel>
            <Row className='row-no-padding'>
              <Col xs={6}>
                <RRFSelect model='.method'>
                  <option value='Received at:'>Received at:</option>
                  <option value='Caught at:'>Caught at:</option>
                </RRFSelect>
              </Col>
              <Col xs={6}>
                <RRFText model='.location' placeholder='Pallet Town' />
              </Col>
            </Row>
              <Row>
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
              <RRFCombobox model='.nature' label='Nature'
                placeholder='Adamant'>
                {natures}
              </RRFCombobox>
            </Panel>
          </Modal.Body>
          <Modal.Footer>
            <Button type='submit' bsStyle='warning' bsSize='large' block>
              Edit Pokémon
            </Button>
          </Modal.Footer>
        </RRForm>
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