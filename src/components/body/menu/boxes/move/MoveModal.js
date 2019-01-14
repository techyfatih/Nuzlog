import React from "react";
import { connect } from "react-redux";

import "./MoveModal.css";

import equals from "utilities/equals";

import PokeSlot from "components/pokemon/slot/PokeSlot";
import { movePokemon } from "actions";

const six = [0, 1, 2, 3, 4, 5];

class MoveModal extends React.Component {
  constructor() {
    super();
    this.state = {
      party: [],
      pc: [],
      partyIndex: -1,
      pcIndex: -1,
      switchMode: false
    };
    this.handleEnter = this.handleEnter.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleDeposit = this.handleDeposit.bind(this);
    this.handleWithdraw = this.handleWithdraw.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
    this.handleMove = this.handleMove.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      party: nextProps.party,
      pc: nextProps.pc
    });
  }

  handleEnter() {
    this.setState({
      party: this.props.party,
      pc: this.props.pc
    });
  }

  handleChange(box, index) {
    if (!this.state.switchMode) {
      if (box == 1) this.setState({ partyIndex: index });
      else if (box == 2) this.setState({ pcIndex: index });
    } else {
      this.setState(prevState => {
        let { partyIndex, pcIndex } = prevState;
        let party = prevState.party;
        let pc = prevState.pc;

        if (partyIndex != -1) {
          party = party.slice();
          if (box == 1) {
            const temp = party[partyIndex];
            party[partyIndex] = party[index];
            party[index] = temp;

            partyIndex = index;
          } else if (box == 2) {
            pc = pc.slice();
            const temp = party[partyIndex];
            party[partyIndex] = pc[index];
            pc[index] = temp;

            partyIndex = -1;
            pcIndex = index;
          }
        } else if (pcIndex != -1) {
          pc = pc.slice();
          if (box == 1) {
            party = party.slice();
            const temp = pc[pcIndex];
            pc[pcIndex] = party[index];
            party[index] = temp;

            partyIndex = index;
            pcIndex = -1;
          } else if (box == 2) {
            const temp = pc[pcIndex];
            pc[pcIndex] = pc[index];
            pc[index] = temp;

            pcIndex = index;
          }
        }

        return {
          party,
          pc,
          partyIndex,
          pcIndex,
          switchMode: false
        };
      });
    }
  }

  handleClick(box, e) {
    const value = e.target.value;
    if (value) {
      if (box == 1 && value == this.state.partyIndex)
        this.setState({ partyIndex: -1, switchMode: false });
      else if (box == 2 && value == this.state.pcIndex)
        this.setState({ pcIndex: -1, switchMode: false });
    }
  }

  handleDeposit() {
    this.setState(({ party, pc, partyIndex }) => ({
      party: [...party.slice(0, partyIndex), ...party.slice(partyIndex + 1)],
      pc: pc.concat([party[partyIndex]]),
      partyIndex: -1,
      pcIndex: pc.length,
      switchMode: false
    }));
  }

  handleWithdraw() {
    this.setState(({ party, pc, pcIndex }) => ({
      party: party.concat([pc[pcIndex]]),
      pc: [...pc.slice(0, pcIndex), ...pc.slice(pcIndex + 1)],
      partyIndex: party.length,
      pcIndex: -1,
      switchMode: false
    }));
  }

  handleSwitch(box) {
    this.setState(prevState => {
      let partyIndex = prevState.partyIndex;
      let pcIndex = prevState.pcIndex;

      if (box == 1) pcIndex = -1;
      else if (box == 2) partyIndex = -1;

      return {
        switchMode: !prevState.switchMode,
        partyIndex,
        pcIndex
      };
    });
  }

  handleMove() {
    this.props.onMovePokemon(this.state.party, this.state.pc);
    this.props.onHide();
  }

  render() {
    const { show, onHide, pokemon } = this.props;
    const { party, pc, partyIndex, pcIndex, switchMode } = this.state;

    return (
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <h2>Move Pokémon</h2>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Col xs={6}>
              <h4>Party</h4>
              <ToggleButtonGroup
                vertical
                block
                type="radio"
                name="move-party"
                value={partyIndex}
                onChange={index => this.handleChange(1, index)}
                className={switchMode ? "switch" : ""}
              >
                {six.map((val, key) => (
                  <ToggleButton
                    value={key}
                    key={key}
                    disabled={party[key] == null}
                    onClick={e => this.handleClick(1, e)}
                  >
                    <PokeSlot pokemon={pokemon[party[key]]} />
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
              <ButtonGroup vertical block>
                <Button
                  bsStyle="primary"
                  href="#"
                  disabled={partyIndex < 0}
                  onClick={this.handleDeposit}
                >
                  Deposit
                </Button>
                <Button
                  bsStyle="primary"
                  href="#"
                  disabled={partyIndex < 0}
                  onClick={() => this.handleSwitch(1)}
                >
                  Switch
                </Button>
              </ButtonGroup>
            </Col>
            <Col xs={6}>
              <h4>PC</h4>
              <ToggleButtonGroup
                id="move-pc"
                vertical
                type="radio"
                name="move-pc"
                value={pcIndex}
                onChange={index => this.handleChange(2, index)}
                className={switchMode ? "switch" : ""}
              >
                {pc.map((val, key) => (
                  <ToggleButton
                    value={key}
                    key={key}
                    onClick={e => this.handleClick(2, e)}
                  >
                    <PokeSlot pokemon={pokemon[pc[key]]} />
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
              <ButtonGroup vertical block>
                <Button
                  bsStyle="warning"
                  href="#"
                  disabled={party.length >= 6 || pcIndex < 0}
                  onClick={this.handleWithdraw}
                >
                  Withdraw
                </Button>
                <Button
                  bsStyle="warning"
                  href="#"
                  disabled={pcIndex < 0}
                  onClick={() => this.handleSwitch(2)}
                >
                  Switch
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button
            bsStyle="info"
            bsSize="large"
            block
            disabled={
              equals(party, this.props.party) && equals(pc, this.props.pc)
            }
            onClick={this.handleMove}
          >
            Move Pokémon
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    pokemon: state.pokemon,
    party: state.party,
    pc: state.pc
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onMovePokemon: (party, pc) => {
      dispatch(movePokemon(party, pc));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoveModal);
