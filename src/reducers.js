import { types } from './actions';

const initialState = {
  gameOpen: false,
  title: 'Title',
  game: 'Game',
  name: 'Name',
  rules: [],

  location: '',

  pokemon: [],
  party: [],
  pc: [],
  cemetery: [],

  bag: [],

  box: 1,
  partySlot: -1,
  pcSlot: -1,
  cemeterySlot: -1,

  log: [],
};

const changeIndices = (pokemon, party, pc) => {
  const _pokemon = pokemon.slice();
  for (let i in party)
    pokemon[party[i]].slot = {party: parseInt(i)};
  
  for (let i in pc)
    pokemon[pc[i]].slot = {pc: parseInt(i)};

  return pokemon;
}

const logAction = (state, action) => {
  const {pokemon, party, pc, cemetery} = state;

  switch (action.type) {
    case types.NEW_LOCATION:
      return {...state,
        location: action.location,
        old: {location: state.location}
      };
    
    case types.RECORD_LOG:
      return {...state};
      
    case types.ADD_POKEMON:
      if (party.length < 6) {
        return {...state,
          pokemon: [...pokemon, {...action.pokemon, index: pokemon.length}],
          party: [...party, pokemon.length],
          box: 1,
          partySlot: party.length,
          old: {pokemon, party}
        };
      } else {
        return {...state,
          pokemon: [...pokemon, {...action.pokemon, index: pokemon.length}],
          pc: [...pc, pokemon.length],
          box: 2,
          pcSlot: pc.length,
          old: {pokemon, pc}
        };
      }

    case types.FAIL_CATCH:
      return {...state,
        pokemon: [...pokemon, {location: action.location}],
        old: {pokemon}
      };

    case types.EDIT_POKEMON:
      if (action.index < 0 || action.index >= pokemon.length)
        return state;

      return {...state,
        pokemon: [
          ...pokemon.slice(0, action.index),
          {...pokemon[action.index], ...action.change},
          ...pokemon.slice(action.index + 1)
        ],
        old: {pokemon}
      };
    
    case types.MOVE_POKEMON:
      if (!Array.isArray(action.party) || !Array.isArray(action.pc))
        return state;

      return {...state,
        party: action.party,
        pc: action.pc,
        partySlot: -1,
        pcSlot: -1,
        old: {party, pc}
      };
    
    case types.DEATH:
      if (action.index < 0 || action.index >= pokemon.length)
        return state;

      let _party = party;
      let _partySlot = state.partySlot;
      let _pc = pc;
      let _pcSlot = state.pcSlot;

      for (let i = 0; i < party.length; i++) {
        if (party[i] == action.index) {
          _party = [...party.slice(0, i), ...party.slice(i + 1)];
          _partySlot = -1;
          break;
        }
      }

      for (let i = 0; i < pc.length; i++) {
        if (pc[i] == action.index) {
          _pc = [...pc.slice(0, i), ...pc.slice(i + 1)];
          _pcSlot = -1;
          break;
        }
      }

      if (_party == pc && _pc == pc) return state;

      return {...state,
        pokemon: [
          ...pokemon.slice(0, action.index),
          {...pokemon[action.index],
            item: '',
            cause: action.cause
          },
          ...pokemon.slice(action.index + 1)
        ],
        party: _party,
        pc: _pc,
        partySlot: _partySlot,
        pcSlot: _pcSlot,
        cemetery: cemetery.concat([action.index]),
        box: 3,
        cemeterySlot: cemetery.length,
        old: {pokemon, party, pc, cemetery}
      };
    
    default:
      return state;
  }
};

const undo = (state) => {
  const {log} = state;
  if (log.length == 0) return state;

  const {type, old} = log[log.length - 1];
  let partySlot = state.partySlot;
  let pcSlot = state.pcSlot;
  let cemeterySlot = state.cemeterySlot;
  if (old.party && partySlot >= old.party.length)
    partySlot = -1;
  if (type == types.MOVE_POKEMON) {
    partySlot = -1;
    pcSlot = -1;
    cemeterySlot = -1;
  }

  return {...state, ...old, partySlot, pcSlot, cemeterySlot,
    log: log.splice(0, log.length - 1)
  };
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.NEW_GAME:
      return {...initialState,
        gameOpen: true,
        title: action.title,
        game: action.game,
        name: action.name,
        rules: Array.isArray(action.rules) ? action.rules : []
      };
    case types.UNDO:
      return undo(state);
    case types.SWITCH_BOX:
      return {...state, box: action.box};
    case types.SWITCH_SLOT:
      return {...state,
        box: action.box,
        partySlot: action.box == 1 ? action.slot : state.partySlot,
        pcSlot: action.box == 2 ? action.slot : state.pcSlot,
        cemeterySlot: action.box == 3 ? action.slot : state.cemeterySlot
      };
    default:
      const _state = logAction(state, action);
      if (_state == state) return state;

      const {time, type, ..._action} = action;
      _state.log = [...state.log, {
        time,
        type,
        entry: _action,
        old: _state.old
      }];
      delete _state.old;
      return _state;
  }
};