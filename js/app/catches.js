define(["jquery", "location-manager", "pokemon-manager", "journal"],
function($, locationManager, pokemonManager, journal) {
	var catches = {};
	
	var $catchesModal = $("#catches-modal");
	var $catches = $("#catches");
	
	var $failedCatchForm = $("#failed-catch-form");
	var $failedCatchText = $("#failed-catch-text");
	var $failedCatchLocation = $("#failed-catch-location");
	
	function onModalOpen() {
		$failedCatchLocation.val(locationManager.location());
		onLocationChange();
		$failedCatchLocation.focus();
	}
	
	function onLocationChange() {
		if (catches[$failedCatchLocation.val().trim()])
			$failedCatchText.css("visibility", "visible");
		else $failedCatchText.css("visibility", "hidden");
	}
	
	function onFailedCatchSubmit() {
		var location = $failedCatchLocation.val().trim();
		if (catches[location] == undefined) {
			$catches.append("<tr><td>" + location + "</td><td>Failed</td></tr>");
			catches[location] = "Failed";
			$failedCatchLocation.val("");
			journal.logFailCatch(location);
			$catchsModal.foundation("close");
		}
		return false;
	}
	
	return {
		init: function() {
			$catchesModal.on("open.zf.reveal", onModalOpen);
			$failedCatchLocation.on("input keydown", onLocationChange);
			$failedCatchForm.submit(onFailedCatchSubmit);
		},
		
		validLocation: function(location) {
			return !location || catches[location] == undefined;
		},
		
		addCatch: function(location, pokemon) {
			var $td;
			if (catches[location] == undefined) {
				catches[location] = [pokemon];
				$td = $("<td/>");
				$("<tr><td>" + location + "</td></tr>")
					.append($td)
					.appendTo($catches);
			} else {
				var $rows = $catches.find("tr");
				for (var i = 0; i < $rows.length; i++) {
					var $cols = $rows.eq(i).find("td");
					if ($cols.eq(0).text() == location) {
						$td = $cols.eq(1);
						break;
					}
				}
			}
			var $button = $(
				"<button type=\"button\" class=\"expanded hollow button\" style=\"padding: 5px; margin: 0\">" +
					"<div class=\"media-object\" style=\"margin:0\">" +
						"<div class=\"media-object-section\" style=\"padding-right: 5px\">" +
							"<img src=\"img/icon.png\">" +
						"</div>" +
						"<div class=\"media-object-section align-self-middle\">" +
							"<div class=\"media-object\">" +
								"<div class=\"media-object-section\" style=\"padding-right: 5px\">" + pokemon.name() + "</div>" +
								"<div class=\"media-object-section\"><img src=\"" + pokemon.getGenderIcon(true) + "\"></div>" +
							"</div>" +
						"</div>" +
					"</div>" +
				"</button>")
				.click(function(){
					pokemonManager.focusPokemon(pokemon);
					$catchesModal.foundation("close");
				})
				.appendTo($td);
		}
	};
});