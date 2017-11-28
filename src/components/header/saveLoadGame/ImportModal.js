import React from 'react';
import { Modal, FormControl, Button } from 'react-bootstrap';

import normalize from 'utilities/normalize';
import { types } from 'actions';

export default class ImportModal extends React.Component {
  constructor() {
    super();
    this.state = {
      save: '',
      error: ''
    };
    this.handleEnter = this.handleEnter.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleImport = this.handleImport.bind(this);
  }

  handleEnter() {
    this.setState({
      save: '',
      error: ''
    });
  }

  handleChange(e) {
    this.setState({save: e.target.value});
  }

  handleImport() {
    const save = this.state.save.split('\n');
    const json = {};
    try {
      json.title = save[0];
      if (!json.title) throw 'No title specified';
      json.game = save[1];
      if (!json.game) throw 'No game specified';
      json.name = save[2];
      if (!json.name) throw 'No name specified';

      json.log = [];
      let pokeID = 0;
      let party = [];
      let pc = [];
      for (let i = 3; i < save.length; i++) {
        let line = save[i].trim();
        if (!line || line[0] != '[') continue;

        const log = {};
        const bracket = line.indexOf(']');
        const timeStr = line.substring(1, bracket);
        let time = new Date(timeStr);
        if (isNaN(time)) {
          const _time = timeStr.split(',');
          const ddmmyy = _time[0].split('/');
          const day = !isNaN(ddmmyy[0]) ? parseInt(ddmmyy[0]) : null;
          const month = !isNaN(ddmmyy[1]) ? parseInt(ddmmyy[1]) : null;
          const year = !isNaN(ddmmyy[2]) ? parseInt(ddmmyy[2]) : null;
          
          const hhmmss = _time[1].split(':');
          const ampm = hhmmss[hhmmss.length - 1].split(' ');
          let hour = !isNaN(hhmmss[0]) ? parseInt(hhmmss[0]) : null;
          if (hour && ampm[1].toLowerCase() == 'pm')
            hour += 12;
          let minute = !isNaN(hhmmss[1]) ? parseInt(hhmmss[1]) : null;
          let second = !isNaN(hhmmss[2]) ? parseInt(hhmmss[2]) : null;
          if (!minute) minute = !isNaN(ampm[0]) ? parseInt(ampm[0]) : null;
          else if (!second) second = !isNaN(ampm[0]) ? parseInt(ampm[0]) : null;
          
          time = new Date(year, month, day, hour, minute, second);
          if (isNaN(time)) throw 'Invalid time at line ' + i;
        }
        log.time = time;
        
        const colon = line.indexOf(':', bracket);
        if (colon == -1) throw 'Cannot read log type at line ' + i;
        const type = normalize(line.substring(bracket + 1, colon));
        let entry = line.substring(colon + 1).trim();

        if (type == 'pokemon') {
          log.type = types.ADD_POKEMON;
          const pokemon = {};

          i++;
          line = save[i].trim();
          const at = line.indexOf('@');
          if (at != -1) {
            pokemon.item = line.substring(at + 1).trim();
            line = line.substring(0, at).trim();
          }
          const paren = line.indexOf('(');
          let endParen = line.indexOf(')', paren);
          if (paren == -1 || endParen == -1) pokemon.species = line.trim();
          else {
            const m = line.indexOf('(M)');
            const f = line.indexOf('(F)');
            const g = line.indexOf('(G)');
            if (m != -1) pokemon.gender = 'M';
            else if (f != -1) pokemon.gender = 'F';
            else if (g != -1) pokemon.gender = 'N';

            if (m == paren || f == paren || g == paren || paren + 1 > endParen) {
              pokemon.species = line.substring(0, paren).trim();
            } else {
              pokemon.nickname = line.substring(0, paren).trim();
              pokemon.species = line.substring(paren + 1, endParen).trim();
            }
            if (!pokemon.species) throw 'Invalid Pokémon at line ' + i;
          }

          i++;
          line = save[i].trim();
          while (i < save.length) {
            line = save[i].trim();
            if (line[0] == '[') break;

            const nature = line.indexOf(' Nature');
            const colon = line.indexOf(':');

            if (line.indexOf('Ability: ') == 0) {
              pokemon.ability = line.substring(9).trim();
            } else if (line.indexOf('Level: ') == 0) {
              pokemon.level = parseInt(line.substring(7));
              if (isNaN(pokemon.level)) throw 'Invalid level at line ' + i;
            } else if (nature != -1) {
              pokemon.nature = line.substring(0, nature).trim();
            } else if (line[0] == '-') {
              if (!Array.isArray(pokemon.moves)) pokemon.moves = [];
              pokemon.moves.push(line.substring(1).trim());
            } else if (colon != -1) {
              pokemon.method = line.substring(0, colon + 1).trim();
              pokemon.location = line.substring(colon + 1).trim();
            }
            i++;
          }
          i--;
          log.entry = {pokemon};
          if (party.length < 6) party = [...party, pokeID];
          else pc = [...pc, pokeID];
          pokeID++;
        } else if (type.indexOf('level') != -1) {
          log.type = types.EDIT_POKEMON;
          const index = parseInt(party[type[type.length - 2]]);
          if (isNaN(index)) throw 'Invalid index at line ' + i;

          const grewTo = line.indexOf(' grew to level');
          const level = parseInt(line.substring(grewTo + 14, line.length - 1));
          if (isNaN(level)) throw 'Invalid level at line ' + i;

          log.entry = {index, change: {level}};
        } else if (type.indexOf('move') != -1) {
          log.type = types.EDIT_POKEMON;
          const index = parseInt(party[type[type.length - 2]]);
          if (isNaN(index)) throw 'Invalid index at line ' + i;

          const moves = entry.split('\t');
          moves.splice(0, 1);
          for (let i in moves) moves[i] = moves[i].substring(1).trim();

          log.entry = {index, change: {moves}};
        } else if (type.indexOf('item') != -1) {
          log.type = types.EDIT_POKEMON;
          const index = parseInt(party[type[type.length - 2]]);
          if (isNaN(index)) throw 'Invalid index at line ' + i;

          const quote = entry.indexOf('"');
          const endQuote = entry.indexOf('"', quote + 1);
          const item = entry.substring(quote + 1, endQuote).trim()

          log.entry = {index, change: {item}};
        } else if (type.indexOf('evolve') != -1) {
          log.type = types.EDIT_POKEMON;
          const index = parseInt(party[type[type.length - 2]]);
          if (isNaN(index)) throw 'Invalid index at line ' + i;

          const evolvedInto = entry.indexOf(' evolved into');
          const exclamation = entry.indexOf('!', evolvedInto);
          const newAbility = entry.indexOf(' New ability:', exclamation);
          const species = entry.substring(evolvedInto + 13, exclamation).trim();
          log.entry = {index, change: {species}};

          if (newAbility != -1)
            log.entry.change.ability = entry.substring(newAbility + 13).trim();
        } else if (type.indexOf('deposit') != -1) {
          log.type = types.MOVE_POKEMON;
          const index = parseInt(type[type.length - 2]);
          if (isNaN(index)) throw 'Invalid index at line ' + i;

          pc = [...pc, party[index]];
          party = [...party.slice(0, index), ...party.slice(index + 1)];
          log.entry = {party, pc};
        } else if (type.indexOf('withdraw') != -1) {
          log.type = types.MOVE_POKEMON;
          const index = parseInt(type.substring(type.indexOf('[') + 1, type.length - 1));
          if (isNaN(index)) throw 'Invalid index at line ' + i;

          party = [...party, pc[index]];
          pc = [...pc.slice(0, index), ...pc.slice(index + 1)];
          log.entry = {party, pc};
        } else if (type.indexOf('death') != -1) {
          log.type = types.DEATH;
          const index = parseInt(type[type.length - 2]);
          if (isNaN(index)) throw 'Invalid index at line ' + i;

          log.entry = {
            index: party[index],
            cause: entry.substring(entry.indexOf('Cause of death: ') + 15).trim()
          }
          party = [...party.slice(0, index), ...party.slice(index + 1)];
        } else {
          log.type = types.RECORD_LOG;
          log.entry = {log: entry};
        }
        json.log.push(log);
      }

      this.props.onImport(JSON.stringify(json));
    } catch (e) {
      this.setState({error: e.message ? e.message : e});
    }
  }

  render() {
    const {save, error} = this.state;

    return (
      <Modal backdropClassName='modal-2nd' show={this.props.show}
        onEnter={this.handleEnter} onHide={this.props.onHide}>
        <Modal.Header closeButton><h2>Import v1</h2></Modal.Header>
        <Modal.Body>
          <p>If you need to import from Nuzlog v1, paste your save here
            and click import.</p>
          <p>Note that this is only for backwards compatibility; please
            use the new JSON format for 2.0 if you can.</p>
          <FormControl componentClass='textarea' rows={10}
            style={{resize: 'none'}}
            value={save}
            onChange={this.handleChange} />
          {error && <span className='text-danger'>Error: {error}</span>}
        </Modal.Body>
        <Modal.Footer>
          <Button bsSize='large' bsStyle='info' block
            disabled={!save} onClick={this.handleImport}>Import</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}