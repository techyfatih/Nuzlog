import React from 'react';
import { Button, Modal } from 'react-bootstrap'

export default class ModalButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  open() {
    this.setState({ showModal: true });
  }

  close() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <Button {...this.props} href='#' onClick={this.open}>
        {this.props.label}
        <Modal show={this.state.showModal} onHide={this.close}>
          {this.props.children}
        </Modal>
      </Button>
    )
  }
}