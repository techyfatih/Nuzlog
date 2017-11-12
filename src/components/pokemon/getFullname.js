export default pokemon => {
  return pokemon ? (
    pokemon.nickname ? pokemon.nickname + ' (' + pokemon.species + ')'
      : pokemon.species
  ) : '';
}