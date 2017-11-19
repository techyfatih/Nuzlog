import React from 'react';
import { Panel, ButtonGroup, Button } from 'react-bootstrap';

import './Menu.css';

import NewLocation from './newLocation/NewLocation';
import Options from './options/Options';
import Boxes from './boxes/Boxes';

export default class Menu extends React.Component {
  render() {
    return (
      <div id='menu'>
        <Panel header='Menu' bsStyle='success' collapsible
          defaultExpanded={true}>
          <NewLocation />
          <Options />
          <Boxes />
        </Panel>
      </div>
    );
  }
};