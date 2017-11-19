import getFullname from './getFullname';

export default pokemon => {
  if (!pokemon) return '';
  let text = pokemon.species;
  if (pokemon.nickname) text += '\r\nNickname: ' + pokemon.nickname;
  if (pokemon.level != null) text += '\r\nLevel: ' + pokemon.level;
  if (pokemon.form) text += '\r\nForm: ' + pokemon.form;
  if (pokemon.gender) text += '\r\nGender: ' + pokemon.gender;
  if (pokemon.ability) text += '\r\nAbility: ' + pokemon.ability;
  if (pokemon.nature) text += '\r\nNature: ' + pokemon.nature;
  if (pokemon.moves) {
    text += '\r\nMoves:'
    for (let i in pokemon.moves)
      text += '\r\n-' + pokemon.moves[i];
  }
  if (pokemon.item) text += '\r\nItem: ' + pokemon.item;
  text += '\r\n' + pokemon.method + ' ' + pokemon.location;
  if (pokemon.shiny) text += '\r\nShiny: ' + (pokemon.shiny ? 'Yes' : 'No');
  if (pokemon.cause) text += '\r\nCause of Death: ' + pokemon.cause;
  return text;
}