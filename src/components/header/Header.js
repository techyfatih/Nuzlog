import React from "react";

import ThemeSwitcher from "./ThemeSwitcher";
import NewGameModal from "./newGame/NewGameModal";
import SaveLoadGameModal from "./saveLoadGame/SaveLoadGameModal";

export default class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      newGame: false,
      saveLoadGame: false
    };
  }

  render() {
    return <div />;
  }
}
