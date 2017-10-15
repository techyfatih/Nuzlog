import { combineReducers } from 'redux';
import { NEW_GAME, NEW_LOCATION } from './actions';

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

export default (state = initialState, action) => {
  switch (action.type) {
    case NEW_GAME:
      return Object.assign({}, state, {
        info: action.info,
        rules: action.rules,
      })
      break;
    case NEW_LOCATION:
      return Object.assign({}, state, {
        location: action.location
      });
      break;
    default:
      return state;
  }
}