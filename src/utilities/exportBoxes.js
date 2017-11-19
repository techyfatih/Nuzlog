import getFullname from './getFullname';

export default (pokemon, party, pc) => {
  if (!Array.isArray(pokemon) || !Array.isArray(party) || !Array.isArray(pc))
    return '';
  
  let text = 'Party:';
  for (let i in party)
    text += '\r\n-' + getFullname(pokemon[party[i]]);

  text += '\r\n\r\nPC:';
  for (let i in pc)
    text += '\r\n-' + getFullname(pokemon[pc[i]]);
  
  return text;
}