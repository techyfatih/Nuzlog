"use strict"

define(["jquery"], function($) {
	var log = [];
	
	function insertLog(type, entry) {
		var time = new Date().toLocaleString();
		time = time.substring(0, time.length - 6) + time.substring(time.length - 3);
		
		var $row = $("<div/>", {class: "row"});
		var $timeCol = $("<div/>", {class: "small-3 columns", text: time});		
		var $typeCol = $("<div/>", {class: "small-3 columns", text: type});
		var $entryCol = $("<div/>", {class: "small-6 columns", text: entry});
		
		$row.append($timeCol);
		$row.append($typeCol);
		$row.append($entryCol);
		$("#entries").append($row);
		$("#journal").animate({
			scrollTop: $("#journal").scrollTop() + $row.offset().top
		}, 0);
	};
	
	return {
		init: function() {
			$("#log").submit(function() {
				var message = $("#logText");
				var entry = message.val();
				insertLog("Log", entry);
				log.push[{type: "Log", entry: entry}];
				message.val("");
				return false;
			});
		},
		
		reset: function() {
			log = [];
			$("#entries").empty();
		},
		
		logPokemon: function(pokemon) {
			insertLog("Pokemon", pokemon.export.replace("\n", "<br>"));
			log.push({type: "Pokemon", entry: pokemon});
		}
	};
});