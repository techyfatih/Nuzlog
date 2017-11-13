import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';

import games from 'data/games.json';

import RRForm from 'components/form/RRForm';
import { RRFText, RRFCombobox } from 'components/form/RRFControls';
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
    if (this.state.rules[index]) {
      this.setState(({rules}) => ({
        rules: rules.filter((rule, _index) => index != _index)
      }));
    }
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
      <Modal
        show={this.props.show}
        onEnter={this.handleEnter}
        onHide={this.props.onHide}>
        <RRForm
          getDispatch={dispatch => this.dispatch = dispatch}
          onSubmit={this.handleSubmit}>

          <Modal.Header closeButton><h2>New Game</h2></Modal.Header>

          <Modal.Body>
            <RRFText model='.title' label='Title*'
              placeholder='The Great Nuzlocke Challenge' required/>

            <RRFCombobox model='.game' label='Game*'
              placeholder='Pokémon Ruby' required>
              {games}
            </RRFCombobox>

            <RRFText model='.name' label='Name*'
              placeholder='Ruby' required/>
              
            <RRFText model='.location' label='Initial Location'
              placeholder='Littleroot Town'/>

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