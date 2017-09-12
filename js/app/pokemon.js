"use strict"

define(["jquery", "nuzlog", "journal"], function($, nuzlog, journal) {
	function updateParty() {
		var partySlotName = $(".partySlotName");
		var partySlotLv = $(".partySlotLv");
		for (var i = 0; i < nuzlog.party.length && i < 6; i++) {
			var pokemon = nuzlog.party[i];
			//$("#party-tabs img").eq(i).attr("src", getPokemonIcon(pokemon.name));
			partySlotName.eq(i).text(pokemon.fullname);
			partySlotLv.eq(i).css("visibility", "visible").text("Lv " + pokemon.level);
		}
		for (i; i < 6; i++) {
			partySlotName.eq(i).text("No Pokémon");
			partySlotLv.eq(i).css("visibility", "hidden");
		}
	};
	
	function updatePC() {
		var list = $("#pcList");
		list.empty();
		list.prop("disabled", true);
		var withdrawButton = $("#withdrawButton");
		withdrawButton.addClass("disabled");
		for (var i = 0; i < nuzlog.pc.length; i++) {
			var pokemon = nuzlog.pc[i];
			list.append("<option>" + pokemon.fullname + "</option>");
			list.prop("disabled", false);
			if (nuzlog.party.length < 6)
				withdrawButton.removeClass("disabled");
		}
		
		var list = $("#pcList").append("<option>" + poke.fullname + "</option>");
		if (pc.length >= 1) {
			list.prop('disabled', false);
			if (party.length < 6)
				$("#withdrawButton").removeClass("disabled");
		}
	};
	
	return {
		init: function() {
			$("#addPokemonButton").click(function() {
				$("#addPokemonLocation").val(nuzlog.location);
			});
			$("#addPokemon").submit(function() {
				var pokemon = {};
				pokemon.species = $("#addPokemonSpecies").val().trim();
				pokemon.nickname = $("#addPokemonNickname").val().trim();
				pokemon.fullname = pokemon.species;
				if (pokemon.nickname != "")
					pokemon.fullname = pokemon.nickname + " (" + pokemon.species + ")";
				pokemon.level = $("#addPokemonLevel").val();
				if (!nuzlog.disableGenders)
					pokemon.gender = $("#addPokemonGender").val().substring(0,1);
				if (!nuzlog.disableNatures)
					pokemon.nature = $("#addPokemonNature").val();
				if (!nuzlog.disableAbilities)
					pokemon.ability = $("#addPokemonAbility").val();
				pokemon.moves = [];
				$("#addPokemonMoves input").each(function() {
					var move = $(this).val().trim();
					if (move != "")
						pokemon.moves.push(move);
				});
				pokemon.item = $("#addPokemonItem").val().trim();
				pokemon.method = $("#addPokemonMethod").val();
				pokemon.location = $("#addPokemonLocation").val().trim();
				pokemon.form = $("#addPokemonForm").val().trim();
				pokemon.shiny = $("#addPokemonShiny").prop("checked");
				
				pokemon.export = function() {
					var pokemonText = this.fullname;
					if (this.gender != "")
						pokemonText += " (" + this.gender + ")";
					if (this.ability != "")
						pokemonText += "\nAbility: " + this.ability;
					pokemonText += "\nLevel: " + this.level;
					if (this.nature != "")
						pokemonText += "\n" + this.nature + " Nature";
					for (var i = 0; i < this.moves.length; i++)
						pokemonText += "\n- " + this.moves[i];
					pokemonText += "\n" + this.method + this.location;
					return pokemonText;
				};
				if (nuzlog.party < 6) {
					nuzlog.party.push(pokemon);
					updateParty();
				} else {
					nuzlog.pc.push(pokemon);
					updatePC();
				}
				return false;
			});
		}
	};
});