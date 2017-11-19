import React from 'react';
import { Modal } from 'react-bootstrap';

import PokeCard from 'components/pokemon/card/PokeCard';

export default class SummaryModal extends React.Component {
  render() {
    const {show, onHide} = this.props;
    return (
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton><h2>Summary</h2></Modal.Header>
        <Modal.Body style={{padding: 10}}>
          <PokeCard bsStyle={this.props.bsStyle} pokemon={this.props.pokemon} />
        </Modal.Body>
      </Modal>
    )
  }
}