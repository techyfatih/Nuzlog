import React from 'react';
import { Modal, Panel,
  FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import PokeIcon from 'components/pokemon/PokeIcon';

class Catches extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Modal show={this.props.show}
        onEnter={this.handleEnter} onHide={this.props.onHide}>
        <form
          onSubmit={this.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Catches</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            
          </Modal.Body>
          <Modal.Footer>
            (i'll do this one day)
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

export default connect(mapStateToProps, mapDispatchToProps)(LUL);