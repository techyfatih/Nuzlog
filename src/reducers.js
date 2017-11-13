import { types } from './actions';

const initialState = {
  title: 'Title',
  game: 'Game',
  name: 'Name',
  rules: [],

  location: '',

  party: [],
  pc: [],
  cemetery: [],

  log: [],
};

const changeParty = (party, index, change) => {
  const {levels, ..._change} = change;

  let pokemon = {...party[index], ..._change};

  if (levels) {
    pokemon.level = (pokemon.level ? pokemon.level : 0) + (levels ? levels: 0);
  }

  return [...party.slice(0, index), pokemon, ...party.slice(index + 1)];
}

const logAction = (state, action) => {
  const {index} = action;
  const {party, pc, cemetery} = state;

  switch (action.type) {
    case types.NEW_LOCATION:
      return {...state, location: action.location};

    case types.RECORD_LOG:
      return {...state};
      
    case types.ADD_POKEMON:
      if (party.length < 6) {
        return {...state, party: [...party, {...action.pokemon}]};
      } else {
        return {...state, party: [...pc, {...action.pokemon}]};
      }

    // Party
    case types.LEVEL_UP:
      if (index < 0 || index > party.length)
        return state;
      
      return {...state,
        party: changeParty(party, index, {levels: action.levels})
      };
    case types.CHANGE_FORM:
      if (index < 0 || index > party.length)
        return state;
      
      return {...state,
        party: changeParty(party, index, {form: action.form})
      };
    case types.CHANGE_MOVES:
      if (index < 0 || index > party.length)
        return state;

      return {...state,
        party: changeParty(party, index, {moves: action.moves})
      };
    case types.CHANGE_ITEM:
      if (index < 0 || index > party.length)
        return state;
      
      return {...state,
        party: changeParty(party, index, {item: action.item})
      };
    case types.EVOLVE:
      if (index < 0 || index > party.length)
        return state;
      
      return {...state,
        party: changeParty(party, index, {
          species: action.species,
          ability: action.ability
        })
      };
    case types.DEPOSIT:
      if (index < 0 || index > party.length)
        return state;

      return {...state,
        party: [...party.slice(0, index), ...party.slice(index + 1)],
        pc: pc.concat([{...state.party[index]}])
      };
    case types.DEATH:
      if (index < 0 || index > party.length)
        return state;

      return {...state,
        party: [...party.slice(0, index), ...party.slice(index + 1)],
        cemetery: cemetery.concat([{...party[index], cause: action.cause}])
      };

    // PC
    case types.WITHDRAW:
      if (party.length >= 6 || index < 0 || index > pc.length)
        return state;
      
      return {...state,
        party: party.concat([{...pc[index]}]),
        pc: [...pc.slice(0, index), ...pc.slice(index + 1)]
      };
    
    default:
      return state;
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.NEW_GAME:
      return {...state,
        title: action.title,
        game: action.game,
        name: action.name,
        rules: action.rules,
        location: '',
        log: []
      };
    default:
      const _state = logAction(state, action);
      if (_state == state) return state;

      const {time, type, ..._action} = action;
      _state.log = [...state.log, {
        time: action.time,
        type: action.type,
        entry: _action
      }];
      return _state;
  }
};