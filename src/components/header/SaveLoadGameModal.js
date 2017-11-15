import React from 'react';
import { Modal, FormControl, ButtonGroup, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Control, actions } from 'react-redux-form';

import exportPokemon from 'utilities/exportPokemon';
import { types, newGame, newLocation } from 'actions';

class SaveLoadGameModal extends React.Component {
  constructor() {
    super();
    this.state = {save: ''};
    this.reset = this.reset.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  reset(props) {
    let save = props.title;
    save += '\n' + props.game;
    save += '\n' + props.name;

    if (props.rules.length > 0) {
      save += '\n\nRules:';
      for (let i in props.rules)
        save += '\n' + props.rules[i];
    }
    
    if (props.log.length > 0) {
      save += '\n';
      for (let i in props.log) {
        const {time, type, entry} = props.log[i];
        save += '\n[' + time.toLocaleString() + ']';
        save += ' ' + type + ': ';
        switch (type) {
          case types.NEW_LOCATION:
            save += entry.location;
            break;
          case types.RECORD_LOG:
            save += entry.log;
            break;
          case types.ADD_POKEMON:
            save += exportPokemon(entry.pokemon);
            break;
          default:
            save += JSON.stringify(entry)
        }
      }
    }

    this.setState({save});
  }

  componentWillReceiveProps(nextProps) {
    this.reset(nextProps);
  }

  handleEnter() {
    this.input.focus();
  }

  handleChange(e) {
    this.setState({save: e.target.value});
  }

  handleClick(values) {
    this.props.onHide();
  }

  render() {
    return (
      <Modal show={this.props.show}
        onEnter={this.handleEnter} onHide={this.props.onHide}>
        <Modal.Header closeButton><h2>Save/Load Game</h2></Modal.Header>
        <Modal.Body>
          <p>Here is the current save of your game.</p>
          <p>
            <strong>To save your game, </strong>
            either click "Save File" below
            OR copy-paste this into a text file.
          </p>
          <p>
            <strong>To load your game, </strong>
            either click "Upload File" below OR copy-paste your save file here,
            then click "Load Game".
          </p>
          <Button block>Reset</Button>
          <FormControl componentClass='textarea' rows={15}
            style={{resize: 'none'}}
            spellCheck='false'
            value={this.state.save}
            onChange={this.handleChange}
            inputRef={ref => this.input = ref} />
        </Modal.Body>
        <Modal.Footer>
          <ButtonGroup justified>
            <Button bsStyle='primary' bsSize='large' href='#'
              onClick={this.handleClick}>
              Save File
            </Button>
            <Button bsStyle='primary' bsSize='large' href='#'
              onClick={this.handleClick}>
              Upload File
            </Button>
            <Button bsStyle='primary' bsSize='large' href='#'
              onClick={this.handleClick}>
              Load Game
            </Button>
          </ButtonGroup>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    title: state.title,
    game: state.game,
    name: state.name,
    rules: state.rules,
    log: state.log
  };
};

export default connect(mapStateToProps, null)(SaveLoadGameModal);