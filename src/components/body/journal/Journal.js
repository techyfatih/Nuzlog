import React from 'react';
import ReactDOM from 'react-dom';
import { Panel, FormGroup, ControlLabel, InputGroup, FormControl, Button,
  Table, Grid, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import { connect } from 'react-redux';

import './Journal.css';
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
  componentDidUpdate() {
    if (this.newLog)
      ReactDOM.findDOMNode(this.newLog).scrollIntoView('block', 'nearest');
  }

  render() {
    return (
      <Panel header='Journal' bsStyle='warning'>
        <NewLocationForm newLocation={this.props.newLocation} />

        <Panel className='sticky' header={(
          <Row>
            <Col xs={3}>Time</Col>
            <Col xs={3}>Type</Col>
            <Col xs={6}>Entry</Col>
          </Row>
        )}>
          <ListGroup fill>
            {this.props.log.map((log, index) => (
              <ListGroupItem key={index}
                ref={ref => {
                  if (index == this.props.log.length - 1) this.newLog = ref}}>
                <Row>
                  <Col xs={3}>{log.time}</Col>
                  <Col xs={3}>{log.type}</Col>
                  <Col xs={6}>{log.entry}</Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
          <div />
        </Panel>
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