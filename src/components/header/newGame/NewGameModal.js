import React from "react";
import { connect } from "react-redux";

import games from "data/games.json";

import ConfirmModal from "components/other/ConfirmModal";

import { RRForm, RRFControl } from "components/form/RRF";
import { newGame, newLocation } from "actions";
import Rules from "./Rules";

class NewGameModal extends React.Component {
  constructor() {
    super();
    this.state = {
      rules: [],
      confirm: false,
      values: null
    };
    this.handleEnter = this.handleEnter.bind(this);
    this.addRule = this.addRule.bind(this);
    this.removeRule = this.removeRule.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  handleEnter() {
    this.setState({
      rules: [],
      values: null
    });
    this.dispatch(actions.focus("local.title"));
  }

  addRule(rule) {
    this.setState(({ rules }) => ({
      rules: [...rules, rule]
    }));
  }

  removeRule(index) {
    this.setState(({ rules }) => ({
      rules: [...rules.slice(0, index), ...rules.slice(index + 1)]
    }));
  }

  handleSubmit(values) {
    if (!this.props.gameOpen) {
      this.props.onNewGame(
        values.title,
        values.game,
        values.name,
        values.location,
        this.state.rules
      );
      this.props.onHide();
    } else {
      this.setState({
        confirm: true,
        values
      });
    }
  }

  handleConfirm() {
    const { values } = this.state;
    this.props.onNewGame(
      values.title,
      values.game,
      values.name,
      values.location,
      this.state.rules
    );
    this.props.onHide();
    this.setState({ values: null });
  }

  render() {
    return (
      <Modal
        show={this.props.show}
        onEnter={this.handleEnter}
        onHide={this.props.onHide}
      >
        <RRForm
          getDispatch={dispatch => (this.dispatch = dispatch)}
          onSubmit={this.handleSubmit}
        >
          <Modal.Header closeButton>
            <h2>New Game</h2>
          </Modal.Header>

          <Modal.Body>
            <RRFControl
              model=".title"
              id="new-title"
              label="Title*"
              placeholder="The Great Nuzlocke Challenge"
              required
            />

            <RRFControl
              model=".game"
              component="combobox"
              id="new-game"
              label="Game*"
              placeholder="Pokémon Ruby"
              required
            >
              {games}
            </RRFControl>

            <RRFControl
              model=".name"
              id="new-name"
              label="Name*"
              placeholder="Ruby"
              required
            />

            <RRFControl
              model=".location"
              id="new-locaiton"
              label="Initial Location"
              placeholder="Littleroot Town"
            />

            <Rules
              rules={this.state.rules}
              addRule={this.addRule}
              removeRule={this.removeRule}
            />
          </Modal.Body>

          <Modal.Footer>
            <Button type="submit" bsStyle="primary" bsSize="large" block>
              Start
            </Button>
          </Modal.Footer>
        </RRForm>

        <ConfirmModal
          show={this.state.confirm}
          onConfirm={this.handleConfirm}
          onHide={() => this.setState({ confirm: false })}
        >
          Are you sure you want to start a new game? All unsaved progress will
          be lost.
        </ConfirmModal>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    gameOpen: state.gameOpen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onNewGame: (title, game, name, location, rules) => {
      dispatch(newGame(title, game, name, rules));
      if (location) dispatch(newLocation(location));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewGameModal);
