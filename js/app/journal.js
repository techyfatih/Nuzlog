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
	};
	
	//Handler
	function onLogSubmit() {
		var entry = $logText.val().trim();
		insertLog("Log", entry);
		log.push[{type: "Log", entry: entry}];
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
			insertLog("Location", location);
			log.push({type: "Location", entry: location});
		},
		
		logPokemon: function(pokemon, party) {
			var text = pokemon.name + (party ? " has been added to the party!" : " was put in the PC.");
			insertLog("Pokemon", text + "<br>" + pokemon.export());
			log.push({type: "Pokemon", entry: pokemon});
		},
		
		logLevel: function(index, pokemon) {
			insertLog("Level" + index, pokemon.name + " grew to level " + pokemon.level + "!");
			log.push({type: "Level", index: index, entry: pokemon.level});
		}
	};
});