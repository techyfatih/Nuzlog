import React from 'react';
import { Modal, Button } from 'react-bootstrap';

import { ModalButton } from 'components/other/ModalButton';

export default class SaveLoadGameButton extends React.Component {
  render() {
    return (
      <ModalButton bsStyle='primary' label='Save/Load Game'>
        <Modal.Header><h2>Save/Load Game</h2></Modal.Header>
      </ModalButton>
    );
  }
}