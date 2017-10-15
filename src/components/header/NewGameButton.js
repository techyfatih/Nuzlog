import React from 'react';
import { Modal, Button, Table, Panel, ListGroup, ListGroupItem, InputGroup, FormControl, Glyphicon } from 'react-bootstrap';
import { connect } from 'react-redux';
import { LocalForm, Control, actions } from 'react-redux-form';

import './NewGame.css';
import games from 'data/games.json';
import { newGame, newLocation } from 'actions';
import ValidationForm from 'components/form/ValidationForm';
import { TextControl, Combobox, CheckboxControl, MultiSelect } from
'components/form/FormControls';
import ModalButton from 'components/other/ModalButton';

class NewGameForm extends React.Component {
  constructor() {
    super();
    this.state = {
      rule: '',
      rules: []
    };
    this.handleRuleChange = this.handleRuleChange.bind(this);
    this.handleRuleKeyDown = this.handleRuleKeyDown.bind(this);
    this.addRule = this.addRule.bind(this);
    this.removeRule = this.removeRule.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleRuleChange(e) {
    this.setState({rule: e.target.value});
  }

  handleRuleKeyDown(e) {
    if (e.keyCode == 13) {
      this.addRule();
      e.preventDefault();
    }
  }

  addRule() {
    if (this.state.rule) {
      this.setState(prevState => {
        return {
          rule: '',
          rules: [...prevState.rules, prevState.rule]
        }
      })
    }
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
    this.props.onNewGame(info, rules, values.location);
    this.props.onSubmit();
  }

  render() {
    return (
      <ValidationForm onSubmit={this.handleSubmit} focus='title'
        getDispatch={dispatch => this.dispatch = dispatch}>
        <Modal.Body>
          <TextControl id='title' label='Title*'
            placeholder='The Great Nuzlocke Challenge' required />
          <Combobox id='game' label='Game*'
            placeholder='Pokémon Ruby' items={games} required />
          <TextControl id='name' label='Name*'
            placeholder='Ruby' required />
          <TextControl id='newLocation' label='Initial Location'
            placeholder='Littleroot Town' />
          <Table><tbody><tr>
            <td style={{width: '150px'}} >
              <CheckboxControl id='genders' label='Disable Genders'/>
              <CheckboxControl id='natures' label='Disable Natures'/>
              <CheckboxControl id='abilities' label='Disable Abilities'/>
            </td>
            <td>
              <Panel id='new-rules-panel' header={'Rules'}>
                <ListGroup fill>
                  {this.state.rules.map((rule, index) =>
                    <ListGroupItem key={index}>
                      {rule}
                      <Button className='pull-right'
                        onClick={() => this.removeRule(index)}>
                        <Glyphicon glyph='remove'/>
                      </Button>
                    </ListGroupItem>
                  )}
                </ListGroup>
                <div/>
              </Panel>
              <InputGroup>
                <FormControl type='text' value={this.state.rule}
                  onChange={this.handleRuleChange}
                  onKeyDown={this.handleRuleKeyDown} />
                <InputGroup.Button>
                  <Button onClick={this.addRule}>Add</Button>
                </InputGroup.Button>
              </InputGroup>
            </td>
          </tr></tbody></Table>
        </Modal.Body>
        <Modal.Footer>
          <Button type='submit' bsStyle='primary' bsSize='large' block>
            Start
          </Button>
        </Modal.Footer>
      </ValidationForm>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onNewGame: (info, rules, location) => {
        dispatch(newGame(info, rules))
        dispatch(newLocation(location));
    }
  }
}

const NewGame = connect(null, mapDispatchToProps)(NewGameForm);

export default class NewGameButton extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    this.modal.close();
  }

  render() {
    return (
      <ModalButton bsStyle='primary' label='New Game'
        ref={ref => this.modal = ref}>
        <Modal.Header closeButton><h2>New Game</h2></Modal.Header>
        <NewGame onSubmit={this.handleSubmit} />
      </ModalButton>
    );
  }
}