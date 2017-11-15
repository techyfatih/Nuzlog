import React from 'react';
import { Row, Col, Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import { connect } from 'react-redux';

import './Info.css';

class Info extends React.Component {
  constructor() {
    super();
    this.state = {expanded: true};
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect() {
    this.setState(({expanded}) => ({expanded: !expanded}));
  }

  render() {
    const {title, game, name, rules} = this.props;
    const {expanded} = this.state;

    return (
      <Row>
        <Col xs={7} id='info'>
          <Panel bsStyle='info' header={title} collapsible expanded={expanded}
            onSelect={this.handleSelect}>
            <div>
              <h4>{game}</h4>
              <h4>{name}</h4>
            </div>
          </Panel>
        </Col>
        <Col id='rules' xs={5}>
          <Panel bsStyle='info' header='Rules' collapsible expanded={expanded}
            onSelect={this.handleSelect}>
            <ListGroup fill>
              {rules.length == 0 ? <ListGroupItem>No Rules</ListGroupItem> :
                rules.map((rule, index) => (
                  <ListGroupItem key={index}>{rule}</ListGroupItem>
                ))
              }
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