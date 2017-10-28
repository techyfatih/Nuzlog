import React from 'react';
import ReactDOM from 'react-dom';
import { Table } from 'react-bootstrap';

import './StickyTable.css';

class StickyHeader extends React.Component {
  render() {
    return (
      <Table className='header' condensed>
        <thead>
          <tr>
            {this.props.children}
          </tr>
        </thead>
      </Table>
    )
  }
}

class StickyBody extends React.Component {
  componentDidUpdate() {
    this.body.scrollTop = this.body.scrollHeight;
  }
  
  render() {
    return (
      <div ref={ref => this.body = ref} className='body'
        style={{height: this.props.height}} >
        <Table striped condensed>
          <tbody>{this.props.children}</tbody>
        </Table>
      </div>
    )
  }
}

class StickyTable extends React.Component {
  render() {
    return (
      <div className='sticky-table'>
        {this.props.children}
      </div>
    );
  }
}

StickyTable.Header = StickyHeader;
StickyTable.Body = StickyBody;
export default StickyTable;