import React from 'react';
import { Modal, Panel,
  FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

class BagModal extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Modal show={this.props.show}
        onEnter={this.handleEnter} onHide={this.props.onHide}>
        <Modal.Header closeButton><h2>Bag</h2></Modal.Header>
        <Modal.Body>
        </Modal.Body>
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

export default connect(mapStateToProps, mapDispatchToProps)(BagModal);