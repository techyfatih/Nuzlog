import React from 'react';
import ReactDOM from 'react-dom';
import { Panel, Button,
  FormGroup, ControlLabel, InputGroup, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import { AutoSizer, Table, Column, CellMeasurerCache, CellMeasurer } from 'react-virtualized';
import 'react-virtualized/styles.css';

import './Journal.css';
import Pokemon from 'components/pokemon/Pokemon';
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
  constructor() {
    super();
    this.cache = new CellMeasurerCache({
      fixedWidth: true,
      minHeight: 40
    });
    this.timeCellRenderer = this.timeCellRenderer.bind(this);
    this.entryCellRenderer = this.entryCellRenderer.bind(this);
  }

  timeCellRenderer({cellData}) {
    return (
      <span>
        {cellData.toLocaleDateString()}<br/>
        {cellData.toLocaleTimeString()}
      </span>
    )
  }

  entryCellRenderer({dataKey, parent, rowIndex}) {
    const log = this.props.log[rowIndex];
    let content = log.entry;
    switch (log.type) {
      /*case 'Party':
        content = (
          <span>
            {log.entry.name} has joined the party!<br/>
            <br/>
            {Pokemon.exportReact(log.entry)}
          </span>
        );
        break;
      case 'PC':
        content = (
          <span>
            {log.entry.name} has was put in the PC.<br/>
            <br/>
            {Pokemon.exportReact(log.entry)}
          </span>
        );
        break;*/
      default:
        content = JSON.stringify(content);
        break;
    }
    return (
      <CellMeasurer
        cache={this.cache}
        columnIndex={0}
        key={dataKey}
        parent={parent}
        rowIndex={rowIndex}>
        <div style={{whiteSpace: 'normal', wordWrap: 'break-word'}}>
          {content}
        </div>
      </CellMeasurer>
    )
  }

  render() {
    return (
      <Panel id='journal' bsStyle='warning' header='Journal'>
        <NewLocationForm location={this.props.location}
          newLocation={this.props.newLocation} />
        
        <AutoSizer disableHeight>
          {({width}) => {
            return (
              <Table
                deferredMeasurementCache={this.cache}
                className='virtual-table'
                width={width}
                height={429}
                headerHeight={30}
                rowHeight={this.cache.rowHeight}
                rowCount={this.props.log.length}
                rowGetter={({index}) => this.props.log[index]}
                scrollToIndex={this.props.log.length - 1}>
                <Column
                  label='Time'
                  dataKey='time'
                  width={150}
                  cellRenderer={this.timeCellRenderer} />
                <Column
                  label='Type'
                  dataKey='type'
                  width={150} />
                <Column
                  label='Entry'
                  dataKey='entry'
                  width={width - 130}
                  cellRenderer={this.entryCellRenderer} />
              </Table>
            )
          }}
        </AutoSizer>
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