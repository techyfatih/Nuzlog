import React from 'react';
import { Panel, FormGroup, ControlLabel, InputGroup, FormControl, Button, Table } from 'react-bootstrap';

export default class Journal extends React.Component {
  render() {
    return (
      <Panel header='Journal' bsStyle='warning'>
        <form>
          <FormGroup controlId='location'>
            <ControlLabel>Current Location</ControlLabel>
            <InputGroup>
              <InputGroup.Addon></InputGroup.Addon>
              <FormControl type='text' />
              <InputGroup.Button>
                <Button bsStyle='warning'>New Location</Button>
              </InputGroup.Button>
            </InputGroup>
          </FormGroup>
        </form>

        <Table className='table-fixed' condensed bordered style={{margin:0}}>
          <thead>
            <tr>
              <th className='col-xs-3'>Time</th>
              <th className='col-xs-3'>Type</th>
              <th className='col-xs-6'>Entry</th>
            </tr>
          </thead>
          <tbody id='journal'></tbody>
        </Table>
        <form>
          <FormGroup style={{margin:0}}>
            <InputGroup>
              <FormControl type='text' />
              <InputGroup.Button>
                <Button bsStyle='primary'>Log</Button>
                <Button bsStyle='danger'>Undo</Button>
              </InputGroup.Button>
            </InputGroup>
          </FormGroup>
        </form>
      </Panel>
    );
  }
}