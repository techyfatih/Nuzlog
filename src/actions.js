export const types = {
  NEW_GAME: 'New Game',
  NEW_LOCATION: 'Location',
  RECORD_LOG: 'Log',
  ADD_POKEMON: 'Add',
  LEVEL_UP : 'Level',
  CHANGE_FORM: 'Form',
  CHANGE_MOVES: 'Moves',
  CHANGE_ITEM: 'Item',
  EVOLVE: 'Evolve',
  DEPOSIT: 'Deposit',
  DEATH: 'Death',
  WITHDRAW: 'Withdraw'
};

export const newGame = (title, game, name, rules) => {
  return {
    type: types.NEW_GAME,
    title,
    game,
    name,
    rules
  };
};

const recordAction = (type, action) => {
  return {
    type,
    ...action,
    time: new Date()
  }
}

export const newLocation = location => {
  return recordAction(types.NEW_LOCATION, {location});
};

export const recordLog = log => {
  return recordAction(types.RECORD_LOG, {log});
};

export const addPokemon = pokemon => {
  return recordAction(types.ADD_POKEMON, {pokemon});
};

export const levelUp = (index, levels) => {
  return recordAction(types.LEVEL_UP, {index, levels});
};

export const changeForm = (index, form) => {
  return recordAction(types.CHANGE_FORM, {index, form});
}

export const changeMoves = (index, moves) => {
  return recordAction(types.CHANGE_MOVES, {index, moves});
};

export const changeItem = (index, item) => {
  return recordAction(types.CHANGE_ITEM, {index, item});
};

export const evolve = (index, species, ability) => {
  return recordAction(types.EVOLVE, {index, species, ability});
};

export const deposit = index => {
  return recordAction(types.DEPOSIT, {index});
};

export const death = (index, cause) => {
  return recordAction(types.DEATH, {index, cause});
};

export const withdraw = index => {
  return recordAction(types.WITHDRAW, {index});
};