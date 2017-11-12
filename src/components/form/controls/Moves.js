import React from 'react';
import { ControlLabel } from 'react-bootstrap';

import moves from 'data/moves.json';
import Combobox from './Combobox';

const sample = ['Tackle', 'Growl', 'Leech Seed', 'Razor Leaf'];

export default class Moves extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(index, move) {
    if (typeof this.props.onChange == 'function') {
      const moves = this.props.value.slice();
      moves[index] = move;
      this.props.onChange(moves);
    }
  }

  render() {
    return (
      <div>
        <ControlLabel>Moves</ControlLabel>
        {sample.map((move, index) => (
          <Combobox required={this.props.required}
            key={index}
            pristine={this.props.pristine}
            valid={this.props.valid}
            placeholder={move}
            value={Array.isArray(this.props.value) ? this.props.value[index] : ''}
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