import React from 'react';
import { Panel, Button, FormGroup, ControlLabel, InputGroup,
  FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import { AutoSizer, Table, Column, CellMeasurerCache,
  CellMeasurer } from 'react-virtualized';
import 'react-virtualized/styles.css';

import './Journal.css';

import NewLocation from './newLocation/NewLocation';

import { recordLog } from 'actions';

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

class Journal extends React.Component {
  constructor() {
    super();
    this.cache = new CellMeasurerCache({
      fixedWidth: true,
      minHeight: 40
    });
    this.handleResize = this.handleResize.bind(this);
    this.timeCellRenderer = this.timeCellRenderer.bind(this);
    this.entryCellRenderer = this.entryCellRenderer.bind(this);
  }

  handleResize() {
    this.cache.clearAll();
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
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
        <NewLocation />
        
        <AutoSizer disableHeight>
          {({width}) => {
            return (
              <Table
                deferredMeasurementCache={this.cache}
                className='virtual-table'
                width={width}
                height={423}
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
    log: state.log
  };
};

const mapDispatchToProps = dispatch => {
  return {
    recordLog: log => dispatch(recordLog(log))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Journal);