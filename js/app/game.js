"use strict"

define(["jquery", "nuzlog", "journal", "pokemon"], function($, nuzlog, journal, pokemon) {
	var title = "";
	var game = "";
	var name = "";
	var gameOpen = false;
	
	function disableProperties(disableGenders, disableNatures, disableAbilities) {
		var disabled = [];
		if (disableGenders) disabled.push("Genders");
		if (disableNatures) disabled.push("Natures");
		if (disableAbilities) disabled.push("Abilities");
		
		if (disabled.length > 0)
			$("#disabledLabel").text("Disabled: " + disabled.join(", "));
		else $("#disabledLabel").text("All Enabled");
		
		$("#addPokemonGender").prop("disabled", disableGenders);
		$("#addPokemonNature").prop("disabled", disableNatures);
		$("#addPokemonAbility, #evolveNewAbility").prop("disabled", disableAbilities);
	}
	
	function initNewGame() {
		$("#newGameButton").click(function() {
			$("#newGame input[type=text]").val("");
			$("#newGame input[type=checkbox]").prop("checked", false);
		});
		$("#newGame").submit(function() {
			var confirmNewGame = true;
			if (gameOpen)
				confirmNewGame = confirm("Are you sure you want to start a new game? All unsaved changes will be lost.");
			
			if (confirmNewGame) {
				title = $("#title").val().trim();
				game = $("#game").val().trim();
				name = $("#name").val().trim();
				nuzlog.location = $("#location").val().trim();
				
				nuzlog.disableGenders = $("#disableGenders").prop("checked");
				nuzlog.disableNatures = $("#disableNatures").prop("checked");
				nuzlog.disableAbilities = $("#disableAbilities").prop("checked");
				disableProperties(nuzlog.disableGenders, nuzlog.disableNatures, nuzlog.disableAbilities);
				
				nuzlog.party = [];
				nuzlog.pc = [];
				nuzlog.cemetery = [];
				
				$("#cover").remove();
				$("#titleLabel").text(title);
				$("#gameLabel").text(game);
				$("#nameLabel").text(name);
				$("#currentLocation").text(nuzlog.location);
				journal.reset();
				
				gameOpen = true;
				$("#newGamePopup").foundation("close");
			}
			return false;
		});
	}
		
	function initSaveLoadGame() {
		$("#saveLoadGameButton").click(function() {
			var save = "";
			if (gameOpen) {
				save = nuzlog.title;
				save += "\n" + nuzlog.game;
				save += "\n" + nuzlog.name;
				save += "\n";
			}
			$("#saveGame").val(save);
		});
		$("#saveFileButton").click(function() {
		});
		$("#uploadFileButton").click(function() {
			
		});
		$("#loadFile").click(function() {
		});
		$("#loadGame").submit(function() {
			
		});
	}
	
	return {
		init: function() {
			initNewGame();
			initSaveLoadGame();
			journal.init();
			pokemon.init();
		}
	}
});