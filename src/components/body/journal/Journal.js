import React from 'react';
import { Panel, Button, Row, Col, ListGroup, ListGroupItem, Modal,
  FormGroup, InputGroup, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';

import './Journal.css';

import NewLocation from './newLocation/NewLocation';
import ConfirmModal from 'components/other/ConfirmModal';
import StickyTable from 'components/other/StickyTable';

import exportPokemon from 'utilities/exportPokemon';
import exportDiff from 'utilities/exportDiff';
import exportBoxes from 'utilities/exportBoxes';
import exportDeath from 'utilities/exportDeath';
import toReact from 'utilities/toReact';

import { types, recordLog, undo } from 'actions';

const parseEntry = log => {
  const {type, entry, old} = log;
  switch (type) {
    case types.NEW_LOCATION:
      return entry.location;
      break;
    case types.RECORD_LOG:
      return entry.log;
      break;
    case types.ADD_POKEMON:
      return exportPokemon(entry.pokemon);
      break;
    case types.FAIL_CATCH:
      return entry.location;
      break;
    case types.EDIT_POKEMON:
      return exportDiff(old.pokemon[entry.index], entry.change);
      break;
    case types.MOVE_POKEMON:
      return exportBoxes(old.pokemon, entry.party, entry.pc);
      break;
    case types.DEATH:
      return exportDeath(old.pokemon[entry.index], entry.cause);
      break;
    default:
      return JSON.stringify(entry);
  }
}

class LogForm extends React.Component {
  constructor() {
    super();
    this.state = {log: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({log: e.target.value});
  }

  handleSubmit(e) {
    const {log} = this.state;
    if (log) {
      this.props.onLog(log);
      this.setState({log: ''});
    }
    this.input.focus();
    e.preventDefault();
  }

  render() {
    const {log} = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup className='no-margin'>
          <InputGroup>
            <FormControl value={log}
              onChange={this.handleChange}
              inputRef={ref => this.input = ref} />
            <InputGroup.Button>
              <Button type='submit' bsStyle='primary'
                disabled={!log}>
                Log
              </Button>
              <Button bsStyle='danger'
                onClick={() => this.setState({confirm: true})}
                disabled={this.props.log.length == 0}>
                Undo
              </Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>

        <ConfirmModal show={this.state.confirm}
          onHide={() => this.setState({confirm: false})}
          onConfirm={() => this.props.onUndo()}>
          Undo last log? You cannot redo it.
        </ConfirmModal>
      </form>
    )
  }
}

class ExportModal extends React.Component {
  constructor() {
    super();
    this.state = {export: false};
  }
  
  render() {
    return (
      <div>
        <Button bsStyle='info' block
          onClick={() => this.setState({export: true})}>Export</Button>
        <Modal show={this.state.export}
          onHide={() => this.setState({export: false})}>
          <Modal.Header closeButton><h2>Export Journal</h2></Modal.Header>
          <Modal.Body>
            <p>
              You can copy-paste this somewhere to export your journal in a
              human-readable format.<br/>
              NOTE: This is not your save file! Click "Save/Load Game" to
              save your game.
            </p>
            <FormControl id='export' componentClass='textarea' rows={20}
              spellCheck={false} value={this.props.journal}
              onChange={() => null} />
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

class Journal extends React.Component {
  constructor() {
    super();
    this.state = {journal: ''};
  }

  componentWillReceiveProps(nextProps) {
    if (this.props != nextProps) {
      const {title, game, name, rules, log} = nextProps;
      let journal = title;
      journal += '\r\n' + game;
      journal += '\r\n' + name;
  
      if (rules.length > 0) {
        journal += '\r\n\r\nRules:';
        for (let i in rules) journal += '\r\n-' + rules[i];
      }
      journal += '\r\n';
  
      for (let i in log) {
        const {time, type, entry, pokemon} = log[i];
        journal += '\r\n[' + time.toLocaleString() + '] ' + type + ':';
        let content = parseEntry(log[i]);
        if (type == types.MOVE_POKEMON) journal += '\r\n' + content;
        else journal += ' ' + content;
      }
      this.setState({journal});
    }
  }

  render() {
    const {title, game, name, rules, log} = this.props;

    return (
      <div id='journal'>
        <Panel bsStyle='info' header='Journal' collapsible
          defaultExpanded={true}>
          <Row>
            <Col id='info' xs={7}>
              <h2>{title}</h2>
              <h4>{game}</h4>
              <h4>{name}</h4>
            </Col>
            <Col xs={5}>
              <Panel header='Rules' className='no-margin'>
                <ListGroup id='rules' fill>
                  {rules.length == 0 ?
                  <ListGroupItem>No Rules</ListGroupItem> :
                  rules.map((rule, index) => (
                    <ListGroupItem key={index}>{rule}</ListGroupItem>
                  ))}
                </ListGroup>
              </Panel>
            </Col>
          </Row>
          
          <NewLocation />

          <StickyTable>
            <StickyTable.THead>
              <tr>
                <th width='20%'>Time</th>
                <th width='80px'>Type</th>
                <th width='calc(80% - 80px)'>Entry</th>
              </tr>
            </StickyTable.THead>
            <StickyTable.TBody height='300px'>
              {log.map((logEntry, index) => (
                <tr key={index}>
                  <td width='20%'>{logEntry.time.toLocaleString()}</td>
                  <td width='80px'>{logEntry.type}</td>
                  <td width='calc(80% - 80px)'>
                    {toReact(parseEntry(logEntry))}
                  </td>
                </tr>
              ))}
            </StickyTable.TBody>
          </StickyTable>
          
          <LogForm log={log} onLog={log => this.props.recordLog(log)}
            onUndo={() => this.props.undo()} />
          <ExportModal journal={this.state.journal} />
        </Panel>
      </div>
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
    recordLog: log => dispatch(recordLog(log)),
    undo: () => dispatch(undo())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Journal);