import React from 'react';
import { Modal, ButtonGroup, Button } from 'react-bootstrap';

import './ConfirmModal.css';

export default class ConfirmModal extends React.Component {
  constructor() {
    super();
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleKeyDown(e) {
    if (e.keyCode == 13) this.props.onConfirm();
  }

  render() {
    return (
      <Modal backdropClassName='confirm' show={this.props.show}
        onHide={this.props.onHide}
        onKeyDown={this.handleKeyDown}>
        <Modal.Header>
          <Modal.Title>{this.props.children}</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <ButtonGroup justified bsSize='large'>
            <Button bsStyle='primary' href='#' onClick={this.props.onConfirm}>
              Yes
            </Button>
            <Button bsStyle='primary' href='#' onClick={this.props.onHide}>
              No
            </Button>
          </ButtonGroup>
        </Modal.Footer>
      </Modal>
    )
  }
}