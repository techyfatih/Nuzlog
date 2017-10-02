"use strict"

define(["jquery", "data", "nuzlog", "journal", "catches"], function($, data, nuzlog, journal, catches) {
	function addToParty(pokemon) {
		if (nuzlog.party.length < 6) {
			nuzlog.party.push(pokemon);
			var $slot = $("#party a").eq(nuzlog.party.length - 1);
			$slot.css("visibility", "visible");
			$slot.find(".slot-name").text(pokemon.name);
			if (pokemon.gender && pokemon.gender != "Genderless")
				$slot.find(".slot-gender").attr("src", "img/" + pokemon.gender.toLowerCase() + "-small.png");
			$slot.find(".slot-level").text(pokemon.level);
		}
		if (nuzlog.party.length >= 6)
			$("#withdraw-button").addClass("disabled");
	}
	
	function removeFromParty() {
		if (nuzlog.party.length > 0) {
			$("#party a").eq(nuzlog.party.length - 1).css("visibility", "hidden");
			$("#withdraw-button").removeClass("disabled");
			return nuzlog.party.pop();
		}
		return null;
	}
	
	function addToPC(pokemon) {
		nuzlog.pc.push(pokemon);
		$("#party li:first-child").clone(true).appendTo("#pc")
	}
	
	function withdrawFromPC() {
		if (nuzlog.pc.length > 0) {
			
		}
	}
	
	return {
		init: function() {
			catches.init();
			
			// Populate party
			for (var i = 0; i < 5; i ++)
				$("#party li:first-child").clone(true).appendTo("#party")
			
			// Setup comboboxes and stuff
			data.pokemon.sort();
			$("#add-pokemon-species").combobox({
				source: data.pokemon
			});
			var natures = "";
			for (var i = 0; i < data.natures.length; i++)
				natures += "<option>" + data.natures[i] + "</option>";
			$("#add-pokemon-nature").append(natures);
			
			// Handlers
			$("#add-pokemon-button").click(function() {
				$("#add-pokemon input:text").val("");
				$("#add-pokemon").find("input:checkbox, input:radio").prop("checked", false);
				$("#add-pokemon-level").val(5);
				$("#add-pokemon option:eq(0)").prop("selected", true);
				$("#add-pokemon-location").val(nuzlog.location);
				$("#add-pokemon input:submit").val("Add Pokémon (Party: " + (nuzlog.party.length < 6 ? "Available" : "Full") + ")");
			});
			$("#add-pokemon-modal").on("open.zf.reveal", function() {
				$("#add-pokemon-species").focus();
			});
			$("#add-pokemon").submit(function() {
				var pokemon = {};
				
				pokemon.species = $("#add-pokemon-species").val().trim();
				pokemon.nickname = $("#add-pokemon-nickname").val().trim();
				pokemon.name = pokemon.nickname ? pokemon.nickname : pokemon.species;
				pokemon.level = $("#add-pokemon-level").val();
				pokemon.form = $("#add-pokemon-form").val().trim();
				pokemon.shiny = $("#add-pokemon-shiny").prop("checked");
				
				if (!nuzlog.disableGenders)
					pokemon.gender = $("input[name=add-pokemon-gender]:checked").val();
				if (!nuzlog.disableNatures)
					pokemon.nature = $("#add-pokemon-nature").val();
				if (!nuzlog.disableAbilities)
					pokemon.ability = $("#add-pokemon-ability").val();
				
				pokemon.moves = [];
				$("#add-pokemon-moves input").each(function() {
					var move = $(this).val().trim();
					if (move != "")
						pokemon.moves.push(move);
				});
				
				pokemon.item = $("#add-pokemon-item").val().trim();
				pokemon.method = $("#add-pokemon-method").val();
				pokemon.location = $("#add-pokemon-location").val().trim();
				
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
						pokemonText += "\nAbility: " + this.ability;
					
					pokemonText += "\nLevel: " + this.level;
					
					if (this.shiny)
						pokemonText += "Shiny: " + this.shiny ? "Yes" : "No";
					
					if (this.nature)
						pokemonText += "\n" + this.nature + " Nature";
					
					for (var i = 0; i < this.moves.length; i++)
						pokemonText += "\n- " + this.moves[i];
					
					pokemonText += "\n" + this.method + this.location;
					return pokemonText;
				};
				if (nuzlog.party.length < 6) {
					addToParty(pokemon);
				} else {
					addToPC(pokemon);
				}
				catches.addCatch(pokemon.location, pokemon);
				$("#add-pokemon-modal").foundation("close");
				return false;
			});
		}
	};
});