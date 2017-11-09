import React from 'react';
import { Well, Grid, ButtonGroup, Button, Modal } from 'react-bootstrap';

import ThemeSwitcher from './ThemeSwitcher';
import NewGameModal from './newGame/NewGameModal';
import SaveLoadGameModal from './SaveLoadGameModal';

export default class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      newGameOpen: false,
      saveLoadGameOpen: false
    }
    this.openNewGame = this.openNewGame.bind(this);
    this.closeNewGame = this.closeNewGame.bind(this);
    
    this.openSaveLoadGame = this.openSaveLoadGame.bind(this);
    this.closeSaveLoadGame = this.closeSaveLoadGame.bind(this);
  }

  openNewGame() {
    this.setState({newGameOpen: true});
  }

  closeNewGame() {
    this.setState({newGameOpen: false});
  }

  openSaveLoadGame() {
    this.setState({saveLoadGameOpen: true});
  }

  closeSaveLoadGame() {
    this.setState({saveLoadGameOpen: false});
  }

  render() {
    return (
      <Well bsSize='small'>
        <Grid>
          <h1 className='pull-left'>
            Nuzlog <small>v.{this.props.version}</small>
          </h1>
          <div className='pull-right'><ThemeSwitcher/></div>
          
          <ButtonGroup bsSize='large' justified>
            <Button href='#' bsStyle='primary' onClick={this.openNewGame}>
              New Game
            </Button>
            <Button href='#' bsStyle='primary' onClick={this.openSaveLoadGame}>
              Save/Load Game
            </Button>
          </ButtonGroup>
        </Grid>

        <NewGameModal show={this.state.newGameOpen}
          onHide={this.closeNewGame} />
        <SaveLoadGameModal show={this.state.saveLoadGameOpen}
          onHide={this.closeSaveLoadGame} />
      </Well>
    );
  }
}