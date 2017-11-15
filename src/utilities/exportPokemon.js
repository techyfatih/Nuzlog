import getFullname from './getFullname';

export default pokemon => {
  if (!pokemon) return '';
  let text = getFullname(pokemon);
  if (pokemon.gender) text += ' (' + pokemon.gender + ')';
  if (pokemon.item) text += ' @ ' + pokemon.item;
  if (pokemon.ability) text += '\nAbility: ' + pokemon.ability;
  if (pokemon.level != null) text += '\nLevel: ' + pokemon.level;
  if (pokemon.nature) text += pokemon.nature + ' Nature';
  for (let i in pokemon.moves)
    text += '\n-' + pokemon.moves[i];
  text += '\n' + pokemon.method + ' ' + pokemon.location;
  if (pokemon.cause) text += 'Cause of Death: ' + pokemon.cause;
  return text;
}