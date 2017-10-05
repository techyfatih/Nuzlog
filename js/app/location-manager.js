define(["jquery", "journal"],
function($, journal) {
	var location = "";
	
	var $location = $("#location");
	var $form = $("#new-location-form");
	var $newLocation = $("#new-location");
	
	function setLocation(newLocation) {
		location = newLocation;
		$location.text(location);
		journal.logLocation(location);
	}
	
	// Handler
	function onLocationSubmit() {
		setLocation($newLocation.val().trim());
		$newLocation.val("");
		return false;
	}
	
	return {
		init: function() {
			$form.submit(onLocationSubmit);
		},
		
		location: function(newLocation) {
			if (newLocation != undefined)
				setLocation(newLocation);
			return location;
		},
		
		reset: function() {
			$newLocation.val("");
		}
	}
});