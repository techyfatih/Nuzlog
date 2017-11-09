import { combineReducers } from 'redux';
import { types } from './actions';

const initialState = {
  info: {
    title: 'Title',
    game: 'Game',
    name: 'Name'
  },
  rules: {
    genders: true,
    natures: true,
    abilities: true,
    list: [],
  },
  location: '',
  log: [],
  party: [],
  pc: [],
  cemetery: []
}


const recordLog = (type, entry) => {
  return {
    time: new Date(),
    type,
    entry
  };
};

const changeParty = (party, index, {levels, moves, item, species, ability}) => {
  let pokemon = party[index];
  if (!levels) levels = 0;
  if (!moves) moves = pokemon.moves;
  if (!item) item = pokemon.item;
  if (!species) species = pokemon.species;
  if (!ability) ability = pokemon.ability;

  pokemon = {...pokemon,
    level: parseInt(pokemon.level) + parseInt(levels),
    item,
    moves,
    species,
    ability,
  };

  return [...party.slice(0, index), pokemon, ...party.slice(index + 1)];
}

export default (state = initialState, action) => {
  const {index} = action;
  switch (action.type) {
    case types.NEW_GAME:
      return {...state,
        info: action.info,
        rules: action.rules,
        location: '',
        log: []
      };
    case types.NEW_LOCATION:
      return {...state,
        location: action.location,
        log: [...state.log, recordLog('Location', action.location)]
      }
    case types.RECORD_LOG:
      return {...state,
        log: [...state.log, recordLog('Log', action.log)]
      };
    case types.ADD_POKEMON:
      if (state.party.length < 6) {
        return {...state,
          party: [...state.party, action.pokemon],
          log: [...state.log, recordLog('Party', action.pokemon)]
        }
      } else {
        return {...state,
          pc: [...state.pc, action.pokemon],
          log: [...state.log, recordLog('PC', action.pokemon)]
        }
      }

    // Party
    case types.LEVEL_UP:
      const {levels} = action;
      if (index < 0 || index > state.party.length)
        return state;
      
      return {...state,
        party: changeParty(state.party, index, {levels}),
        log: [...state.log, recordLog('Level' + index, action)]
      };
    case types.CHANGE_MOVES:
      const {moves} = action;
      if (index < 0 || index > state.party.length)
        return state;
      
      return {...state,
        party: changeParty(state.party, index, {moves}),
        log: [...state.log, recordLog('Moves' + index, action)]
      };
    case types.CHANGE_ITEM:
      const {item} = action;
      if (index < 0 || index > state.party.length)
        return state;
      
      return {...state,
        party: changeParty(state.party, index, {item}),
        log: [...state.log, recordLog('Item' + index, action)]
      };
    case types.EVOLVE:
      const {species, ability} = action;
      if (index < 0 || index > state.party.length)
        return state;
      
      return {...state,
        party: changeParty(state.party, index, {species, ability}),
        log: [...state.log, recordLog('Evolve' + index, action)]
      };
    case types.DEPOSIT:
      if (index < 0 || index > state.party.length)
        return state;
      
      return {...state,
        party: changeParty(state.party, index, {moves}),
        log: [...state.log, recordLog('Deposit' + index, action.index)]
      };
    case types.DEATH:
      const {cause} = action;
      if (index < 0 || index > state.party.length)
        return state;
      
      return {...state,
        party: changeParty(state.party, index, {moves}),
        log: [...state.log, recordLog('Death' + index, action)]
      };

    default:
      return state;
  }
}