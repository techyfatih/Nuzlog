import React from 'react';
import { Popover, Panel, Button, OverlayTrigger } from 'react-bootstrap';
import { connect } from 'react-redux';

import './Info.css';

class Info extends React.Component {
  render() {
    const {rules, info} = this.props;

    let rulesText = 'All Enabled';
    let disabled = [];
    if (!rules.genders) disabled.push('Genders');
    if (!rules.natures) disabled.push('Natures');
    if (!rules.abilities) disabled.push('Abilities');
    if (disabled.length) rulesText = 'Disabled: ' + disabled.join(', ');
    
    const rulesPopover = (
      <Popover id='rules'>
        <div id='rules-list'>
          {rulesText}
          {rules.list.map((rule, index) =>
            <li key={index}>{rule}</li>)}
        </div>
      </Popover>
    );
    return (
      <Panel id='info' bsStyle='info' header={info.title}>
        <div id='info-text' className='pull-left'>
          <h4 id='info-game'>{info.game}</h4>
          <h4 id='info-name'>{info.name}</h4>
        </div>
        <OverlayTrigger
          trigger='click'
          rootClose placement='left'
          overlay={rulesPopover}>
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