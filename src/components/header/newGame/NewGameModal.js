import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';

import games from 'data/games.json';

import { RRForm, RRFControl } from 'components/form/RRF';
import { newGame, newLocation } from 'actions';
import Rules from './Rules';

class NewGameModal extends React.Component {
  constructor() {
    super();
    this.state = {
      rules: []
    };
    this.handleEnter = this.handleEnter.bind(this);
    this.addRule = this.addRule.bind(this);
    this.removeRule = this.removeRule.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEnter() {
    this.setState({
      rules: []
    });
    this.dispatch(actions.focus('local.title'));
  }

  addRule(rule) {
    this.setState(({rules}) => ({
      rules: [...rules, rule]
    }));
  }
  
  removeRule(index) {
    this.setState(({rules}) => ({
      rules: [
        ...rules.slice(0, index),
        ...rules.slice(index + 1)
      ]
    }));
  }

  handleSubmit(values) {
    this.props.onNewGame(
      values.title,
      values.game,
      values.name,
      values.location,
      this.state.rules
    );

    const cover = document.getElementById('cover');
    if (cover != null) cover.remove();

    this.props.onHide();
  }

  render() {
    return (
      <Modal show={this.props.show} onEnter={this.handleEnter}
        onHide={this.props.onHide}>
        <RRForm getDispatch={dispatch => this.dispatch = dispatch}
          onSubmit={this.handleSubmit}>

          <Modal.Header closeButton>
            <Modal.Title>New Game</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <RRFControl model='.title' id='new-title' label='Title*'
              placeholder='The Great Nuzlocke Challenge' required/>
            
            <RRFControl model='.game' component='combobox' id='new-game'
              label='Game*' placeholder='Pokémon Ruby' required>
              {games}
            </RRFControl>

            <RRFControl model='.name' id='new-name' label='Name*'
              placeholder='Ruby' required/>
              
            <RRFControl model='.location' id='new-locaiton'
              label='Initial Location' placeholder='Littleroot Town'/>

            <Rules rules={this.state.rules}
              addRule={this.addRule} removeRule={this.removeRule}/>
          </Modal.Body>

          <Modal.Footer>
            <Button type='submit' bsStyle='primary' bsSize='large' block>
              Start
            </Button>
          </Modal.Footer>
        </RRForm>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onNewGame: (title, game, name, location, rules) => {
        dispatch(newGame(title, game, name, rules))
        if (location)
          dispatch(newLocation(location));
    }
  };
};

export default connect(null, mapDispatchToProps)(NewGameModal);