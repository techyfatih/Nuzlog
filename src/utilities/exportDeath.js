import getFullname from './getFullname';

export default (pokemon, cause) => {
  if (!pokemon) return '';
  let text = 'R.I.P. ' + getFullname(pokemon);
  text += ' (Cause of Death: ' + cause + ')';
  return text;
}