import games from 'games.json';
import React from 'react';
import { Modal, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import {connect} from 'react-redux';
import {LocalForm, Control, actions} from 'react-redux-form';
import ModalButton from './helper/ModalButton';
import {TextControl, Combobox} from './FormControls';

class TextInput extends React.Component {
  render() {
    const valid = this.props.state.pristine ? null :
      (this.props.value && this.props.value.length ? 'success' : 'error');
    return (
      <FormGroup
        controlId={this.props.name}
        validationState={valid}>
        <ControlLabel>{this.props.label}</ControlLabel>
        <FormControl
          type='text'
          placeholder={this.props.placeholder}
          onChange={this.props.onChange} />
      </FormGroup>
    )
  }
}

class NewGameForm extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      game: '',
      name: '',
      location: '',
      valid: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(id, value) {
    this.setState({[id]: value});
    this.setState(prevState => ({
      valid: prevState.title && prevState.game && prevState.name
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <LocalForm
          getDispatch={dispatch => this.dispatch = dispatch} >
          <Modal.Body>
          <Control
            model='.title'
            component={TextInput}
            label='Title*'
            placeholder='The Great Nuzlocke Challenge'
            mapProps={{
              state: ({fieldValue}) => fieldValue
            }}
            required />
          </Modal.Body>
        </LocalForm>
      <form onSubmit={this.handleSubmit} autoComplete='off'>
        <Modal.Body>
          <TextControl id='title' label='Title*' placeholder='The Great Nuzlocke Challenge'
            value={this.state.title} onChange={this.handleChange} required focus />
          <Combobox id='game' label='Game*' placeholder='Pokémon Ruby' items={games}
            value={this.state.game} onChange={this.handleChange} required />
          <TextControl id='name' label='Name*' placeholder='Ruby'
            value={this.state.name} onChange={this.handleChange} required />
          <TextControl id='location' label='Initial Location*' placeholder='Littleroot Town'
            value={this.state.location} onChange={this.handleChange} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            type='submit'
            bsStyle='primary'
            bsSize='large'
            block
            disabled={!this.state.valid}>Start</Button>
        </Modal.Footer>
      </form>
      </div>
    );
  }
}

export default class NewGameButton extends React.Component {
  render() {
    return (
      <ModalButton bsStyle='primary' label='New Game'>
        <Modal.Header closeButton><h2>New Game</h2></Modal.Header>
        <NewGameForm />
      </ModalButton>
    );
  }
}