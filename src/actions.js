export const NEW_GAME = 'NEW_GAME';
export const NEW_LOCATION = 'NEW_LOCATION';

export const newGame = (info, rules) => {
  return {
    type: NEW_GAME,
    info,
    rules
  }
}

export const newLocation = location => {
  return {
    type: NEW_LOCATION,
    location
  }
}