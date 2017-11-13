import React from 'react';
import { Panel, ToggleButtonGroup, ToggleButton, ButtonGroup,
  Button } from 'react-bootstrap';
import { connect } from 'react-redux'

import './PC.css';

import PokeSlot from 'components/pokemon/PokeSlot';
import PokeCard from 'components/pokemon/PokeCard';

import { withdraw } from 'actions';

class PC extends React.Component {
  constructor() {
    super();
    this.state = {
      index: -1
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(index) {
    this.setState({index});
  }

  handleClick(e) {
    if (e.target.value && e.target.value == this.state.index)
      this.setState({index: -1});
  }

  render() {
    const {pc} = this.props;
    const {index} = this.state;

    return (
      <Panel id='pc'>
        <div id='pc-left' className='pull-left'>
          <ToggleButtonGroup id='pc-tabs' vertical
            type='radio'
            name='pc'
            value={index}
            onChange={this.handleChange}>
            {pc.map((val, key) => (
              <ToggleButton value={key} key={key}
                onClick={this.handleClick}>
                <PokeSlot pokemon={pc[key]} />
              </ToggleButton>
            ))}
          </ToggleButtonGroup>

          <ButtonGroup id='pc-options' vertical block>
            <Button href='#' bsStyle='primary'
              disabled={index == -1 || this.props.partySize >= 6}
              onClick={() => this.props.onWithdraw(index)}>
              Withdraw
            </Button>
          </ButtonGroup>
        </div>

        <div className='pull-right'>
          <PokeCard pokemon={pc[index]} bsStyle='warning' />
        </div>
      </Panel>
    );
  }
}

const mapStateToProps = state => {
  return {
    partySize: state.party.length,
    pc: state.pc
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onWithdraw: index => {
      dispatch(withdraw(index));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PC);