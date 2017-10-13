import './App.css';
import React from 'react';
import { Well, Grid, Col, Row } from 'react-bootstrap';
import Header from './Header';
import Info from './Info';
import Journal from './Journal';
import Menu from './Menu';
import Footer from './Footer';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Header />

        <Grid fluid>
          <Row>
            <Col lg={6} md={5}>
              <Info />
              <Journal />
            </Col>
            <Col lg={6} md={7}>
              <Menu />
            </Col>
          </Row>
        </Grid>
        
        <Footer />
      </div>
    );
  }
}