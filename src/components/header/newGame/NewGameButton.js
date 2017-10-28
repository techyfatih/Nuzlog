import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { connect } from 'react-redux';

import games from 'data/games.json';
import { newGame, newLocation } from 'actions';
import { Modal, ModalButtonForm } from 'components/modal/Modal';
import ValidationForm from 'components/form/ValidationForm';
import { TextControl, ComboboxControl, CheckboxControl } from 'components/form/Controls';
import Rules from './Rules';

class NewGameButton extends React.Component {
  constructor() {
    super();
    this.state = {
      rule: '',
      rules: []
    };
    this.addRule = this.addRule.bind(this);
    this.removeRule = this.removeRule.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    const rules = {
      genders: !values.genders,
      natures: !values.natures,
      abilities: !values.abilities,
      list: this.state.rules
    }
    this.props.onNewGame(info, rules, values.newLocation);
    const cover = document.getElementById('cover');
    if (cover != null) cover.remove();
  }

  render() {
    return (
      <ModalButtonForm bsStyle='primary' label='New Game' focus='title'
        onSubmit={this.handleSubmit}>
        <Modal.Header><h2>New Game</h2></Modal.Header>

        <Modal.Body>
          <TextControl id='title' label='Title*'
            placeholder='The Great Nuzlocke Challenge' required />
          <ComboboxControl id='game' label='Game*'
            placeholder='Pokémon Ruby' items={games} required />
          <TextControl id='name' label='Name*'
            placeholder='Ruby' required />
          <TextControl id='newLocation' label='Initial Location'
            placeholder='Littleroot Town' />

          <Table>
            <tbody>
              <tr>
                <td width={150} >
                  <CheckboxControl id='genders' label='Disable Genders'/>
                  <CheckboxControl id='natures' label='Disable Natures'/>
                  <CheckboxControl id='abilities' label='Disable Abilities'/>
                </td>
                <td>
                  <Rules rules={this.state.rules}
                    addRule={this.addRule} removeRule={this.removeRule} />
                </td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>

        <Modal.Footer>
          <Button type='submit' bsStyle='primary' bsSize='large' block>
            Start
          </Button>
        </Modal.Footer>
      </ModalButtonForm>
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

export default connect(null, mapDispatchToProps)(NewGameButton);