import getFullname from './getFullname';

export default pokemon => {
  if (!pokemon) return '';

  const {species, nickname, level, form, gender, ability, nature, moves, item,
    shiny, method, location, cause} = pokemon;

  const name = nickname ? nickname : species;
  let text = name + ' has joined the team!';

  let fullname = species;
  if (form) fullname += '-' + form;
  if (nickname) fullname = nickname + ' (' + fullname + ')';
  if (gender) fullname += ' (' + gender + ')';
  if (item) fullname += ' @ ' + item;
  text += '\r\n' + fullname;

  if (ability) text += '\r\nAbility: ' + ability;
  if (level != null) text += '\r\nLevel: ' + level;
  if (shiny) text += '\r\nShiny: ' + (shiny ? 'Yes' : 'No');
  if (nature) text += '\r\n' + nature + ' Nature';
  if (Array.isArray(moves)) {
    for (let i in moves)
      text += '\r\n-' + moves[i];
  }
  text += '\r\n' + method + ' ' + location;
  if (cause) text += '\r\nCause of Death: ' + cause;
  return text;
}