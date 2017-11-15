import React from 'react';
import { Media, Panel, Table, ButtonGroup, Button,
  Tabs, Tab } from 'react-bootstrap';

import './PokeCard.css';

import male from 'img/male.png';
import female from 'img/female.png';

import getPokemon from 'utilities/getPokemon';
import getFullname from 'utilities/getFullname';

import PokeExport from '../PokeExport';
import PokeIcon from '../PokeIcon';
import PokeSprite from '../sprite/PokeSprite';
import EditModal from '../EditModal';

export default class PokeCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: getPokemon(props.pokemon),
      edit: false
    }
    this.openEdit = this.openEdit.bind(this);
    this.closeEdit = this.closeEdit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      pokemon: getPokemon(nextProps.pokemon)
    });
  }

  openEdit() {
    this.setState({edit: true});
  }

  closeEdit() {
    this.setState({edit: false});
  }

  render() {
    const {pokemon, edit} = this.state;
    const name = getFullname(pokemon);
    const moves = Array.isArray(pokemon.moves);
    
    return (
      <Panel className='poke-card' bsStyle={this.props.bsStyle} header={
        <Media>
          <Media.Left align='middle'>
            <PokeIcon pokemon={pokemon} />
          </Media.Left>
          <Media.Body>
            <Media.Heading>
              <span className='name'>{name ? name : 'No Pokémon'}</span>&nbsp;
              <img className='gender' src={
                pokemon.gender == 'M' ? male :
                pokemon.gender == 'F' ? female : ''} />
            </Media.Heading>
            <span>
              <span className={pokemon.level ? '' : 'invisible'}>
                Level {pokemon.level}
              </span><br />
              <a role='button' className={pokemon.method ? '' : 'invisible'}>
                {pokemon.method ? pokemon.method : '?'} {pokemon.location}
              </a>
            </span>
          </Media.Body>
          {pokemon.shiny && <Media.Right className='shiny'>*</Media.Right>}
        </Media>
      }>
        <div className={this.props.pokemon ? '' : 'invisible'}>
          <Tabs defaultActiveKey={1} justified id='poke-card-tabs'>
            <Tab eventKey={1} title='Stats'>
              <PokeSprite pokemon={pokemon} />
                <Table condensed>
                  <tbody>
                    <tr>
                      <th width={125}>Form:</th>
                      <td>{pokemon.form ? pokemon.form : 'Normal'}</td>
                    </tr>
                    <tr>
                      <th>Nature:</th>
                      <td>{pokemon.nature}</td>
                    </tr>
                    <tr>
                      <th>Ability:</th>
                      <td>{pokemon.ability}</td>
                    </tr>
                    <tr>
                      <th>Moves:</th>
                      <td>
                        - {moves && pokemon.moves[0]} <br/>
                        - {moves && pokemon.moves[1]} <br/>
                        - {moves && pokemon.moves[2]} <br/>
                        - {moves && pokemon.moves[3]}
                      </td>
                    </tr>
                    {!pokemon.cause && (
                      <tr>
                        <th>Item:</th>
                        <td>{pokemon.item}</td>
                      </tr>
                    )}
                    {pokemon.cause && (
                      <tr>
                        <th>Cause of Death:</th>
                        <td>{pokemon.cause}</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
            </Tab>
            <Tab eventKey={2} title='Export'>
              <PokeExport pokemon={pokemon} />
            </Tab>
          </Tabs>
          <ButtonGroup justified>
            <Button bsStyle='warning' href='#' onClick={this.openEdit}>
              Edit Pokémon
            </Button>
            <Button bsStyle='danger' href='#' onClick={this.openEdit}>
              Death
            </Button>
          </ButtonGroup>
        </div>

        <EditModal pokemon={pokemon} show={edit} onHide={this.closeEdit} />
      </Panel>
    );
  }
}