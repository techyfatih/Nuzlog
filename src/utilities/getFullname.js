import normalize from './normalize';

export default pokemon => {
  let name = '';
  if (pokemon) {
    name = pokemon.species;
    if (pokemon.form && normalize(pokemon.form) != 'normal')
      name += '-' + pokemon.form;
    if (pokemon.nickname) name = pokemon.nickname + ' (' + name + ')';
  }
  return name;
}