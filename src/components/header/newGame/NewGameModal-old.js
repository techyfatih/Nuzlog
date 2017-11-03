import React from 'react';
import { Modal, Button, Table, Col, Row, Grid } from 'react-bootstrap';
import { connect } from 'react-redux';
import { LocalForm, Control } from 'react-redux-form';
import TextInput, {RRFText} from 'components/form/controls2/TextInput';

import './NewGame.css';

import games from 'data/games.json';
import { newGame, newLocation } from 'actions';
import Enhanced from 'components/form/Enhanced';
import Rules from './Rules';

let fields = [
  ['title', {value: '', required: true}],
  ['game', {value: '', required: true}],
  ['name', {value: '', required: true}],
  ['initLocation', ''],
  ['disableGenders', false],
  ['disableNatures', false],
  ['disableAbilities', false]
];

class NewGameModal extends React.Component {
  constructor() {
    super();
    this.state = {
      rule: '',
      rules: []
    };
    this.reset = this.reset.bind(this);
    this.addRule = this.addRule.bind(this);
    this.removeRule = this.removeRule.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  reset() {
    this.setState({
      rule: '',
      rules: []
    });
    this.props.reset();
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

  handleSubmit(e) {
    this.props.onSubmit(e, () => {
      let values = this.props.state;
      const info = {
        title: values.get('title').value,
        game: values.get('game').value,
        name: values.get('name').value
      };
      let location = values.get('initLocation').value;
      const rules = {
        genders: !values.get('disableGenders').value,
        natures: !values.get('disableNatures').value,
        abilities: !values.get('disableAbilities').value,
        list: this.state.rules
      }
      this.props.onNewGame(info, rules, location);
      const cover = document.getElementById('cover');
      if (cover != null) cover.remove();
      this.props.onHide();
    });
  }

  render() {
    return (
      <Modal show={this.props.show} onEnter={this.reset} onHide={this.props.onHide}>
        <LocalForm>
          <RRFText model='.title' label='Title' required/>
          <input type='submit'/>
        </LocalForm>
        <Enhanced.Form onSubmit={this.handleSubmit}>
          <Modal.Header><h2>New Game</h2></Modal.Header>
          <Modal.Body>
            <Enhanced.Input id='title'
              state={this.props.state}
              onChange={this.props.onChange}
              label='Title*'
              placeholder='The Great Nuzlocke Challenge' />
            <Enhanced.Combobox id='game'
              state={this.props.state}
              onChange={this.props.onChange}
              label='Game*'
              placeholder='Pokémon Ruby'
              items={games} />
            <Enhanced.Input id='name'
              state={this.props.state}
              onChange={this.props.onChange}
              label='Name*'
              placeholder='Ruby' />
            <Enhanced.Input id='initLocation'
              state={this.props.state}
              onChange={this.props.onChange}
              label='Initial Location'
              placeholder='Littleroot Town' />

            <Row className='no-margin'>
              <div className='pull-left'>
                <Enhanced.Checkbox id='disableGenders'
                  state={this.props.state}
                  onChange={this.props.onChange}
                  label='Disable Genders'/>
                <Enhanced.Checkbox id='disableNatures'
                  state={this.props.state}
                  onChange={this.props.onChange}
                  label='Disable Natures'/>
                <Enhanced.Checkbox id='disableAbilities'
                  state={this.props.state}
                  onChange={this.props.onChange}
                  label='Disable Abilities'/>
              </div>
              <div id='new-rules' className='pull-right'>
                <Rules rules={this.state.rules}
                  addRule={this.addRule} removeRule={this.removeRule} />
              </div>
            </Row>
          </Modal.Body>

          <Modal.Footer>
            <Button type='submit' bsStyle='primary' bsSize='large' block>
              Start
            </Button>
          </Modal.Footer>
        </Enhanced.Form>
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

const EnhancedNewGameModal = Enhanced.enhanceForm(NewGameModal, fields);
export default connect(null, mapDispatchToProps)(EnhancedNewGameModal);