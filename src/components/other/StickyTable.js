import React from 'react';
import ReactDOM from 'react-dom';
import { Table } from 'react-bootstrap';

import './StickyTable.css';

class StickyTHead extends React.Component {
  render() {
    return (
      <thead>
        <tr>
          <th>
            <Table bordered condensed className='sticky-thead'>
              <thead>
                {this.props.children}
              </thead>
            </Table>
          </th>
        </tr>
      </thead>
    );
  }
}

class StickyTBody extends React.Component {
  componentDidUpdate(prevProps) {
    this.body.scrollTop = this.body.scrollHeight;
  }

  render() {
    const {height} = this.props;

    return (
      <tbody>
        <tr>
          <td>
            <div className='sticky-tbody' style={height ? {height} : {}}
              ref={ref => this.body = ReactDOM.findDOMNode(ref)}>
              <Table bordered condensed striped>
                <tbody>
                  {this.props.children}
                </tbody>
              </Table>
            </div>
          </td>
        </tr>
      </tbody>
    )
  }
}

export default class StickyTable extends React.Component {
  render() {
    return (
      <Table bordered condensed className='sticky-table'>
        {this.props.children}
      </Table>
    );
  }
};

StickyTable.THead = StickyTHead;
StickyTable.TBody = StickyTBody;