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
    this.focus = this.focus.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  focus(index) {
    this.setState(({focus}) => {
      const newFocus = focus.slice();
      newFocus.splice(index, 1, true);
      return {focus: newFocus};
    });
  }

  componentWillReceiveProps(nextProps) {
    // TODO FIX
    if (nextProps.focus) {
      //this.focus(0);
      //console.log('focus');
    }
  }

  handleChange(index, move) {
    this.setState(({moves}) => {
      const newMoves = moves.slice();
      newMoves.splice(index, 1, move);
      return {moves: newMoves};
    }, () => {
      if (typeof this.props.onChange == 'function')
        this.props.onChange(this.state.moves.filter(move => move));
    });
  }

  handleFocus(index) {
    focus(index);
    if (typeof this.props.onFocus == 'function')
      this.props.onFocus();
  }

  handleBlur(e) {
    this.setState({focus: [false, false, false, false]});
    if (typeof this.props.onBlur == 'function')
      this.props.onBlur(e);
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
            focus={this.state.focus[index]}
            onFocus={() => this.handleFocus(index)}
            onBlur={this.handleBlur}>
            {moves}
          </Combobox>
        ))}
      </div>
    )
  }
}