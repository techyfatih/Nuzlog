import React from 'react';
import { Modal, Panel, Row, Col, ControlLabel, FormGroup, FormControl,
  Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';

import getPokemon from 'utilities/getPokemon';
import getFullname from 'utilities/getFullname';

import PokeIcon from 'components/pokemon/PokeIcon';

import RRForm from 'components/form/RRForm';
import { RRFMoves } from 'components/form/RRFControls';

import { changeMoves } from 'actions';

class MovesModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: getPokemon(props.party[props.index])
    };
    this.handleEnter = this.handleEnter.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      pokemon: getPokemon(nextProps.party[nextProps.index])
    });
  }

  handleEnter() {
    this.dispatch(actions.focus('local.moves'));
  }

  handleSubmit(values) {
    const moves = values.moves.filter(move => move);
    this.props.onChangeMoves(this.props.index, moves);
    this.props.onHide();
  }

  render() {
    const {pokemon} = this.state;
    const moves = pokemon.moves ? pokemon.moves.slice() : [];
    for (let i = moves.length; i < 4; i++) {
      moves[i] = '';
    }

    return (
      <Modal
        show={this.props.show}
        onEnter={this.handleEnter}
        onHide={this.props.onHide}>
        <RRForm
          getDispatch={dispatch => this.dispatch = dispatch}
          onUpdate={this.handleUpdate}
          onSubmit={this.handleSubmit}>
          <Modal.Header closeButton><h2>Change Moves</h2></Modal.Header>
          <Modal.Body>
            <p><PokeIcon pokemon={pokemon} /> {getFullname(pokemon)}</p>
            <Row>
              <Col sm={6}>
                <ControlLabel>Old Moves</ControlLabel>
                <FormGroup><FormControl value={moves[0]} disabled /></FormGroup>
                <FormGroup><FormControl value={moves[1]} disabled /></FormGroup>
                <FormGroup><FormControl value={moves[2]} disabled /></FormGroup>
                <FormGroup><FormControl value={moves[3]} disabled /></FormGroup>
              </Col>
              <Col sm={6}>
                <RRFMoves model='.moves' defaultValue={moves} />
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button type='submit' bsStyle='warning' bsSize='large' block>
              Change Moves
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
    onChangeMoves: (index, moves) => {
        dispatch(changeMoves(index, moves));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MovesModal);