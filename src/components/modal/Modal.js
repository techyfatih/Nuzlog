import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal as BSModal } from 'react-bootstrap';

import './Modal.css';
import CloseButton from 'components/CloseButton';
import Enhanced from 'components/form/Enhanced';

export class Modal extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.show) {
      document.body.classList.add('modal-open');
      document.addEventListener('keydown', this.handleKeyDown);
    }
    else {
      document.body.classList.remove('modal-open');
      document.removeEventListener('keydown', this.handleKeyDown);
    }
  }

  handleClick(e) {
    if (!this.refs.modal.contains(e.target))
      this.props.onHide();
  }

  handleKeyDown(e) {
    if (e.keyCode == 27)
      this.props.onHide();
  }

  render() {
    return ReactDOM.createPortal(
      <div role='dialog' hidden={!this.props.show}
        onClick={this.handleClick}>
        <div className='modal-backdrop fade in'></div>
        <div role='dialog' tabIndex={-1} className='fade in modal'>
          <div className={'modal-dialog' + (this.props.bsSize ?
            ' modal-' + this.props.bsSize : '')}>
            <div className='modal-content' role='document' ref='modal'>
              <CloseButton class='modal-close-button close'
                onClick={this.props.onHide} />
              {this.props.children}
            </div>
          </div>
        </div>
      </div>,
      document.body
    )
  }
}

Modal.Header = BSModal.Header;
Modal.Body = BSModal.Body;
Modal.Footer = BSModal.Footer;

export class ModalButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  open() {
    if (!this.state.showModal) {
      this.setState({ showModal: true });
      if (typeof this.props.onOpen == 'function')
        this.props.onOpen();
    }
  }

  close() {
    this.setState({ showModal: false });
    if (typeof this.props.onHide == 'function')
      this.props.onHide();
  }

  render() {
    return (
      <Button bsStyle={this.props.bsStyle} href='#' onClick={this.open}>
        {this.props.label}
        <BSModal bsSize={this.props.bsSize}
          show={this.state.showModal} onHide={this.close}>
          {this.props.children}
        </BSModal>
      </Button>
    )
  }
}