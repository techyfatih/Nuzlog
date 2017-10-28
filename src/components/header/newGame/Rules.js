import React from 'react';
import { Button, InputGroup, FormControl, Glyphicon } from 'react-bootstrap';

import StickyTable from 'components/stickyTable/StickyTable';

export default class Rules extends React.Component {
  constructor() {
    super();
    this.state = {rule: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.addRule = this.addRule.bind(this);
  }
  
  handleChange(e) {
    this.setState({rule: e.target.value});
  }

  handleKeyDown(e) {
    if (e.keyCode == 13) { //enter
      this.addRule();
      e.preventDefault();
    }
  }

  addRule() {
    if (this.state.rule) {
      this.props.addRule(this.state.rule);
      this.setState({rule: ''});
    }
  }

  render() {
    return (
      <div>
        <StickyTable>
          <StickyTable.Header>
            <th>Rules</th>
          </StickyTable.Header>

          <StickyTable.Body height={100}>
            {this.props.rules.map((rule, index) =>
              <tr key={index}>
                <td>{rule}</td>
                <td width={24}>
                  <Button className='close'
                    onClick={() => this.props.removeRule(index)}>
                    <Glyphicon glyph='remove'/>
                  </Button>
                </td>
              </tr>
            )}
          </StickyTable.Body>
        </StickyTable>

        <InputGroup>
          <FormControl type='text' value={this.state.rule}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown} />
          <InputGroup.Button>
            <Button onClick={this.addRule}>Add</Button>
          </InputGroup.Button>
        </InputGroup>
      </div>
    )
  }
}