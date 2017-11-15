import React from 'react';
import { Panel, ButtonGroup, Button, Tabs, Tab } from 'react-bootstrap';
import { connect } from 'react-redux';

import './Boxes.css';

import Party from './Party';
import Box from './box/Box';
import SummaryModal from 'components/pokemon/SummaryModal';
import PokeCard from 'components/pokemon/card/PokeCard';

class Boxes extends React.Component {
  constructor() {
    super();
    this.state = {
      box: 1,
      partyIndex: -1,
      pcIndex: -1,
      cemeteryIndex: -1,
      summary: false
    };
    this.openSummary = this.openSummary.bind(this);
    this.closeSummary = this.closeSummary.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.pokemon);
    if (this.props != nextProps) {
      const {party, pc, cemetery} = this.props;
      this.setState(prevState => {
        let box = prevState.box;
        let partyIndex = prevState.partyIndex;
        let pcIndex = prevState.pcIndex;
        let cemeteryIndex = prevState.cemeteryIndex;

        if (nextProps.party.length > party.length) {
          box = 1;
          partyIndex = party.length;
        } else if (nextProps.pc.length > pc.length) {
          box = 2;
          pcIndex = pc.length;
        } else if (nextProps.cemetery.length > cemetery.length) {
          box = 3;
          cemeteryIndex = cemetery.length;
        }

        return {
          box,
          partyIndex,
          pcIndex,
          cemeteryIndex
        }
      });
    }
  }

  openSummary() {
    this.setState({summary: true});
  }

  closeSummary() {
    this.setState({summary: false});
  }

  handleSelect(box) {
    this.setState({box});
  }

  handleChange(box, index) {
    if (box == 1) this.setState({partyIndex: index});
    else if (box == 2) this.setState({pcIndex: index});
    else if (box == 3) this.setState({cemeteryIndex: index});
  }

  render() {
    const {pokemon, party, pc, cemetery} = this.props;
    const {box, partyIndex, pcIndex, cemeteryIndex} = this.state;
    const {summary} = this.state;

    let cardPokemon = -1;
    if (box == 1) cardPokemon = pokemon[party[partyIndex]];
    else if (box == 2) cardPokemon = pokemon[pc[pcIndex]];
    else if (box == 3) cardPokemon = pokemon[cemetery[cemeteryIndex]];
    
    return (
      <div className='clearfix'>
        <div id='boxes' className='pull-left'>
          <Tabs activeKey={box} id='boxes-tabs' justified animation={false}
            onSelect={this.handleSelect}>
            <Tab eventKey={1} title='Party'>
              <Party index={partyIndex}
                onChange={index => this.handleChange(1, index)} />
            </Tab>
            <Tab eventKey={2} title='PC'>
              <Box box={pc} index={pcIndex}
                onChange={index => this.handleChange(2, index)} />
            </Tab>
            <Tab eventKey={3} title='Cemetery'>
              <Box box={cemetery} index={cemeteryIndex}
                onChange={index => this.handleChange(3, index)} />
            </Tab>
          </Tabs>
          <Button id='summary-button' bsStyle='primary' block
            onClick={this.openSummary}>Summary</Button>
          <Button bsStyle='info' block>Move</Button>
        </div>
        
        <div id='boxes-card' className='pull-right'>
          <PokeCard bsStyle={
            box == 1 ? 'info' :
            box == 2 ? 'warning' : 'default'
          } pokemon={cardPokemon} />
        </div>
    
        <SummaryModal show={summary} onHide={this.closeSummary} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    pokemon: state.pokemon,
    party: state.party,
    pc: state.pc,
    cemetery: state.cemetery
  };
};

export default connect(mapStateToProps)(Boxes);