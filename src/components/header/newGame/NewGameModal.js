import React from 'react';
import { Modal, Button, ToggleButtonGroup, Table, Col, Row, Grid } from 'react-bootstrap';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';

import './NewGame.css';
import games from 'data/games.json';

import RRForm from 'components/form/RRForm';
import { RRFText, RRFCombobox } from 'components/form/RRFControls';
import StyledToggle from 'components/form/controls/StyledToggle';
import { newGame, newLocation } from 'actions';
import Rules from './Rules';

class NewGameModal extends React.Component {
  constructor() {
    super();
    this.state = {
      disable: [],
      rule: '',
      rules: []
    };
    this.reset = this.reset.bind(this);
    this.handleDisableChange = this.handleDisableChange.bind(this);
    this.addRule = this.addRule.bind(this);
    this.removeRule = this.removeRule.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  reset() {
    this.setState({
      disable: [],
      rule: '',
      rules: []
    });
    this.dispatch(actions.focus('local.title'));
  }

  handleDisableChange(disable) {
    this.setState({disable});
  }

  addRule(rule) {
    this.setState(prevState => {
      return {rules: [...prevState.rules, rule]};
    })
  }
  
  removeRule(key) {
    if (this.state.rules[key]) {
      this.setState(prevState => {
        return {
          rules: prevState.rules.filter((rule, index) => index != key)
        };
      });
    }
  }

  handleSubmit(values) {
    const info = {
      title: values.title,
      game: values.game,
      name: values.name
    };
    let location = values.location
    const rules = {
      genders: !this.state.disable.includes('genders'),
      natures: !this.state.disable.includes('natures'),
      abilities: !this.state.disable.includes('abilities'),
      list: this.state.rules
    }
    this.props.onNewGame(info, rules, location);

    const cover = document.getElementById('cover');
    if (cover != null) cover.remove();
    this.props.onHide();
  }

  render() {
    return (
      <Modal show={this.props.show}
        onEnter={this.reset} onHide={this.props.onHide}>
        <RRForm getDispatch={dispatch => this.dispatch = dispatch}
          onSubmit={this.handleSubmit}>
          <Modal.Header closeButton><h2>New Game</h2></Modal.Header>
          <Modal.Body>
            <RRFText model='.title' label='Title*'
              placeholder='The Great Nuzlocke Challenge' required/>
            <RRFCombobox model='.game' label='Game*'
              placeholder='Pokémon Ruby' items={games} required/>
            <RRFText model='.name' label='Name*'
              placeholder='Ruby' required/>
            <RRFText model='.location' label='Initial Location'
              placeholder='Littleroot Town'/>

            <div className='clearfix'>
              <ToggleButtonGroup type='checkbox' vertical className='pull-left'
                value={this.state.disable}
                onChange={this.handleDisableChange}>
                <StyledToggle value='genders'>Disable Genders</StyledToggle>
                <StyledToggle value='natures'>Disable Natures</StyledToggle>
                <StyledToggle value='abilities'>Disable Abilities</StyledToggle>
              </ToggleButtonGroup>
              
              <div id='new-rules' className='pull-right'>
                <Rules rules={this.state.rules}
                  addRule={this.addRule} removeRule={this.removeRule}/>
              </div>
            </div>
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
    onNewGame: (info, rules, location) => {
        dispatch(newGame(info, rules))
        if (location)
          dispatch(newLocation(location));
    }
  };
};

export default connect(null, mapDispatchToProps)(NewGameModal);