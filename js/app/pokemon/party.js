define(["jquery", "journal"],
function($, journal) {
	var party = [];
	var index = -1;
	
	var $party = $("#party");
	var $tab = $party.find("li:first-child"); // to clone
	var $partySlots; // for visibility
	
	var $partyIcon = $(".icon", "#party-pokemon");
	var $partyHide = $(".to-hide", "#party-pokemon");
	var $partyName = $(".name", "#party-pokemon");
	var $bigGender = $(".gender-big", "#party-pokemon");
	var $smallGender = $(".gender-small", "#party-pokemon");
	var $partyLevel = $(".level", "#party-pokemon");
	var $partyForm = $(".form", "#party-pokemon");
	var $partyShiny = $(".shiny", "#party-pokemon");
	var $partyNature = $(".nature", "#party-pokemon");
	var $partyAbility = $(".ability", "#party-pokemon");
	var $partyMoves = $(".moves", "#party-pokemon");
	var $partyItem = $(".item", "#party-pokemon");
	var $partyMethod = $(".method", "#party-pokemon");
	var $partyLocation = $(".location", "#party-pokemon");
	var $partyExport = $("#party-export");
	
	var $levelModal = $("#level-modal");
	var $levelForm = $("#level-form");
	var $levelInput = $("#level-input");
	
	var $movesModal = $("#moves-modal");
	var $movesForm = $("#moves-form");
	var $currentMoves = $("#current-moves input");
	var $newMoves = $("#new-moves input");
	
	var $evolveModal = $("#evolve-modal");
	var $evolveForm = $("#evolve-form");
	var $evolveSpecies = $("#evolve-species");
	var $currentAbility = $("#current-ability");
	var $evolveAbility = $("#evolve-ability");
	
	var $withdraw = $("#withdraw-button");
	var $dropdown = $(".dropdown-pane");
	
	function reset() {
		$partyIcon.attr("src", "img/icon.png");
		$partyName.text("No Pokémon");
		$partyHide.css("visibility", "hidden");
	}
	
	function updateSlot(slot, pokemon) {
		var $slot = $partySlots.eq(slot);
		if ($slot.length && pokemon) {
			$slot.find(".slot-icon").attr("src", "img/icon.png");
			$slot.find(".slot-details").css("visibility", "visible");
			$slot.find(".slot-name").text(pokemon.name());
			$slot.find(".slot-gender").attr("src", pokemon.getGenderIcon(true));
			$slot.find(".slot-level").text(pokemon.level);
		}
	}
	
	function updatePokemon(pokemon) {
		$partyName.text(pokemon.fullname());
		$bigGender.attr("src", pokemon.getGenderIcon(false));
		$smallGender.attr("src", pokemon.getGenderIcon(true));
		$partyLevel.text(pokemon.level);
		
		$partyForm.text(pokemon.form ? pokemon.form : "Normal");
		$partyShiny.attr("checked", pokemon.shiny);
		
		$partyNature.text(pokemon.nature);
		$partyAbility.text(pokemon.ability);
		$partyAbility.val(pokemon.ability);
		
		for (var i = 0; i < 4; i++) {
			var move = pokemon.moves[i];
			if (move) {
				$partyMoves[i].innerHTML = move;
				$currentMoves[i].value = move;
			} else {
				$partyMoves[i].innerHTML = "";
				$currentMoves[i].value = "";
			}
		}
		
		$partyItem.text(pokemon.item);
		$partyMethod.text(pokemon.method);
		$partyLocation.text(pokemon.location);
		
		$partyExport.html(pokemon.export());
	}
	
	function partyRemove() {
		if (party.length > 0) {
			var $slot = $partySlots.eq(party.length - 1);
			$slot.find(".slot-icon").attr("src", "img/icon.png");
			$slot.find(".slot-details").css("visibility", "hidden");
			$withdraw.removeClass("disabled");
			return party.pop();
		}
		return null;
	}
	
	//---------Handlers---------//
	
	function onPartyChange() {
		$dropdown.foundation("close");
		
		index = $party.find(".is-active").index();
		var pokemon = party[index];
		if (pokemon) {
			$partyHide.css("visibility", "visible");
			updatePokemon(pokemon);
		} else reset();
	}
	
	function onLevelOpen() {
		$dropdown.foundation("close");
		$levelInput.val(1);
	}
	
	function onLevelSubmit() {
		var pokemon = party[index];
		if (pokemon) {
			pokemon.level += parseInt($levelInput.val());
			updatePokemon(pokemon);
			updateSlot(index, pokemon);
			$levelModal.foundation("close");
			journal.logLevel(index, pokemon);
		}
		return false;
	}
	
	function onMovesOpen() {
		$dropdown.foundation("close");
		$newMoves[0].focus();
		for (var i = 0; i < 4; i++) {
			$newMoves[i].value = $currentMoves[i].value;
		}
	}
	
	function onMovesSubmit() {
		var pokemon = party[index];
		if (pokemon) {
			var moves = [];
			for (var i = 0; i < 4; i++) {
				var move = $newMoves[i].value;
				if (move) moves.push(move);
			}
			pokemon.moves = moves;
			updatePokemon(pokemon);
			
			$movesModal.foundation("close");
			journal.logMoves(index, pokemon);
		}
		return false;
	}
	
	function onEvolveOpen() {
		$dropdown.foundation("close");
		$evolveSpecies.val("");
		$evolveAbility.val($currentAbility.val());
		$evolveSpecies.focus();
	}
	
	function onEvolveSubmit() {
		var pokemon = party[index];
		if (pokemon) {
			pokemon.species = $evolveSpecies.val().trim();
			pokemon.ability = $evolveAbility.val().trim();
			updatePokemon(pokemon);
			updateSlot(index, pokemon);
			$evolveModal.foundation("close");
			journal.logEvolve(index, pokemon);
		}
		return false;
	}
	
	//---------Module---------//
	return {
		init: function() {
			// Populate party
			for (var i = 0; i < 5; i ++)
				$tab.clone(true).appendTo($party)
			$partySlots = $party.find("li");
			
			// Party handlers
			$party.on("collapse.zf.tabs", reset);
			$party.on("change.zf.tabs", onPartyChange);
			
			$levelModal.on("open.zf.reveal", onLevelOpen);
			$levelForm.submit(onLevelSubmit);
			
			$movesModal.on("open.zf.reveal", onMovesOpen);
			$movesForm.submit(onMovesSubmit);
			
			$evolveModal.on("open.zf.reveal", onEvolveOpen);
			$evolveForm.submit(onEvolveSubmit);
		},
		
		clear: function() {
			while (party.length > 0)
				partyRemove();
		},
		
		size: function() {return party.length;},
		
		add: function(pokemon) {
			if (pokemon && party.length < 6) {
				updateSlot(party.length, pokemon);
				pokemon.slot = {party: party.length};
				party.push(pokemon);
				journal.logPokemon(pokemon, true);
			}
			if (party.length >= 6)
				$withdraw.addClass("disabled");
		},
		
		focusSlot: function(slot) {
			var $slot = $partySlots.eq(slot);
			if ($slot.length) {
				$party.foundation("_collapseTab", $slot);
				$party.foundation("_handleTabChange", $slot);
			}
		}
	};
});