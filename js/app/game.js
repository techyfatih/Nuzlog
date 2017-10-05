define(["jquery", "new-game", "location-manager", "journal", "pokemon-manager", "add-pokemon", "catches"],
function($, newGame, locationManager, journal, pokemonManager, addPokemon, catches) {
	return {
		init: function() {
			newGame.init();
			locationManager.init();
			journal.init();
			pokemonManager.init();
			addPokemon.init();
			catches.init();
		}
	}
});