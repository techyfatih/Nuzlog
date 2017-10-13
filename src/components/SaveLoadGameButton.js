import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import ModalButton from './helper/ModalButton';

export default class App extends React.Component {
  render() {
    return (
      <ModalButton bsStyle='primary' label='Save/Load Game'>
        <Modal.Header closeButton><h2>Save/Load Game</h2></Modal.Header>
      </ModalButton>
    );
  }
}