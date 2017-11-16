import getFullname from './getFullname';
import equals from './equals';

export default (pokemon, change) => {
  if (!pokemon || !change) return '';

  const name = pokemon.nickname ? pokemon.nickname : pokemon.species;
  let text = pokemon.index + '\n' + name;
  if (!equals(pokemon.level, change.level))
    text += '\nGrew to Level ' + change.level;
  
  if (!equals(pokemon.form, change.form))
    text += '\nChanged form to ' + change.form;
  
  console.log('moves');
  if (!equals(pokemon.moves, change.moves)) {
    text += '\nMoves:';
    if (Array.isArray(change.moves)) {
      const _moves = change.moves.filter(move => move);
      for (let i in _moves)
        text += '\n-' + _moves[i];
    }
  }

  if (change.item && pokemon.item != change.item)
    text += '\nItem: ' + change.item;

  if (change.species && pokemon.species != change.species)
    text += '\nEvolved to ' + change.species;

  if (change.ability && pokemon.ability != change.ability)
    text += '\nNew Ability: ' + change.ability;

  if (change.nickname && pokemon.nickname != change.nickname)
    text += '\nNickname: ' + change.nickname;

  if (change.method && change.location && 
      pokemon.method != change.method || pokemon.location != change.location)
    text += '\n' + change.method + ' ' + change.location;

  if (change.gender && pokemon.gender != change.gender)
    text += '\nGender: ' + change.gender;

  if (change.shiny && pokemon.shiny != change.shiny)
    text += '\nShiny: ' + (change.shiny ? 'Yes' : 'No');

  if (change.nature && pokemon.nature != change.nature)
    text += '\nNature: ' + change.nature;
  
  return text;
}