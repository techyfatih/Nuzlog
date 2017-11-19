import React from 'react';
import { Well, Grid, ButtonGroup, Button, Modal } from 'react-bootstrap';

import ThemeSwitcher from './ThemeSwitcher';
import NewGameModal from './newGame/NewGameModal';
import SaveLoadGameModal from './SaveLoadGameModal';

export default class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      newGame: false,
      saveLoadGame: false
    }
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  open(modal) {
    this.setState({[modal]: true});
  }

  close(modal) {
    this.setState({[modal]: false});
  }

  render() {
    return (
      <Well bsSize='small'>
        <Grid>
          <h1 className='pull-left'>
            Nuzlog <small><small>v.{this.props.version}</small></small>
          </h1>
          <div className='pull-right'><ThemeSwitcher/></div>
          
          <ButtonGroup bsSize='large' justified>
            <Button href='#' bsStyle='primary'
              onClick={() => this.open('newGame')}>
              New Game
            </Button>
            <Button href='#' bsStyle='primary'
              onClick={() => this.open('saveLoadGame')}>
              Save/Load Game
            </Button>
          </ButtonGroup>
        </Grid>

        <NewGameModal show={this.state.newGame}
          onHide={() => this.close('newGame')}
          gameOpen={this.props.gameOpen}
          onOpenGame={this.props.onOpenGame} />
        <SaveLoadGameModal show={this.state.saveLoadGame}
          onHide={() => this.close('saveLoadGame')}
          gameOpen={this.props.gameOpen}
          onOpenGame={this.props.onOpenGame} />
      </Well>
    );
  }
}