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
    const {label, required, pristine, valid, value, focus,
      onFocus, onBlur} = this.props;
    return (
      <div>
        {label && <ControlLabel>{label}</ControlLabel>}
        {sample.map((move, index) => (
          <Combobox required={required}
            key={index}
            pristine={pristine}
            valid={valid}
            placeholder={move}
            value={Array.isArray(value) ? value[index] : ''}
            onChange={move => this.handleChange(index, move)}
            focus={index == 0 ? focus : null}
            onFocus={index == 0 ? onFocus : null}
            onBlur={index == 0 ? onBlur : null}>
            {moves}
          </Combobox>
        ))}
      </div>
    )
  }
}