import React from 'react';
import PropTypes from 'prop-types';
import { Panel, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

import './Cemetery.css';

import PokeSlot from 'components/pokemon/PokeSlot';
import PokeCard from 'components/pokemon/PokeCard';

import { withdraw } from 'actions';

export default class Cemetery extends React.Component {
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
    const {cemetery, index} = this.props;

    return (
      <Panel id='cemetery'>
        <div id='cemetery-left' className='pull-left'>
          <ToggleButtonGroup id='cemetery-tabs' vertical
            type='radio'
            name='pc'
            value={index}
            onChange={this.handleChange}>
            {cemetery.map((val, key) => (
              <ToggleButton value={key} key={key}
                onClick={this.handleClick}>
                <PokeSlot pokemon={cemetery[key]} />
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </div>

        <div className='pull-right'>
          <PokeCard pokemon={cemetery[index]} />
        </div>
      </Panel>
    );
  }
}

Cemetery.propTypes = {
  cemetery: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
}