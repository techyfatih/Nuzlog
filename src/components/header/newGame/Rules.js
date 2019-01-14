import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import "./Rules.css";
import CloseButton from "components/other/CloseButton";

export default class Rules extends React.Component {
  constructor() {
    super();
    this.state = { rule: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.addRule = this.addRule.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.rules != prevProps.rules)
      this.list.scrollTop = this.list.scrollHeight;
  }

  handleChange(e) {
    this.setState({ rule: e.target.value });
  }

  handleKeyDown(e) {
    if (e.keyCode == 13) {
      //enter
      this.addRule();
      e.preventDefault();
    }
  }

  addRule() {
    if (this.state.rule) {
      this.props.addRule(this.state.rule);
      this.setState({ rule: "" });
    }
    this.input.focus();
  }

  render() {
    const { rules, removeRule } = this.props;

    return (
      <div>
        <Panel id="new-rules" header="Rules">
          <ListGroup fill ref={ref => (this.list = ReactDOM.findDOMNode(ref))}>
            {rules.map((rule, index) => (
              <ListGroupItem key={index} className="clearfix">
                <div className="new-rule pull-left">{rule}</div>
                <div className="pull-right">
                  <CloseButton onClick={() => removeRule(index)} />
                </div>
              </ListGroupItem>
            ))}
          </ListGroup>
        </Panel>

        <InputGroup>
          <FormControl
            type="text"
            value={this.state.rule}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            inputRef={ref => (this.input = ref)}
          />
          <InputGroup.Button>
            <Button onClick={this.addRule}>Add</Button>
          </InputGroup.Button>
        </InputGroup>
      </div>
    );
  }
}

Rules.propTypes = {
  addRule: PropTypes.func.isRequired,
  removeRule: PropTypes.func.isRequired
};
