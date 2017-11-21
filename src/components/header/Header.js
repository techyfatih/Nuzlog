import React from 'react';
import { Well, Grid, Row, Col, Button } from 'react-bootstrap';

import ThemeSwitcher from './ThemeSwitcher';
import NewGameModal from './newGame/NewGameModal';
import SaveLoadGameModal from './saveLoadGame/SaveLoadGameModal';

export default class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      newGame: false,
      saveLoadGame: false
    };
  }

  render() {
    return (
      <Well bsSize='small'>
        <Grid>
          <div className='clearfix'>
            <h1 className='pull-left'>
              Nuzlog <small><small>v.{this.props.version}</small></small>
            </h1>
            <div className='pull-right'><ThemeSwitcher/></div>
          </div>
          
          <Row>
            <Col sm={6}>
              <Button bsStyle='primary' bsSize='large' block
                onClick={() => this.setState({newGame: true})}>
                New Game
              </Button>
              <NewGameModal show={this.state.newGame}
                onHide={() => this.setState({newGame: false})} />
            </Col>
            <Col sm={6}>
              <Button bsStyle='primary' bsSize='large' block
                onClick={() => this.setState({saveLoadGame: true})}>
                Save/Load Game
              </Button>
              <SaveLoadGameModal show={this.state.saveLoadGame}
                onHide={() => this.setState({saveLoadGame: false})} />
            </Col>
          </Row>
        </Grid>
      </Well>
    );
  }
}