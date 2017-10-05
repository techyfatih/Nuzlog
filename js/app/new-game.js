define(["jquery", "info", "location-manager", "journal", "pokemon-manager"],
function($, info, locationManager, journal, pokemonManager) {
	var newRules = [];
	
	var $modal = $("#new-game-modal")
	
	var $newTitle = $("#new-title");
	var $newGame = $("#new-game");
	var $newName = $("#new-name");
	var $initialLocation = $("#initial-location");
	
	var $disableGenders = $("#disable-genders");
	var $disableNatures = $("#disable-natures");
	var $disableAbilities = $("#disable-abilities");
	
	var $newRules = $("#new-rules");
	var $newRule = $("#new-rule");
	
	var $submit = $("#new-game-submit");
	
	//Handlers
	function onNewGameClick() {
		newRules = [];
		
		$newTitle.val("");
		$newGame.val("");
		$newName.val("");
		$initialLocation.val("");
		
		$disableGenders.prop("checked", false);
		$disableNatures.prop("checked", false);
		$disableAbilities.prop("checked", false);
		
		$newRules.empty();
		$newRule.val("");
	}
	
	function onModalFocus() {
		$newTitle.focus();
	}
	
	function onAddRule() {
		var rule = $newRule.val().trim();
		if (rule != "") {
			$newRules.append("<option>" + rule + "</option>");
			$newRule.val("");
			newRules.push(rule);
		}
		return false;
	}
	
	function onRemoveRule() {
		var rulesToRemove = $newRules.find("option:selected");
		for (var i = 0; i < rulesToRemove.length; i++) {
			var $rule = rulesToRemove[i]; // actually this is JS dom object and not jquery but w/e
			newRules.splice($rule.index, 1);
			$rule.remove();
		}
	}
	
	function onStart() {
		$submit.click()
	}
	
	function onSubmit() {
		var confirmNewGame = true;
		if (info.gameOpen())
			confirmNewGame = confirm("Are you sure you want to start a new game? All unsaved changes will be lost.");
		
		if (confirmNewGame) {
			info.title($newTitle.val().trim());
			info.game($newGame.val().trim());
			info.name($newName.val().trim());
			locationManager.location($initialLocation.val().trim());
			info.rules(newRules);
			
			var gendersDisabled = $disableGenders.prop("checked");
			var naturesDisabled = $disableNatures.prop("checked");
			var abilitiesDisabled = $disableAbilities.prop("checked");
			info.disableProperties(gendersDisabled, naturesDisabled, abilitiesDisabled);
			
			locationManager.reset();
			journal.reset();
			pokemonManager.reset();
			
			info.startGame();
			$modal.foundation("close");
		}
		return false;
	}
	
	return {
		init: function() {
			$("#new-game-button").click(onNewGameClick);
			$modal.on("open.zf.reveal", onModalFocus);
			$("#add-rule-form").submit(onAddRule);
			$("#remove-rule-button").click(onRemoveRule);
			$("#start-button").click(onStart);
			$("#new-game-form").submit(onSubmit);
		}
	}
});