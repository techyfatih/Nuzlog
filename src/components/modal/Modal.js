import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal as bsModal } from 'react-bootstrap';

import './Modal.css';
import ValidationForm from 'components/form/ValidationForm';

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
    e.stopPropagation();
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
              <Button className='modal-close-button close pull-right'
                aria-label='Close' onClick={this.props.onHide}>
                <span aria-hidden='true'>&times;</span>
              </Button>
              {this.props.children}
            </div>
          </div>
        </div>
      </div>,
      document.body
    )
  }
}

Modal.Header = bsModal.Header;
Modal.Body = bsModal.Body;
Modal.Footer = bsModal.Footer;

export class ModalButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  open(e) {
    this.setState({ showModal: true });
    if (typeof this.props.onOpen == 'function')
      this.props.onOpen();
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
        <Modal bsSize={this.props.bsSize}
          show={this.state.showModal} onHide={this.close}>
          {this.props.children}
        </Modal>
      </Button>
    )
  }
}

export class ModalButtonForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOpen() {
    this.refs.form.reset();
  }

  handleSubmit(values) {
    this.refs.modal.close();
    if (typeof this.props.submit == 'function')
      this.props.onSubmit(values);
  }

  render() {
    return (
      <ModalButton ref='modal'
        bsStyle={this.props.bsStyle}
        bsSize={this.props.bsSize}
        label={this.props.label}
        onOpen={this.handleOpen}>
        <ValidationForm ref='form'
          initialState={this.props.initialState}
          onSubmit={this.handleSubmit}>
          {this.props.children}
        </ValidationForm>
      </ModalButton>
    )
  }
}