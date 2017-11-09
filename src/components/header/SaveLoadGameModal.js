import React from 'react';
import { Modal, FormControl, ButtonGroup, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Control, actions } from 'react-redux-form';

import { newGame, newLocation } from 'actions';

class SaveLoadGameModal extends React.Component {
  constructor() {
    super();
    this.state = {save: ''};
    this.handleEnter = this.handleEnter.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let save = '';

    this.setState({save});
  }

  handleEnter() {
    this.input.focus();
  }

  handleChange(e) {
    this.setState({save: e.target.value});
  }

  handleClick(values) {
    this.props.onHide();
  }

  render() {
    return (
      <Modal show={this.props.show}
        onEnter={this.handleEnter} onHide={this.props.onHide}>
        <Modal.Header closeButton><h2>Save/Load Game</h2></Modal.Header>
        <Modal.Body>
          <p>Here is the current save of your game.</p>
          <p>
            <strong>To save your game, </strong>
            either click "Save File" below
            OR copy-paste this into a text file.
          </p>
          <p>
            <strong>To load your game, </strong>
            either click "Upload File" below,
            OR copy-paste your save file here and click "Load Game".
          </p>
          <FormControl componentClass='textarea' rows={15}
            style={{resize: 'none'}}
            value={this.state.save}
            onChange={this.handleChange}
            inputRef={ref => this.input = ref} />
        </Modal.Body>
        <Modal.Footer>
          <ButtonGroup justified>
            <Button bsStyle='primary' bsSize='large' href='#'
              onClick={this.handleClick}>
              Save File
            </Button>
            <Button bsStyle='primary' bsSize='large' href='#'
              onClick={this.handleClick}>
              Upload File
            </Button>
            <Button bsStyle='primary' bsSize='large' href='#'
              onClick={this.handleClick}>
              Load Game
            </Button>
          </ButtonGroup>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    log: state.log
  };
};

export default connect(mapStateToProps, null)(SaveLoadGameModal);