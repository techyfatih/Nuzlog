import React from 'react';

import './App.css';
import Header from './header/Header';
import Body from './body/Body';
import Footer from './footer/Footer';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {gameOpen: false};
    this.openGame = this.openGame.bind(this);
  }

  openGame() {
    this.setState({gameOpen: true});
  }
  
  render() {
    return (
      <div>
        <Header version='2.0.0'
          gameOpen={this.state.gameOpen}
          onOpenGame={this.openGame} />
        <Body gameOpen={this.state.gameOpen} />
        <Footer />
      </div>
    );
  }
}