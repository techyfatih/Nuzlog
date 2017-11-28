import React from 'react';

import './App.css';
import Header from './header/Header';
import Body from './body/Body';
import Footer from './footer/Footer';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Header version='2.0.1' />
        <Body />
        <Footer />
      </div>
    );
  }
}