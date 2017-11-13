import React from 'react';
import { Panel, ButtonGroup, Button, Tabs, Tab } from 'react-bootstrap';
import { connect } from 'react-redux';

import './Menu.css';

import AddPokemonModal from './addPokemon/AddPokemonModal';
import LUL from './LUL';
import Party from './party/Party';
import PC from './pc/PC';
import Cemetery from './cemetery/Cemetery';

class Menu extends React.Component {
  constructor() {
    super();
    this.state = {
      tab: 1,
      partyIndex: -1,
      pcIndex: -1,
      cemeteryIndex: -1,
      addOpen: false,
      lul: false
    };
    this.openAdd = this.openAdd.bind(this);
    this.closeAdd = this.closeAdd.bind(this);
    this.openLUL = this.openLUL.bind(this);
    this.closeLUL = this.closeLUL.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {party, pc, cemetery} = this.props;
    if (nextProps.party.length > party.length) {
      this.setState({
        tab: 1,
        partyIndex: party.length,
        pcIndex: -1,
        cemeteryIndex: -1
      });
    } else if (nextProps.pc.length > pc.length) {
      this.setState({
        tab: 2,
        partyIndex: -1,
        pcIndex: pc.length,
        cemeteryIndex: -1
      });
    } else if (nextProps.cemetery.length > cemetery.length) {
      this.setState({
        tab: 3,
        partyIndex: -1,
        pcIndex: -1,
        cemeteryIndex: cemetery.length
      })
    }
  }

  openAdd() {
    this.setState({addOpen: true});
  }

  closeAdd() {
    this.setState({addOpen: false});
  }

  openLUL() {
    this.setState({lul: true});
  }

  closeLUL() {
    this.setState({lul: false});
  }

  handleSelect(tab) {
    this.setState({tab});
  }

  handleChange(box, index) {
    if (box == 'party') {
      this.setState({partyIndex: index});
    } else if (box == 'pc') {
      this.setState({pcIndex: index});
    } else if (box == 'cemetery') {
      this.setState({cemeteryIndex: index});
    }
  }

  render() {
    const {party, pc, cemetery} = this.props;
    const {tab, partyIndex, pcIndex, cemeteryIndex} = this.state;

    return (
      <Panel id='menu' header='Menu' bsStyle='success'>
        <ButtonGroup justified>
          <Button bsStyle='success' href='#' onClick={this.openAdd}>
            Add <span className='hidden-xs'>Pokémon</span>
          </Button>
          <Button bsStyle='info' href='#' onClick={this.openLUL}>
            Catches
          </Button>
          <Button bsStyle='warning' href='#' onClick={this.openLUL}>
            Bag
          </Button>
          <Button bsStyle='danger' href='#' onClick={this.openLUL}>
            Battle
          </Button>
        </ButtonGroup>

        <Tabs activeKey={this.state.tab} id='pokemon-tabs' justified
          onSelect={this.handleSelect}>
          <Tab eventKey={1} title='Party'>
            <Party party={party} index={partyIndex}
              onChange={index => this.handleChange('party', index)} />
          </Tab>
          <Tab eventKey={2} title='PC'>
            <PC pc={pc} index={pcIndex} partyFull={party.length >= 6}
              onChange={index => this.handleChange('pc', index)} />
          </Tab>
          <Tab eventKey={3} title='Cemetery'>
            <Cemetery cemetery={cemetery} index={cemeteryIndex}
              onChange={index => this.handleChange('cemetery', index)} />
          </Tab>
        </Tabs>
        
        <AddPokemonModal show={this.state.addOpen} onHide={this.closeAdd} />
        <LUL show={this.state.lul} onHide={this.closeLUL} />
      </Panel>
    );
  }
}

const mapStateToProps = state => {
  return {
    party: state.party,
    pc: state.pc,
    cemetery: state.cemetery
  };
};

export default connect(mapStateToProps)(Menu);