export const types = {
  NEW_GAME: 'NEW_GAME',
  NEW_LOCATION: 'NEW_LOCATION',
  RECORD_LOG: 'RECORD_LOG',
  ADD_POKEMON: 'ADD_POKEMON',
  LEVEL_UP : 'LEVEL_UP',
  CHANGE_MOVES: 'CHANGE_MOVES',
  CHANGE_ITEM: 'CHANGE_ITEM',
  EVOLVE: 'EVOLVE',
  DEPOSIT: 'DEPOSIT',
  DEATH: 'DEATH',
  WITHDRAW: 'WITHDRAW'
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

export const levelUp = (index, levels) => {
  return {
    type: types.LEVEL_UP,
    index,
    levels
  };
};

export const changeMoves = (index, moves) => {
  return {
    type: types.CHANGE_MOVES,
    index,
    moves
  };
};

export const changeItem = (index, item) => {
  return {
    type: types.CHANGE_ITEM,
    index,
    item
  };
};

export const evolve = (index, species, ability) => {
  return {
    type: types.EVOLVE,
    index,
    species,
    ability
  };
};

export const deposit = index => {
  return {
    type: types.DEPOSIT,
    index
  };
};

export const death = (index, cause) => {
  return {
    type: types.DEATH,
    index,
    cause
  };
};

export const withdraw = index => {
  return {
    type: types.WITHDRAW,
    index
  };
};