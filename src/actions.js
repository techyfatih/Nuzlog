export const types = {
  NEW_GAME: 'New Game',
  NEW_LOCATION: 'Location',
  RECORD_LOG: 'Log',
  ADD_POKEMON: 'Add',
  FAIL_CATCH: 'Fail Catch',
  EDIT_POKEMON: 'Edit',
  MOVE_POKEMON: 'Move',
  DEATH: 'Death',
  UNDO: 'Undo',
  SWITCH_BOX: 'Switch Box',
  SWITCH_SLOT: 'Switch Slot'
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

const recordAction = (type, action, time) => {
  time = time ? time : new Date();
  return {
    type,
    ...action,
    time
  }
}

export const newLocation = (location, time) => {
  return recordAction(types.NEW_LOCATION, {location}, time);
};

export const recordLog = (log, time) => {
  return recordAction(types.RECORD_LOG, {log}, time);
};

export const addPokemon = (pokemon, time) => {
  return recordAction(types.ADD_POKEMON, {pokemon}, time);
};

export const failCatch = (location, time) => {
  return recordAction(types.FAIL_CATCH, {location}, time);
}

export const editPokemon = (index, change, time) => {
  return recordAction(types.EDIT_POKEMON, {index, change}, time);
}

export const movePokemon = (party, pc, time) => {
  return recordAction(types.MOVE_POKEMON, {party, pc}, time);
}

export const death = (index, cause, time) => {
  return recordAction(types.DEATH, {index, cause}, time);
};

export const undo = () => {
  return {type: types.UNDO};
};

export const switchBox = box => {
  return {type: types.SWITCH_BOX, box};
};

export const switchSlot = (box, slot) => {
  return {type: types.SWITCH_SLOT, box, slot};
};