import React from 'react';
import ReactDOM from 'react-dom';
import { Panel, Button, Table,
  FormGroup, ControlLabel, InputGroup, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';

import './Journal.css';
import StickyTable from 'components/other/StickyTable';
import { newLocation, recordLog } from 'actions';

class NewLocationForm extends React.Component {
  constructor() {
    super();
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  handleSubmit(e) {
    if (this.state.value) {
      this.props.newLocation(this.state.value);
      this.setState({value: ''});
    }
    e.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup controlId='location'>
          <ControlLabel>Current Location</ControlLabel>
          <InputGroup>
            <InputGroup.Addon>
              <div id='current-location'>{this.props.location}</div>
            </InputGroup.Addon>
            <FormControl type='text' value={this.state.value}
              onChange={this.handleChange} />
            <InputGroup.Button>
              <Button type='submit' bsStyle='warning'>New Location</Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
      </form>
    )
  }
}

class LogForm extends React.Component {
  constructor() {
    super();
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  handleSubmit(e) {
    if (this.state.value) {
      this.props.recordLog(this.state.value);
      this.setState({value: ''});
    }
    e.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup style={{margin:0}}>
          <InputGroup>
            <FormControl type='text' value={this.state.value}
              onChange={this.handleChange} />
            <InputGroup.Button>
              <Button type='submit' bsStyle='primary'>Log</Button>
              <Button bsStyle='danger'>Undo</Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
      </form>
    )
  }
}

class JournalView extends React.Component {
  render() {
    return (
      <Panel header='Journal' bsStyle='warning'>
        <NewLocationForm location={this.props.location}
          newLocation={this.props.newLocation} />
        
        <StickyTable>
          <StickyTable.Header>
            <th width={'25%'}>Time</th>
            <th width={'25%'}>Type</th>
            <th width={'50%'}>Entry</th>
          </StickyTable.Header>
          <StickyTable.Body height='200px'>
            {this.props.log.map((log, index) => (
              <tr key={index}>
                <td width={'25%'}>{log.time}</td>
                <td width={'25%'}>{log.type}</td>
                <td width={'50%'}>{log.entry}</td>
              </tr>
            ))}
          </StickyTable.Body>
        </StickyTable>
        <LogForm recordLog={this.props.recordLog} />
      </Panel>
    );
  }
}

const mapStateToProps = state => {
  return {
    location: state.location,
    log: state.log
  };
};

const mapDispatchToProps = dispatch => {
  return {
    newLocation: location => dispatch(newLocation(location)),
    recordLog: log => dispatch(recordLog(log))
  };
};

const Journal = connect(mapStateToProps, mapDispatchToProps)(JournalView);
export default Journal;