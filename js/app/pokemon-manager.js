define(["jquery", "journal", "pokemon/party"],
function($, journal, party) {
	return {
		init: function() {
			party.init();
		},
		
		reset: function() {
			party.clear();
		},
		
		partySize: function() {return party.size();},
		
		addPokemon: function(pokemon) {
			if (pokemon) {
				if (party.size() < 6) {
					party.add(pokemon);
				} else {
					pc.add(pokemon);
					journal.logPokemon(pokemon, false);
				}
			}
		}
	};
});