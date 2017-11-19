import getFullname from './getFullname';
import equals from './equals';

export default (pokemon, change) => {
  if (!pokemon || !change) return '';

  let text = pokemon.nickname ? pokemon.nickname : pokemon.species;

  if (change.level != null) text += '\r\nGrew to Level: ' + change.level;
  if (change.form != null) text += '\r\nChanged Form: ' + change.form;

  if (Array.isArray(change.moves)) {
    text += '\r\nChanged Moves:';
    const _moves = change.moves.filter(move => move);
    for (let i in _moves)
      text += '\r\n-' + _moves[i];
  }

  if (change.item != null) text += '\r\nChanged Item: ' + change.item;

  if (change.species != null) text += '\r\nEvolved to ' + change.species;
  if (change.ability != null) text += '\r\nNew Ability: ' + change.ability;

  if (change.nickname != null) text += '\r\nChanged Nickname: ' + change.nickname;
  if (change.gender != null) text += '\r\nChanged Gender: ' + change.gender;
  if (change.nature != null) text += '\r\nChanged Nature: ' + change.nature;
  if (change.method || change.location != null)
    text += '\r\n' + change.method + ' ' + change.location;
  if (change.shiny != null)
    text += '\r\nChanged Shiny: ' + (change.shiny ? 'Yes' : 'No');

  return text;
}