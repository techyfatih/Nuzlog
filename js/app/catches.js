"use strict"

define(["jquery", "nuzlog", "journal"], function($, nuzlog, journal) {
	var catches = {};
	return {
		init: function() {
			var $input = $("#failed-catch input:text");
			var $em = $("#failed-catch em");
			
			$input.on("change keyup paste", function() {
				if (catches[$input.val().trim()] != undefined) {
					$em.css("visibility", "visible");
				} else {
					$em.css("visibility", "hidden");
				}
			});
			
			$("#failed-catch").submit(function() {
				var location = $input.val().trim();
				if (catches[location] == undefined) {
					$("#catches").append("<tr><td>" + location + "</td><td>Failed</td></tr>");
					catches[location] = "Failed";
					$input.val("");
				}
				return false;
			});
		},
		
		addCatch: function(location, pokemon) {
			var $td;
			if (catches[location] == undefined) {
				catches[location] = [pokemon];
				$td = $("<td/>");
				$("<tr/>")
					.append("<td>" + location + "</td>")
					.append($td)
					.appendTo("#catches");
			} else {
				var $rows = $("#catches tr");
				for (var i = 0; i < $rows.length; i++) {
					var $cols = $rows.eq(i).find("td");
					if ($cols.eq(0).text() == location) {
						$td = $cols.eq(1);
						break;
					}
				}
			}
			var $genderSrc = pokemon.gender && pokemon.gender != "Genderless" ? "src=\"img/" + pokemon.gender.toLowerCase() + "-small.png\"" : "";
			$td.append(
				"<button type=\"button\" class=\"expanded hollow button\" style=\"padding: 5px; margin: 0\">" +
					"<div class=\"media-object\" style=\"margin:0\">" +
						"<div class=\"media-object-section\" style=\"padding-right: 5px\">" +
							"<img src=\"img/icon.png\">" +
						"</div>" +
						"<div class=\"media-object-section align-self-middle\">" +
							"<div class=\"media-object\">" +
								"<div class=\"media-object-section\" style=\"padding-right: 5px\">" + pokemon.name + "</div>" +
								"<div class=\"media-object-section\"><img " + $genderSrc + "></div>" +
							"</div>" +
						"</div>" +
					"</div>" +
				"</button>"
			);
		}
	};
});