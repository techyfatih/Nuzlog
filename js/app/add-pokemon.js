define(["jquery", "data", "location-manager", "catches", "info", "pokemon-manager"],
function($, data, locationManager, catches, info, pokemonManager) {
	var $modal = $("#add-pokemon-modal");
	var $addPokemonForm = $("#add-pokemon");
	
	var $icon = $("#add-pokemon-icon");
	var $species = $("#add-pokemon-species");
	var $nickname = $("#add-pokemon-nickname");
	var $level = $("#add-pokemon-level");
	var $gender = $addPokemonForm.find("input[name=add-pokemon-gender]");
	
	var $sprite = $("add-pokemon-sprite");
	var $form = $("#add-pokemon-form");
	var $shiny = $("#add-pokemon-shiny");
	
	var $nature = $("#add-pokemon-nature");
	var $ability = $("#add-pokemon-ability");
	var $item = $("#add-pokemon-item");
	var $moves = $("#add-pokemon-moves input");
	
	var $method = $("#add-pokemon-method");
	var $location = $("#add-pokemon-location");
	var $validLocation = $("#valid-location");
	
	var $submit = $("#add-pokemon-submit");
	
	function changeIcon(species) {
		for (var i = 0; i < data.pokemon.length; i++) {
			if (species.toLowerCase() == data.pokemon[i].toLowerCase()) {
				$icon.attr("src", "img/icons/" + data.pokemon[i] + ".png");
				return;
			}
		}
		$icon.attr("src", "img/icon.png");
	}
	
	function checkValidLocation(location) {
		if (catches.validLocation(location)) {
			$validLocation.text("No catches at this location yet.");
			$validLocation.css("color", "black");
		} else {
			$validLocation.text("This location has already been reported!");
			$validLocation.css("color", "red");
		}
	}
	
	//Handlers
	function onAddPokemonClick() {
		changeIcon("");
		$species.val("");
		$nickname.val("");
		$level.val(5);
		$gender.prop("checked", false);
		
		//$sprite
		$form.val("")
		$shiny.prop("checked", false);
		
		$nature.prop("selectedIndex", 0);
		$ability.val("");
		$item.val("");
		$moves.val("");
		
		$method.prop("selectedIndex", 0);
		var location = locationManager.location();
		$location.val(location)
		checkValidLocation(location);
		
		var partySize = pokemonManager.partySize();
		$submit.val("Add Pokémon (Party: " + (partySize < 6 ? (6 - partySize) + " Available" : "Full") + ")");
	}
	
	function onModalFocus() {
		$species.focus();
	}
	
	function onSpeciesChange() {
		changeIcon($species.val());
	}
	
	function onLocationChange() {
		checkValidLocation($location.val());
	}
	
	function onSubmit() {
		var pokemon = {};
		
		pokemon.species = $species.val().trim();
		pokemon.nickname = $nickname.val().trim();
		pokemon.fullname = pokemon.nickname ? pokemon.nickname + " (" + pokemon.species + ")" : pokemon.species;
		pokemon.name = pokemon.nickname ? pokemon.nickname : pokemon.species;
		pokemon.level = parseInt($level.val());
		pokemon.form = $form.val().trim();
		pokemon.shiny = $shiny.prop("checked");
		
		if (!info.gendersDisabled())
			pokemon.gender = $gender.filter(":checked").val();
		if (!info.naturesDisabled())
			pokemon.nature = $nature.val();
		if (!info.abilitiesDisabled())
			pokemon.ability = $ability.val().trim();
		
		pokemon.moves = [];
		for (var i = 0; i < $moves.length; i++) {
			var move = $moves[i].value.trim();
			if (move) pokemon.moves.push(move);
		}
		
		pokemon.item = $item.val().trim();
		pokemon.method = $method.val();
		pokemon.location = $location.val().trim();
		
		pokemon.getGenderIcon = function(small) {
			if (pokemon.gender && pokemon.gender != "Genderless")
				return "img/" + pokemon.gender.toLowerCase() + (small ? "-small" : "") + ".png";
			return "";
		};
		pokemon.export = function() {
			var pokemonText = this.species;
			if (this.form)
				pokemonText += "-" + this.form;
			if (this.nickname)
				pokemonText = this.nickname + " (" + pokemonText + ")";
			
			if (this.gender && this.gender != "Genderless")
				pokemonText += " (" + this.gender.substring(0,1) + ")";
			if (this.item)
				pokemonText += " @ " + this.item;
			
			if (this.ability)
				pokemonText += "<br>Ability: " + this.ability;
			
			pokemonText += "<br>Level: " + this.level;
			pokemonText += this.shiny ? "<br>Shiny: Yes" : "";
			
			if (this.nature)
				pokemonText += "<br>" + this.nature + " Nature";
			
			for (var i = 0; i < this.moves.length; i++)
				pokemonText += "<br>- " + this.moves[i];
			
			pokemonText += "<br>" + this.method + " " + this.location;
			return pokemonText;
		};
		
		pokemonManager.addPokemon(pokemon);
		catches.addCatch(pokemon.location, pokemon);
		$modal.foundation("close");
		return false;
	}
	
	return {
		init: function() {
			// Setup comboboxes and nature select
			data.pokemon.sort();
			$species.combobox({
				source: function(request, response) {
					var term = request.term.replace(/[\.\s-]/g, "").replace(/♀/g, "f").replace(/♂/g, "m");
					var matcher = new RegExp( $.ui.autocomplete.escapeRegex(term), "i" );
					response($.grep(data.pokemon, function(species) {
						return matcher.test(species.replace(/[\.\s-]/g, "").replace(/♀/g, "f").replace(/♂/g, "m"));
					}));
				},
				close: onSpeciesChange
			});
			$ability.combobox({
				source: data.abilities
			});
			$moves.combobox({
				source: data.moves
			});
			$nature.html("<option>" + data.natures.join("</option><option>") + "</option>");
			
			// Handlers
			$("#add-pokemon-button").click(onAddPokemonClick);
			$modal.on("open.zf.reveal", onModalFocus);
			$species.on("change keyup paste select", onSpeciesChange);
			$location.on("change keyup paste", onLocationChange);
			$addPokemonForm.submit(onSubmit);
		}
	};
});