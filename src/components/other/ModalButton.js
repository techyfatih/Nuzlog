import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Glyphicon } from 'react-bootstrap';

import './ModalButton.css';
import ValidationForm from 'components/form/ValidationForm';

class Modal extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.show)
      document.body.classList.add('modal-open');
    else
      document.body.classList.remove('modal-open');
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
        onClick={this.handleClick} onKeyDown={this.handleKeyDown}>
        <div className='modal-backdrop fade in'></div>
        <div role='dialog' tabIndex={-1} className='fade in modal'>
          <div className='modal-dialog'>
            <div className='modal-content' role='document' ref='modal'>
              <Button className='modal-close-button close pull-right'
                onClick={this.props.onHide}>
                <Glyphicon glyph='remove' />
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

export class ModalButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  open() {
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
        <Modal show={this.state.showModal} onHide={this.close}>
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
    this.handleHide = this.handleHide.bind(this);
  }

  handleOpen() {
    this.refs.form.focus(this.props.focus);
  }

  handleSubmit(values) {
    this.refs.modal.close();
    this.props.onSubmit(values);
  }

  handleHide() {
    this.refs.form.reset();
  }

  render() {
    return (
      <ModalButton bsStyle={this.props.bsStyle} label={this.props.label}
        onOpen={this.handleOpen} onHide={this.handleHide} ref='modal'>
        <ValidationForm onSubmit={this.handleSubmit} ref='form'>
          {this.props.children}
        </ValidationForm>
      </ModalButton>
    )
  }
}