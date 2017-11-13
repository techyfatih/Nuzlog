import React from 'react';
import { Modal, InputGroup, FormControl, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';

import getPokemon from 'utilities/getPokemon';
import getFullname from 'utilities/getFullname';

import PokeIcon from 'components/pokemon/PokeIcon';

import RRForm from 'components/form/RRForm';
import { RRFNumber } from 'components/form/RRFControls';

import { levelUp } from 'actions';

class LevelModal extends React.Component {
  constructor(props) {
    super(props);
    const pokemon = getPokemon(props.party[props.index]);
    this.state = {
      pokemon,
      level: pokemon.level ? pokemon.level : 0,
      levels: 1
    };
    this.handleEnter = this.handleEnter.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  componentWillReceiveProps(nextProps) {
    const pokemon = getPokemon(nextProps.party[nextProps.index]);
    this.setState({
      pokemon,
      level: pokemon.level ? pokemon.level : 0
    });
  }

  handleEnter() {
    this.setState({
      levels: 1
    })
    this.dispatch(actions.focus('local.levels'));
  }

  handleChange(levels) {
    this.setState({levels})
  }

  handleSubmit(values) {
    this.props.onLevelUp(this.props.index, values.levels);
    this.props.onHide();
  }

  render() {
    const {pokemon, level, levels} = this.state;
    
    return (
      <Modal
        show={this.props.show}
        onEnter={this.handleEnter}
        onHide={this.props.onHide}>
        <RRForm
          getDispatch={dispatch => this.dispatch = dispatch}
          onUpdate={this.handleUpdate}
          onSubmit={this.handleSubmit}>
          <Modal.Header closeButton><h2>Level Up</h2></Modal.Header>
          <Modal.Body>
            <p>
              <PokeIcon pokemon={pokemon} />&nbsp;
              {getFullname(pokemon)}
            </p>
            <RRFNumber model='.levels' placeholder='1-100' required
              onChange={this.handleChange}
              defaultValue={1}>
              <InputGroup.Addon>Level(s)</InputGroup.Addon>
            </RRFNumber>
            <p>
              From <strong>Level {level} </strong>
              to <strong>Level {level + levels}</strong>
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button type='submit' bsStyle='primary' bsSize='large' block>
              Level Up
            </Button>
          </Modal.Footer>
        </RRForm>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    party: state.party
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLevelUp: (index, number) => {
        dispatch(levelUp(index, number));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LevelModal);