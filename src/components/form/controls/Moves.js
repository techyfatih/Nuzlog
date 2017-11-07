import React from 'react';
import { ControlLabel } from 'react-bootstrap';

import moves from 'data/moves.json';
import Combobox from './Combobox';

const sample = ['Tackle', 'Growl', 'Leech Seed', 'Razor Leaf'];

export default class Moves extends React.Component {
  constructor() {
    super();
    this.state = {
      moves: ['', '', '', '']
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(index, move) {
    this.setState(({moves}) => {
      const newMoves = moves.slice();
      newMoves.splice(index, 1, move);
      return {moves: newMoves};
    }, () => {
      console.log(this.state.moves);
      if (typeof this.props.onChange == 'function')
        this.props.onChange(this.state.moves.filter(move => move));
    });
  }

  render() {
    return (
      <div>
        <ControlLabel>Moves*</ControlLabel>
        {sample.map((move, index) => (
          <Combobox required
            key={index}
            pristine={this.props.pristine}
            valid={this.props.valid}
            placeholder={move}
            value={this.state.moves[index]}
            onChange={move => this.handleChange(index, move)}
            onFocus={this.props.onFocus}
            onBlur={this.props.onBlur} >
            {moves}
          </Combobox>
        ))}
      </div>
    )
  }
}