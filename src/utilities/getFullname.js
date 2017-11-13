export default pokemon => {
  let name = '';
  if (pokemon) {
    name = pokemon.species;
    if (pokemon.form) name += '-' + pokemon.form;
    if (pokemon.nickname) name = pokemon.nickname + ' (' + name + ')';
  }
  return name;
}