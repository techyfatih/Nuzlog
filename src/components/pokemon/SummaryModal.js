import React from 'react';
import { Modal } from 'react-bootstrap';

import PokeCard from './card/PokeCard';

export default class SummaryModal extends React.Component {
  render() {
    const {show, onHide} = this.props;
    return (
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Summary</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{padding: 10}}>
          <PokeCard pokemon={{species: 'Kyogre'}} />
        </Modal.Body>
      </Modal>
    )
  }
}