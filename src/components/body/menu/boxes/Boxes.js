import React from "react";
import { connect } from "react-redux";

import "./Boxes.css";

import Party from "./Party";
import Box from "./box/Box";

import SummaryModal from "./SummaryModal";
import MoveModal from "./move/MoveModal";

import PokeCard from "components/pokemon/card/PokeCard";

import { switchBox, switchSlot } from "actions";

class Boxes extends React.Component {
  constructor() {
    super();
    this.state = {
      summary: false,
      move: false
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSelect(box) {
    this.props.switchBox(box);
  }

  handleChange(box, index) {
    this.props.switchBox(box);
    this.props.switchSlot(box, index);
  }

  render() {
    const { pokemon, party, pc, cemetery } = this.props;
    const { box, partySlot, pcSlot, cemeterySlot } = this.props;
    const { summary, move } = this.state;

    const bsStyle = box == 1 ? "info" : box == 2 ? "warning" : "default";

    let selectedPokemon = null;
    if (box == 1) selectedPokemon = pokemon[party[partySlot]];
    else if (box == 2) selectedPokemon = pokemon[pc[pcSlot]];
    else if (box == 3) selectedPokemon = pokemon[cemetery[cemeterySlot]];

    return (
      <div className="clearfix">
        <div id="boxes" className="pull-left">
          <Tabs
            activeKey={box}
            id="boxes-tabs"
            animation={false}
            justified
            onSelect={this.handleSelect}
          >
            <Tab eventKey={1} title="Party">
              <Party />
            </Tab>
            <Tab eventKey={2} title="PC">
              <Box
                box={pc}
                slot={pcSlot}
                bsStyle="warning"
                onChange={slot => this.handleChange(2, slot)}
              />
            </Tab>
            <Tab eventKey={3} title="Cemetery">
              <Box
                box={cemetery}
                slot={cemeterySlot}
                onChange={slot => this.handleChange(3, slot)}
              />
            </Tab>
          </Tabs>
          <Button
            id="summary-button"
            bsStyle="primary"
            block
            onClick={() => this.setState({ summary: true })}
            disabled={!selectedPokemon}
          >
            Summary
          </Button>
          <Button
            bsStyle="primary"
            block
            onClick={() => this.setState({ move: true })}
            disabled={party.length <= 0 && pc.length <= 0}
          >
            Move Pokémon
          </Button>
        </div>

        <div id="boxes-card" className="pull-right">
          <PokeCard bsStyle={bsStyle} pokemon={selectedPokemon} />
        </div>

        <SummaryModal
          bsStyle={bsStyle}
          show={summary}
          onHide={() => this.setState({ summary: false })}
          pokemon={selectedPokemon}
        />
        <MoveModal show={move} onHide={() => this.setState({ move: false })} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    pokemon: state.pokemon,
    party: state.party,
    pc: state.pc,
    cemetery: state.cemetery,
    box: state.box,
    partySlot: state.partySlot,
    pcSlot: state.pcSlot,
    cemeterySlot: state.cemeterySlot
  };
};

const mapDispatchToProps = dispatch => {
  return {
    switchBox: box => {
      dispatch(switchBox(box));
    },
    switchSlot: (box, slot) => {
      dispatch(switchSlot(box, slot));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Boxes);
