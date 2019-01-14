import React from "react";
import { connect } from "react-redux";

import PokeIcon from "components/pokemon/PokeIcon";

class DeathModal extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Modal
        show={this.props.show}
        onEnter={this.handleEnter}
        onHide={this.props.onHide}
      >
        <Modal.Header closeButton>
          <h2>Battle</h2>
        </Modal.Header>
        <Modal.Body>
          hmmm looks like there's nothing here
          <br />
          why don't you record your own battles
          <br />
          (i'll do this one day)
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeathModal);
