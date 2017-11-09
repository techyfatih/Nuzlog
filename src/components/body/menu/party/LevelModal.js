import React from 'react';
import { Modal, Button, } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Control, actions } from 'react-redux-form';

import RRForm from 'components/form/RRForm';
import { RRFNumber } from 'components/form/RRFControls';
import { levelUp } from 'actions';

class LevelModal extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    this.props.onHide();
  }

  render() {
    return (
      <Modal show={this.props.show}
        onEnter={this.reset} onHide={this.props.onHide}>
        <form
          onSubmit={this.handleSubmit}>
          <Modal.Header closeButton><h2>Level Up</h2></Modal.Header>
          <Modal.Body>
          </Modal.Body>
          <Modal.Footer>
            <Button type='submit' bsStyle='primary' bsSize='large' block>
              Level Up
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    party: state.party
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLevelUp: (index, number) => {
        dispatch(levelUp(index, number));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LevelModal);