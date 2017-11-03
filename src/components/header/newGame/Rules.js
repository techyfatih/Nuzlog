import React from 'react';
import { Panel, ListGroup, ListGroupItem, Button, InputGroup, FormControl, Glyphicon } from 'react-bootstrap';
import { AutoSizer, List } from 'react-virtualized';

import './Rules.css';
import CloseButton from 'components/CloseButton';

export default class Rules extends React.Component {
  constructor() {
    super();
    this.state = {rule: ''};
    this.rowRenderer = this.rowRenderer.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.addRule = this.addRule.bind(this);
  }

  rowRenderer({index, key, style}) {
    return (
      <ListGroupItem key={key} style={style}>
        <div className='new-rule pull-left'>{this.props.rules[index]}</div>
        <div className='pull-right'>
        <CloseButton onClick={() => this.props.removeRule(index)} />
          </div>
      </ListGroupItem>
    )
  }
  
  handleChange(e) {
    this.setState({rule: e.target.value});
  }

  handleKeyDown(e) {
    if (e.keyCode == 13) { //enter
      this.addRule();
      e.preventDefault();
    }
  }

  addRule() {
    if (this.state.rule) {
      this.props.addRule(this.state.rule);
      this.setState({rule: ''});
    }
  }
/**
            <AutoSizer disableHeight>
              {({width}) => {
                return (
                  <List
                    width={width}
                    height={100}
                    rowCount={this.props.rules.length}
                    rowHeight={30}
                    rowRenderer={this.rowRenderer} />
                )
              }}
            </AutoSizer> */
  render() {
    return (
      <div>
        <Panel className='custom-list' header='Rules'>
          <ListGroup fill>
            {this.props.rules.map((rule, key) => (
              <ListGroupItem key={key} className='clearfix'>
                <div className='new-rule pull-left'>{rule}</div>
                <div className='pull-right'>
                  <CloseButton onClick={() => this.props.removeRule(key)} />
                </div>
              </ListGroupItem>
            ))}
          </ListGroup>
        </Panel>

        <InputGroup>
          <FormControl type='text' value={this.state.rule}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown} />
          <InputGroup.Button>
            <Button onClick={this.addRule}>Add</Button>
          </InputGroup.Button>
        </InputGroup>
      </div>
    )
  }
}