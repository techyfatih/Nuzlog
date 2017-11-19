import React from 'react';
import { Modal, FormControl, ButtonGroup, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Control, actions } from 'react-redux-form';
import {saveAs} from 'file-saver';

import ConfirmModal from 'components/other/ConfirmModal';

import { types, newGame, newLocation, recordLog, addPokemon, editPokemon,
  movePokemon, death } from 'actions';

class SaveLoadGameModal extends React.Component {
  constructor() {
    super();
    this.state = {
      save: '',
      error: '',
      confirm: false,
      state: null
    };
    this.reset = this.reset.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
    this.confirm = this.confirm.bind(this);
  }

  reset(props) {
    const save = !this.props.gameOpen ? '' : JSON.stringify({
      title: props.title,
      game: props.game,
      name: props.name,
      rules: props.rules,
      log: props.log.map(log => {
        const {pokemon, ..._log} = log;
        return _log;
      })
    });
    this.setState({
      save,
      error: ''
    });
  }

  componentWillReceiveProps(nextProps) {
    this.reset(nextProps);
  }

  handleEnter() {
    this.reset(this.props);
    this.input.focus();
  }

  handleChange(e) {
    this.setState({save: e.target.value});
  }
  
  handleSave() {
    const blob = new Blob(
      [this.state.save],
      {type: 'text/plain;charset=utf-8'}
    );
    const title = this.props.title ? this.props.title : "Untitled";
    saveAs(blob, title + '.json');
  }

  handleUpload(e) {
    const reader = new FileReader();
    reader.onload = _e => {
      this.setState({
        save: _e.target.result
      });
    };

    reader.readAsText(e.target.files[0]);
  }

  handleLoad() {
    try {
      const state = JSON.parse(this.state.save);
      if (!state.title) throw 'No title specified';
      if (!state.game) throw 'No game specified';
      if (!state.name) throw 'No name specified';

      for (let i in state.log) {
        const log = state.log[i];
        let {time, type, entry} = log;
        time = new Date(time);
        if (isNaN(time)) throw 'Invalid time for log ' + i;
        log.time = time;
      }

      if (!this.props.gameOpen) {
        this.props.onLoadGame(state);
        this.props.onHide();
        this.props.onOpenGame();
      } else {
        this.setState({
          confirm: true,
          state,
          error: ''
        });
      }
    } catch (e) {
      const error = e.message ? e.message : e;
      this.setState({error});
    }
  }

  confirm() {
    this.props.onLoadGame(this.state.state);
    this.props.onHide();
    this.setState({
      confirm: false,
      state: null
    });
  }

  render() {
    const {save, error, confirm} = this.state;

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
          <Button onClick={() => this.reset(this.props)} block>Reset</Button>
          <FormControl componentClass='textarea' rows={15}
            style={{resize: 'none'}}
            spellCheck='false'
            value={save}
            onChange={this.handleChange}
            inputRef={ref => this.input = ref} />
          {error && <span style={{color: 'red'}}>Error: {error}</span>}
        </Modal.Body>
        <Modal.Footer>
          <ButtonGroup justified bsSize='large'>
            <Button bsStyle='primary' href='#' onClick={this.handleSave}>
              Save File
            </Button>
            <Button bsStyle='primary' href='#'
              onClick={() => this.input.click()}>
              Upload File
            </Button>
            <Button bsStyle='primary' href='#' onClick={this.handleLoad}>
              Load Game
            </Button>
          </ButtonGroup>
          <input type='file' style={{display: 'none'}}
            onChange={this.handleUpload}
            ref={ref => this.input = ref} />
        </Modal.Footer>

        <ConfirmModal show={confirm}
          onHide={() => this.setState({confirm: false})}
          onConfirm={this.confirm}>
          Are you sure you want to load a new game? All unsaved progress
          will be lost.
        </ConfirmModal>
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

const mapDispatchToProps = dispatch => {
  return {
    onLoadGame: state => {
      dispatch(newGame(state.title, state.game, state.name, state.rules));
      for (let i in state.log) {
        const {type, time, entry} = state.log[i];
        switch (type) {
          case types.NEW_LOCATION:
            dispatch(newLocation(entry.location, time))
            break;
          case types.ADD_POKEMON:
            dispatch(addPokemon(entry.pokemon, time));
            break;
          case types.EDIT_POKEMON:
            dispatch(editPokemon(entry.index, entry.change, time));
            break;
          case types.MOVE_POKEMON:
            dispatch(movePokemon(entry.party, entry.pc, time));
            break;
          case types.DEATH:
            dispatch(death(entry.index, entry.cause));
            break;
          default:
            dispatch(recordLog(entry.log ? entry.log : entry, time));
        }
      }
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveLoadGameModal);