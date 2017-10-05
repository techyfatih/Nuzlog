define(["jquery"],
function($) {
	var gameOpen = false;
	
	var title = "";
	var game = "";
	var name = "";
	
	var gendersDisabled = false;
	var naturesDisabled = false;
	var abilitiesDisabled = false;
	
	var rules = [];
	
	var $cover = $("#cover");
	var $title = $("#title");
	var $game = $("#game");
	var $name = $("#name");
	
	var $disabled = $("#disabled");
	var $genderInputs = $("input.disable-genders");
	var $genderTexts = $("span.disable-genders");
	var $natureInputs = $("input.disable-natures");
	var $natureTexts = $("span.disable-natures");
	var $abilityInputs = $("input.disable-abilities");
	var $abilityTexts = $("span.disable-abilities");
	
	var $rules = $("#rules");
	
	return {
		gameOpen: function() {return gameOpen;},
		
		title: function(newTitle) {
			if (newTitle) {
				title = newTitle;
				$title.text(title);
			}
			return title;
		},
		
		game: function(newGame) {
			if (newGame) {
				game = newGame;
				$game.text(game);
			}
			return game;
		},
		
		name: function(newName) {
			if (newName) {
				name = newName;
				$name.text(name);
			}
			return name;
		},
		
		gendersDisabled: function() {return gendersDisabled;},
		naturesDisabled: function() {return naturesDisabled;},
		abilitiesDisabled: function() {return abilitiesDisabled;},
		
		disableProperties: function(disableGenders, disableNatures, disableAbilities) {
			gendersDisabled = disableGenders;
			naturesDisabled = disableNatures;
			abilitiesDisabled = disableAbilities;
			
			var disabled = [];
			if (gendersDisabled) disabled.push("Genders");
			if (naturesDisabled) disabled.push("Natures");
			if (abilitiesDisabled) disabled.push("Abilities");
			
			if (disabled.length > 0)
				$disabled.text("Disabled: " + disabled.join(", "));
			else $disabled.text("All Enabled");
			
			$genderInputs.prop("disabled", gendersDisabled);
			gendersDisabled ? $genderTexts.hide() : $genderTexts.show();
			$natureInputs.prop("disabled", naturesDisabled);
			naturesDisabled ? $natureTexts.hide() : $natureTexts.show();
			$abilityInputs.prop("disabled", abilitiesDisabled);
			abilitiesDisabled ? $abilityTexts.hide() : $abilityTexts.show();
		},
		
		rules: function(newRules) {
			if (newRules) {
				rules = newRules;
				var $newRules = "";
				for (var i = 0; i < rules.length; i++)
					$newRules += "<li>" + rules[i] + "</li>"
				if ($newRules)
					$rules.html($newRules);
			}
			return rules;
		},
		
		startGame: function() {
			gameOpen = true;
			$cover.remove();
		}
	}
});