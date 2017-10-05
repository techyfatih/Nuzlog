define(["jquery"],
function($) {
	var log = [];
	
	var $journal = $("#journal");
	var $journalContainer = $("#journal-container");
	var $logText = $("#log-text");
	
	function insertLog(type, entry) {
		var time = new Date().toLocaleString();
		time = time.substring(0, time.length - 6) + time.substring(time.length - 3);
		
		$row = $(
			"<tr>" +
				"<td>" + time + "</td>" +
				"<td>" + type + "</td>" +
				"<td>" + entry + "</td>" +
			"</tr>"
		);
		$journal.append($row);
		$journalContainer.animate({
			scrollTop: $journal.scrollTop() + $row.offset().top
		}, 0);
		log[log.length - 1].time = time;
	};
	
	//Handler
	function onLogSubmit() {
		var entry = $logText.val().trim();
		log.push[{type: "Log", entry: entry}];
		insertLog("Log", entry);
		$logText.val("");
		return false;
	}
	
	return {
		init: function() {
			$("#log").submit(onLogSubmit);
		},
		
		reset: function() {
			log = [];
			$journal.empty();
			$logText.val("");
		},
		
		logLocation: function(location) {
			log.push({type: "Location", location: location});
			insertLog("Location", location);
		},
		
		logPokemon: function(pokemon, party) {
			var text = pokemon.name() + (party ? " has been added to the party!" : " was put in the PC.");
			log.push({type: "Pokemon", pokemon: pokemon});
			insertLog("Pokemon", text + "<br>" + pokemon.export());
		},
		
		logFailCatch: function(location) {
			log.push({type: "Catch", location: location});
			insertLog("Catch", "Failed to catch a Pokemon at " + location);
		},
		
		logLevel: function(index, pokemon) {
			log.push({type: "Level", index: index, level: pokemon.level});
			insertLog("Level" + index, pokemon.name + " grew to level " + pokemon.level + "!");
		},
		
		logMoves: function(index, pokemon) {
			log.push({type: "Moves", index: index, moves: pokemon.moves});
			insertLog("Moves" + index, pokemon.name + " changed moves:" + "<br>- " + pokemon.moves.join("<br>- "));
		},
		
		logEvolve: function(index, pokemon) {
			log.push({type: "Evolve", index: index, species: pokemon.species, ability: pokemon.ability});
			insertLog("Evolve" + index, pokemon.name() + " evolved into " + pokemon.species + "!<br>Ability: " + pokemon.ability);
		}
	};
});