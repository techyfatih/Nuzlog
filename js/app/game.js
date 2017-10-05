define(["jquery", "data", "new-game", "location-manager", "journal", "pokemon-manager", "add-pokemon", "catches"],
function($, data, newGame, locationManager, journal, pokemonManager, addPokemon, catches) {
	return {
		init: function() {
			data.pokemon.sort();
			
			newGame.init();
			locationManager.init();
			journal.init();
			pokemonManager.init();
			addPokemon.init();
			catches.init();
		}
	}
});