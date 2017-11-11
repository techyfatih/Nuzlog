import React from 'react';
import { Control } from 'react-redux-form';

import moves from 'data/moves.json';

import Combobox from './controls/Combobox';

const placeholder = ['Tackle', 'Growl', 'Leech Seed', 'Razor Leaf'];

export default class RRFMoves extends React.Component {
  constructor() {
    super();
    this.state = {
      pristine: true,
      moves: ['', '' ,'' ,''],
      valid: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(index, val) {
    this.setState(prevState => {
      const moves = [
        ...moves.slice(0, index),
        val,
        ...moves.slice(index + 1)
      ];
      let valid = false;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i]) {
          valid = true;
          break;
        }
      }
      return {
        pristine: false,
        moves,
        valid
      }
    });
  }

  render() {
    return (
      <div>
        {placeholder.map((move, index) => {
          return (
            <Control.text model={'.moves[' + index + ']'} key={index}
              id={this.props.id + '1'}
              label={index == 0 ? 'Moves*' : null}
              placeholder={move}
              required={this.props.required}
              component={Combobox}
              valid={this.state.valid}
              mapProps={{
                pristine: ({fieldValue}) => fieldValue.pristine || this.state.pristine,
                focus: ({fieldValue}) => fieldValue.focus
              }}
              onChange={val => this.handleChange(index, val)}>
              {moves}
            </Control.text>
          )
        })}
      </div>
    )
  }
}