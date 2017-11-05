import React from 'react';
import { Popover, Panel, Button, OverlayTrigger } from 'react-bootstrap';
import { connect } from 'react-redux';

import './Info.css';

class Info extends React.Component {
  render() {
    let rulesText = 'All Enabled';
    let disabled = [];
    if (!this.props.rules.genders) disabled.push('Genders');
    if (!this.props.rules.natures) disabled.push('Natures');
    if (!this.props.rules.abilities) disabled.push('Abilities');
    if (disabled.length) rulesText = 'Disabled: ' + disabled.join(', ');
    const rules = (
      <Popover id='rules'>
        <div id='rules-list'>
          {rulesText}
          {this.props.rules.list.map((rule, index) =>
            <li key={index}>{rule}</li>)}
        </div>
      </Popover>
    );
    return (
      <Panel bsStyle='info'
        header={<div><h3>{this.props.info.title}</h3></div>}>
        <div id='info' className='pull-left'>
          <h4 id='info-game'>{this.props.info.game}</h4>
          <h4 id='info-name'>{this.props.info.name}</h4>
        </div>
        <OverlayTrigger trigger='click' rootClose
          placement='left' overlay={rules}>
          <Button className='pull-right' bsStyle='info'>Rules</Button>
        </OverlayTrigger>
      </Panel>
    );
  }
}

const mapStateToProps = state => {
  return {
    info: state.info,
    rules: state.rules
  };
};

export default connect(mapStateToProps)(Info);