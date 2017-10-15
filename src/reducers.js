import { combineReducers } from 'redux';
import { NEW_GAME, NEW_LOCATION, RECORD_LOG } from './actions';

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
  log: []
}

const recordLog = (type, entry) => {
  return {
    time: new Date().toLocaleString(),
    type,
    entry
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case NEW_GAME:
      return Object.assign({}, state, {
        info: action.info,
        rules: action.rules,
        log: []
      })
      break;
    case NEW_LOCATION:
      return Object.assign({}, state, {
        location: action.location,
        log: [...state.log, recordLog('location', action.location)]
      });
      break;
    case RECORD_LOG:
      return Object.assign({}, state, {
        log: [...state.log, recordLog('log', action.log)]
      })
      break;
    default:
      return state;
  }
}