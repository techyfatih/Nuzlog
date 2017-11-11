import React from 'react';
import { ControlLabel } from 'react-bootstrap';

import moves from 'data/moves.json';
import Combobox from './Combobox';

const sample = ['Tackle', 'Growl', 'Leech Seed', 'Razor Leaf'];

export default class Moves extends React.Component {
  constructor() {
    super();
    this.state = {
      moves: ['', '', '', ''],
      focus: [false, false, false, false]
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(index, move) {
    this.setState(({moves}) => {
      const newMoves = moves.slice();
      newMoves[index] = move;
      return {moves: newMoves};
    }, () => {
      if (typeof this.props.onChange == 'function')
        this.props.onChange(this.state.moves.filter(move => move));
    });
  }

  render() {
    return (
      <div>
        <ControlLabel>Moves*</ControlLabel>
        {sample.map((move, index) => (
          <Combobox required={this.props.required}
            key={index}
            pristine={this.props.pristine}
            valid={this.props.valid}
            placeholder={move}
            value={this.state.moves[index]}
            onChange={move => this.handleChange(index, move)}
            focus={index == 0 ? this.props.focus : null}
            onFocus={index == 0 ? this.props.onFocus : null}
            onBlur={index == 0 ? this.props.onBlur : null}>
            {moves}
          </Combobox>
        ))}
      </div>
    )
  }
}