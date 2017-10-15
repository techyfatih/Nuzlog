import React from 'react';
import { Grid, Col, Row } from 'react-bootstrap';

import Info from './Info';
import Journal from './Journal';
import Menu from './Menu';

export default class Body extends React.Component {
  render() {
    return (
      <div>
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
      </div>
    );
  }
}