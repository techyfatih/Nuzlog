import React from "react";

import "./Menu.css";

import Options from "./options/Options";
import Boxes from "./boxes/Boxes";

export default class Menu extends React.Component {
  render() {
    return (
      <div id="menu">
        <Panel
          header="Menu"
          bsStyle="success"
          collapsible
          defaultExpanded={true}
        >
          <Options />
          <Boxes />
        </Panel>
      </div>
    );
  }
}
