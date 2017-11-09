import React from 'react';
import { Panel, ToggleButtonGroup, ToggleButton,
  ButtonGroup, Button } from 'react-bootstrap';
import { connect } from 'react-redux'

import './PC.css';

import PokeSlot from 'components/pokemon/PokeSlot';
import PokeCard from 'components/pokemon/PokeCard';

const six = [...Array(6).keys()];

class Cemetery extends React.Component {
  constructor() {
    super();
    this.state = {
      value: -1
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(value) {
    this.setState({value});
  }

  handleClick(e) {
    if (e.target.value && e.target.value == this.state.value)
      this.setState({value: -1});
  }

  render() {
    return (
      <Panel id='party'>
        <div id='party-tabs' className='pull-left'>
          <ToggleButtonGroup vertical
            type='radio'
            name='party'
            value={this.state.value}
            onChange={this.handleChange}>
            {six.map(index => (
              <ToggleButton value={index} key={index}
                disabled={!this.props.cemetery[index]}
                onClick={this.handleClick}>
                <PokeSlot pokemon={this.props.cemetery[index]} />
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
          <ButtonGroup id='party-options' vertical block>
            <Button href='#' bsStyle='primary'
              disabled={this.state.value == -1}>Level Up</Button>
          </ButtonGroup>
        </div>
        <div className='pull-right'>
          <PokeCard pokemon={this.props.cemetery[this.state.value]} />
        </div>
      </Panel>
    );
  }
}

const mapStateToProps = state => {
  return {
    cemetery: state.cemetery
  };
};

export default connect(mapStateToProps)(Cemetery);