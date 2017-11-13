import React from 'react';
import PropTypes from 'prop-types';
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
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(index) {
    this.props.onChange(index);
  }

  handleClick(e) {
    if (e.target.value && e.target.value == this.props.index)
      this.props.onChange(-1);
  }

  render() {
    const {pc, index, partyFull} = this.props;

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
              disabled={index == -1 || partyFull}
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

PC.propTypes = {
  pc: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  partyFull: PropTypes.bool.isRequired,
}

const mapDispatchToProps = dispatch => {
  return {
    onWithdraw: index => {
      dispatch(withdraw(index));
    }
  };
};

export default connect(null, mapDispatchToProps)(PC);