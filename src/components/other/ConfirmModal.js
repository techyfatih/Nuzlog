import React from "react";
import PropTypes from "prop-types";

export default class ConfirmModal extends React.Component {
  constructor() {
    super();
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  handleKeyDown(e) {
    if (e.keyCode == 13) this.handleConfirm();
  }

  handleConfirm() {
    this.props.onHide();
    this.props.onConfirm();
  }

  render() {
    return (
      <Modal
        backdropClassName="modal-2nd"
        show={this.props.show}
        onHide={this.props.onHide}
        onKeyDown={this.handleKeyDown}
      >
        <Modal.Header closeButton>
          <h2>{this.props.children}</h2>
        </Modal.Header>
        <Modal.Footer>
          <ButtonGroup justified>
            <Button bsStyle="success" href="#" onClick={this.handleConfirm}>
              Yes
            </Button>
            <Button bsStyle="danger" href="#" onClick={this.props.onHide}>
              No
            </Button>
          </ButtonGroup>
        </Modal.Footer>
      </Modal>
    );
  }
}
