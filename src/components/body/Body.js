import React from 'react';
import { Grid, Col, Row } from 'react-bootstrap';

import './Body.css';
import Journal from './journal/Journal';
import Menu from './menu/Menu';

export default class Body extends React.Component {
  render() {
    return (
      <div id='main'>
        {!this.props.gameOpen && <div id='cover' />}
        <Grid fluid>
          <Row>
            <Col lg={6} md={5}>
              <Journal />
            </Col>
            <Col lg={6} md={7}>
              <Menu />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}