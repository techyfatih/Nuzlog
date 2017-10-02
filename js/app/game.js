"use strict"

define(["jquery", "nuzlog", "journal", "pokemon"], function($, nuzlog, journal, pokemon) {
	var title = "";
	var game = "";
	var name = "";
	var rules = [];
	var gameOpen = false;
	
	function disableProperties(disableGenders, disableNatures, disableAbilities) {
		var disabled = [];
		if (disableGenders) disabled.push("Genders");
		if (disableNatures) disabled.push("Natures");
		if (disableAbilities) disabled.push("Abilities");
		
		if (disabled.length > 0)
			$("#disabled-label").text("Disabled: " + disabled.join(", "));
		else $("#disabled-label").text("All Enabled");
		
		$("input[name=add-pokemon-gender]").prop("disabled", disableGenders);
		$("#add-pokemon-nature").prop("disabled", disableNatures);
		$(".disable-nature").hide();
		$("#add-pokemon-ability, #evolveNewAbility").prop("disabled", disableAbilities);
		$("#disable-nature").hide();
	}
	
	function initNewGame() {
		$("#new-game-button").click(function() {
			$("#new-game-modal input:text").val("");
			$("#new-game-modal input:checkbox").prop("checked", false);
			$("#new-game-modal select").empty();
		});
		$("#start-new-game-button").click(function(){$("#new-game-submit").click()});
		$("#new-game").submit(function() {
			var confirmNewGame = true;
			if (gameOpen)
				confirmNewGame = confirm("Are you sure you want to start a new game? All unsaved changes will be lost.");
			
			if (confirmNewGame) {
				title = $("#title").val().trim();
				game = $("#game").val().trim();
				name = $("#name").val().trim();
				nuzlog.location = $("#location").val().trim();
				rules = $("#rules option").map(function(){return $(this).val()});
				
				nuzlog.disableGenders = $("#disable-genders").prop("checked");
				nuzlog.disableNatures = $("#disable-natures").prop("checked");
				nuzlog.disableAbilities = $("#disable-abilities").prop("checked");
				disableProperties(nuzlog.disableGenders, nuzlog.disableNatures, nuzlog.disableAbilities);
				
				nuzlog.party = [];
				nuzlog.pc = [];
				nuzlog.cemetery = [];
				
				$("#cover").remove();
				$("#title-label").text(title);
				$("#game-label").text(game);
				$("#name-label").text(name);
				$("#location-label").text(nuzlog.location);
				
				var $rules = $("#rules-list");
				$rules.empty();
				if (rules.length > 0) {
					for (var i = 0; i < rules.length; i++) {
						$rules.append($("<li/>", {text: rules[i]}));
					}
				}
				journal.reset();
				
				gameOpen = true;
				$("#new-game-modal").foundation("close");
			}
			return false;
		});
		$("#add-rule").submit(function() {
			var $rule = $("#rule-input");
			var rule = $rule.val().trim();
			if (rule != "")
				$("#rules").append($("<option/>", {text: rule}));
			$rule.val("");
			return false;
		});
		$("#remove-rule-button").click(function() {
			$("#rules option:selected").remove();
		});
	}
		
	function initSaveLoadGame() {
		$("#save-load-game-button").click(function() {
			var save = "";
			if (gameOpen) {
				save = title;
				save += "\n" + game;
				save += "\n" + name;
				save += "\n";
			}
			$("#save-game").val(save);
		});
		$("#save-file-button").click(function() {
		});
		$("#upload-file-button").click(function() {
			
		});
		$("#load-file").click(function() {
		});
		$("#load-game").submit(function() {
			
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