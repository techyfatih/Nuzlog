import React from 'react';
import { Popover, Panel, Button, OverlayTrigger } from 'react-bootstrap';

const rules = (
  <Popover id='rules'>
    All Enabled
  </Popover>
)
export default class Ino extends React.Component {
  render() {
    return (
      <Panel header='Title' bsStyle='info'>
        <div className='pull-left'>
          <h4 style={{marginTop: 0}}>Game</h4>
          <h4 style={{margin: 0}}>Name</h4>
        </div>
        <OverlayTrigger trigger='click' rootClose overlay={rules}>
          <Button className='pull-right' bsStyle='info'>Rules</Button>
        </OverlayTrigger>
      </Panel>
    );
  }
}