import React from 'react';
import { Row, Col, Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import { connect } from 'react-redux';

import './Info.css';

class Info extends React.Component {
  render() {
    const {title, game, name, rules} = this.props;

    return (
      <Row>
        <Col xs={7} id='info'>
        <Panel bsStyle='info' header={title}>
          <div>
            <h4>{game}</h4>
            <h4>{name}</h4>
          </div>
        </Panel>
        </Col>
        <Col id='rules' xs={5}>
        <Panel bsStyle='info' header='Rules'>
          <ListGroup fill>
            {rules.map((rule, index) => (
              <ListGroupItem key={index}>{rule}</ListGroupItem>
            ))}
          </ListGroup>
        </Panel>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => {
  return {
    title: state.title,
    game: state.game,
    name: state.name,
    rules: state.rules
  };
};

export default connect(mapStateToProps)(Info);