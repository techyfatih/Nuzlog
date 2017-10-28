export const types = {
  NEW_GAME: 'NEW_GAME',
  NEW_LOCATION: 'NEW_LOCATION',
  RECORD_LOG: 'RECORD_LOG',
  ADD_POKEMON: 'ADD_POKEMON'
};

export const newGame = (info, rules) => {
  return {
    type: types.NEW_GAME,
    info,
    rules
  };
};

export const newLocation = location => {
  return {
    type: types.NEW_LOCATION,
    location
  };
};

export const recordLog = log => {
  return {
    type: types.RECORD_LOG,
    log
  };
};

export const addPokemon = pokemon => {
  return {
    type: types.ADD_POKEMON,
    pokemon
  };
};