import { combineReducers } from 'redux';
import { types } from './actions';
import Pokemon from 'components/pokemon/Pokemon';

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
  }
}

export default (state = initialState, action) => {
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
    case types.LEVEL_UP:
      const {index, number} = action;
      if (index < 0 || index > state.party.length)
        return state;
      
      let pokemon = state.party[index];
      pokemon = {...pokemon, level: pokemon.level + number};

      return {...state,
        party: [
          state.party.slice(0, index),
          pokemon,
          state.party.slice(index)],
        log: [...state.log, recordLog('Level' + index),
          pokemon.name + ' grew to Level ' + pokemon.level + '!']
      };
    default:
      return state;
  }
}