"use strict"

define(["jquery", "nuzlog"], function($, nuzlog) {
	var log = [];
	
	function insertLog(type, entry) {
		var time = new Date().toLocaleString();
		time = time.substring(0, time.length - 6) + time.substring(time.length - 3);
		
		var $row = $("<tr/>");
		var $timeCol = $("<td/>", {text: time});		
		var $typeCol = $("<td/>", {text: type});
		var $entryCol = $("<td/>", {text: entry});
		
		$row.append($timeCol);
		$row.append($typeCol);
		$row.append($entryCol);
		$("#journal").append($row);
		$("#journal-container").animate({
			scrollTop: $("#journal").scrollTop() + $row.offset().top
		}, 0);
	};
	
	return {
		init: function() {
			var logLocation = this.logLocation;
			$("#new-location").submit(function() {
				var $location = $("#new-location-input");
				logLocation($location.val().trim());
				$location.val("");
				return false;
			});
			$("#log").submit(function() {
				var message = $("#log-text");
				var entry = message.val();
				insertLog("Log", entry);
				log.push[{type: "Log", entry: entry}];
				message.val("");
				return false;
			});
		},
		
		reset: function() {
			log = [];
			$("#journal").empty();
		},
		
		logLocation: function(location) {
			nuzlog.location = location;
			$("#location-label").text(location);
			insertLog("Location", location);
			log.push({type: "Location", entry: location});
		},
		
		logPokemon: function(pokemon) {
			insertLog("Pokemon", pokemon.export.replace("\n", "<br>"));
			log.push({type: "Pokemon", entry: pokemon});
		}
	};
});