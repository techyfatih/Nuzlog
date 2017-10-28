import React from 'react';
import { Panel, ToggleButtonGroup, ToggleButton, Table } from 'react-bootstrap';
import { connect } from 'react-redux'

import './Party.css';
import PokeSlot from 'components/pokemon/PokeSlot';
import PokeCard from 'components/pokemon/PokeCard';

class PartyView extends React.Component {
  constructor() {
    super();
    this.state = {
      index: -1
    };
  }

  render() {
    return (
      <Panel id='party'>
        <Table>
          <tbody>
            <tr>
              <td>
                <ToggleButtonGroup type='radio' name='party' vertical>
                  <ToggleButton value={1} disabled={!this.props.party[0]}>
                    <PokeSlot pokemon={this.props.party[0]}/>
                  </ToggleButton>
                  <ToggleButton value={1} disabled={!this.props.party[1]}>
                    <PokeSlot pokemon={this.props.party[1]}/>
                  </ToggleButton>
                  <ToggleButton value={1} disabled={!this.props.party[2]}>
                    <PokeSlot pokemon={this.props.party[2]}/>
                  </ToggleButton>
                  <ToggleButton value={1} disabled={!this.props.party[3]}>
                    <PokeSlot pokemon={this.props.party[3]}/>
                  </ToggleButton>
                  <ToggleButton value={1} disabled={!this.props.party[4]}>
                    <PokeSlot pokemon={this.props.party[4]}/>
                  </ToggleButton>
                  <ToggleButton value={1} disabled={!this.props.party[5]}>
                    <PokeSlot pokemon={this.props.party[5]}/>
                  </ToggleButton>
                </ToggleButtonGroup>
              </td>
              <td>
                <PokeCard pokemon={this.props.party[this.state.index]} />
              </td>
            </tr>
          </tbody>
        </Table>
      </Panel>
    );
  }
}

const mapStateToProps = state => {
  return {
    party: state.party
  };
};

const Party = connect(mapStateToProps)(PartyView);
export default Party;