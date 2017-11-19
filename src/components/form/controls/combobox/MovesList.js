import React from 'react';
import PropTypes from 'prop-types';

import moves from 'data/moves.json';
import Combobox from './Combobox';

const sample = ['Tackle', 'Growl', 'Leech Seed', 'Razor Leaf'];

export default class MovesList extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(index, move) {
    if (this.props.onChange) {
      let _moves = this.props.value;
      if (!Array.isArray(_moves)) _moves = [];
      
      _moves = _moves.slice();
      _moves[index] = move;
      this.props.onChange(_moves);
    }
  }

  render() {
    const {value, focus, onFocus, onBlur} = this.props;
    const _moves = Array.isArray(value) ? value : [];

    return (
      <div>
        {sample.map((move, index) => (
          <Combobox key={index}
            id={index == 0 ? this.props.id : null}
            placeholder={move}
            value={_moves[index]}
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