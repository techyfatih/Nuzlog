export const NEW_GAME = 'NEW_GAME';
export const NEW_LOCATION = 'NEW_LOCATION';
export const RECORD_LOG = 'RECORD_LOG';

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

export const recordLog = log => {
  return {
    type: RECORD_LOG,
    log
  }
}