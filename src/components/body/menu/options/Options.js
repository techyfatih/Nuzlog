import React from "react";

import AddModal from "./AddModal";
import CatchesModal from "./CatchesModal";
import BagModal from "./BagModal";
import BattleModal from "./BattleModal";

export default class Options extends React.Component {
  constructor() {
    super();
    this.state = {
      add: false,
      catches: false,
      bag: false,
      battle: false
    };
  }

  render() {
    const { add, catches, bag, battle } = this.state;

    return (
      <ButtonGroup justified style={{ marginBottom: "10px" }}>
        <Button
          bsStyle="success"
          href="#"
          onClick={() => this.setState({ add: true })}
        >
          Add <span className="hidden-xs">Pokémon</span>
        </Button>
        <Button
          bsStyle="info"
          href="#"
          onClick={() => this.setState({ catches: true })}
        >
          Catches
        </Button>
        <Button
          bsStyle="warning"
          href="#"
          onClick={() => this.setState({ bag: true })}
        >
          Bag
        </Button>
        <Button
          bsStyle="danger"
          href="#"
          onClick={() => this.setState({ battle: true })}
        >
          Battle
        </Button>

        <AddModal show={add} onHide={() => this.setState({ add: false })} />
        <CatchesModal
          show={catches}
          onHide={() => this.setState({ catches: false })}
        />
        <BagModal show={bag} onHide={() => this.setState({ bag: false })} />
        <BattleModal
          show={battle}
          onHide={() => this.setState({ battle: false })}
        />
      </ButtonGroup>
    );
  }
}
