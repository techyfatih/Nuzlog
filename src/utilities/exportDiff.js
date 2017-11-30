import getFullname from './getFullname';
import equals from './equals';

export default (pokemon, change) => {
  if (!pokemon || !change) return '';

  const {level, species, form, moves, item, ability, nickname, gender, nature,
    method, location, shiny} = change;

  const name = pokemon.nickname ? pokemon.nickname : pokemon.species;
  let text = '';

  if (level != null) text = '\r\n' + name + ' grew to Level ' + level + '!';
  if (species != null) text += '\r\n' + name + ' evolved into ' + species + '!';
  if (ability != null) text += '\r\n' + name + '\'s new ability: ' + ability;
  if (form != null) text += '\r\n' + name + ' transformed to ' + form + ' form.';

  if (Array.isArray(moves)) {
    text += '\r\n' + name + '\'s Moves:';
    const _moves = moves.filter(move => move);
    for (let i in _moves)
      text += '\r\n-' + _moves[i];
  }

  if (item != null){
    if (!item) text += '\r\nTook ' + name + '\'s ' + pokemon.item + '.';
    else text += '\r\nGave ' + item + ' to ' + name + '.';
  }

  if (nickname != null) text += '\r\n' + name + '\'s new nickname: ' + nickname;
  if (gender != null) text += '\r\n' + name + '\'s new gender: ' + gender;
  if (nature != null) text += '\r\n' + name + '\'s new nature: ' + nature;
  if (method || location != null)
    text += '\r\n' + name + ' was ' + method.toLowerCase() + ' ' + location;
  if (shiny != null) {
    text += '\r\n' + name + ' is ';
    if (shiny) text += 'now shiny.';
    else text += 'is no longer shiny.';
  }

  return text.substring(2);
}