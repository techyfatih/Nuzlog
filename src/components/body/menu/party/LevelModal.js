import React from 'react';
import { Modal, Panel,
  FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import PokeIcon from 'components/pokemon/PokeIcon';
import { levelUp } from 'actions';

class LevelModal extends React.Component {
  constructor() {
    super();
    this.state = {levels: 1};
    this.handleEnter = this.handleEnter.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEnter() {
    this.setState({levels: 1});
  }

  handleChange(e) {
    const levels = e.target.value ? e.target.value : 1;
    this.setState({levels})
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onLevelUp(this.props.index, this.state.levels);
    this.props.onHide();
  }

  render() {
    const pokemon = this.props.party[this.props.index];
    const name = pokemon ? pokemon.name : '?';
    const level = pokemon ? pokemon.level : 1;
    const newLevel = parseInt(level) + parseInt(this.state.levels);
    return (
      <Modal show={this.props.show}
        onEnter={this.handleEnter} onHide={this.props.onHide}>
        <form
          onSubmit={this.handleSubmit}>
          <Modal.Header closeButton><h2>Level Up</h2></Modal.Header>
          <Modal.Body>
            <p><PokeIcon pokemon={pokemon} /> {name}</p>
            <FormGroup>
              <InputGroup>
                <FormControl type='number' min={1} max={100 - level}
                  placeholder='1-100'
                  value={this.state.levels}
                  onChange={this.handleChange} />
                <InputGroup.Addon>Levels</InputGroup.Addon>
              </InputGroup>
            </FormGroup>
            <p>From <strong>Level {level} </strong>
              to <strong>Level {newLevel}</strong></p>
          </Modal.Body>
          <Modal.Footer>
            <Button type='submit' bsStyle='primary' bsSize='large' block>
              Level Up
            </Button>
          </Modal.Footer>
        </form>
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