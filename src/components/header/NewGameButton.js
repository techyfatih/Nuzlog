import React from 'react';
import { Modal, Button, Table, Panel, ListGroup, ListGroupItem, InputGroup, FormControl, Glyphicon } from 'react-bootstrap';
import { connect } from 'react-redux';

import games from 'data/games.json';
import { newGame, newLocation } from 'actions';
import { ModalButtonForm } from 'components/other/ModalButton';
import { ValidationForm, TextControl, ComboboxControl, CheckboxControl } from 'components/form/Form';
import StickyTable from 'components/other/StickyTable';

const cover = document.getElementById('cover');

class Rules extends React.Component {
  constructor() {
    super();
    this.state = {rule: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.addRule = this.addRule.bind(this);
  }
  
  handleChange(e) {
    this.setState({rule: e.target.value});
  }

  handleKeyDown(e) {
    if (e.keyCode == 13) {
      this.addRule();
      e.preventDefault();
    }
  }

  addRule() {
    if (this.state.rule) {
      this.props.addRule(this.state.rule);
      this.setState({rule: ''});
    }
  }

  render() {
    return (
      <div>
        <StickyTable>
          <StickyTable.Header>
            <th>Rules</th>
          </StickyTable.Header>
          <StickyTable.Body height={100}>
            {this.props.rules.map((rule, index) =>
              <tr key={index}>
                <td>{rule}</td>
                <td width={24}>
                  <Button className='close'
                    onClick={() => this.props.removeRule(index)}>
                    <Glyphicon glyph='remove'/>
                  </Button>
                </td>
              </tr>
            )}
          </StickyTable.Body>
        </StickyTable>
        <InputGroup>
          <FormControl type='text' value={this.state.rule}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown} />
          <InputGroup.Button>
            <Button onClick={this.addRule}>Add</Button>
          </InputGroup.Button>
        </InputGroup>
      </div>
    )
  }
}

class _NewGameButton extends React.Component {
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
          <Table><tbody><tr>
            <td width={150} >
              <CheckboxControl id='genders' label='Disable Genders'/>
              <CheckboxControl id='natures' label='Disable Natures'/>
              <CheckboxControl id='abilities' label='Disable Abilities'/>
            </td>
            <td>
              <Rules rules={this.state.rules}
                addRule={this.addRule} removeRule={this.removeRule} />
            </td>
          </tr></tbody></Table>
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
  }
}

const NewGameButton = connect(null, mapDispatchToProps)(_NewGameButton);
export default NewGameButton;