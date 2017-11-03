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
      return Object.assign({}, state, {
        info: action.info,
        rules: action.rules,
        location: '',
        log: []
      })
      break;
    case types.NEW_LOCATION:
      return Object.assign({}, state, {
        location: action.location,
        log: [...state.log, recordLog('Location', action.location)]
      });
      break;
    case types.RECORD_LOG:
      return Object.assign({}, state, {
        log: [...state.log, recordLog('Log', action.log)]
      })
      break;
    case types.ADD_POKEMON:
      if (state.party.length < 6) {
        return Object.assign({}, state, {
          party: [...state.party, action.pokemon],
          log: [...state.log, recordLog('Party', action.pokemon)]
        })
      } else {
        return Object.assign({}, state, {
          pc: [...state.pc, action.pokemon],
          log: [...state.log, recordLog('PC', action.pokemon)]
        })
      }
    default:
      return state;
  }
}