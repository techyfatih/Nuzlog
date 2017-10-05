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
	var $partyGender = $(".gender", "#party-pokemon");
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
	
	var $withdraw = $("#withdraw-button");
	var $dropdown = $(".dropdown-pane");
	
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
	function reset() {
		$partyIcon.attr("src", "img/icon.png");
		$partyName.text("No Pokémon");
		$partyHide.css("visibility", "hidden");
	}
	
	function onPartyChange() {
		$dropdown.foundation("close");
		
		index = $party.find(".is-active").index();
		var pokemon = party[index];
		if (pokemon) {
			$partyHide.css("visibility", "visible");
			$partyName.text(pokemon.fullname);
			$partyGender.attr("src", pokemon.getGenderIcon(true));
			$partyLevel.text(pokemon.level);
			$partyForm.text(pokemon.form ? pokemon.form : "Normal");
			$partyShiny.attr("checked", pokemon.shiny);
			$partyNature.text(pokemon.nature);
			$partyAbility.text(pokemon.ability);
			for (var i = 0; i < 4; i++) {
				if (pokemon.moves[i])
					$partyMoves[i].innerHTML = pokemon.moves[i];
				else $partyMoves[i].innerHTML = "";
			}
			$partyItem.text(pokemon.item);
			$partyMethod.text(pokemon.method);
			$partyLocation.text(pokemon.location);
			$partyExport.html(pokemon.export());
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
			$partyLevel.text(pokemon.level);
			$levelModal.foundation("close");
			journal.logLevel(index, pokemon);
		}
		return false;
	}
	
	//---------Module---------//
	return {
		init: function() {
			// Populate party
			for (var i = 0; i < 5; i ++)
				$tab.clone(true).appendTo($party)
			$partySlots = $party.find("a");
			
			// Party handlers
			$party.on("collapse.zf.tabs", reset);
			$party.on("change.zf.tabs", onPartyChange);
			$levelModal.on("open.zf.reveal", onLevelOpen);
			$levelForm.submit(onLevelSubmit);
		},
		
		clear: function() {
			while (party.length > 0)
				partyRemove();
		},
		
		size: function() {return party.length;},
		
		add: function(pokemon) {
			if (pokemon && party.length < 6) {
				var $slot = $partySlots.eq(party.length);
				pokemon.slot = {party: party.length};
				party.push(pokemon);
				$slot.find(".slot-icon").attr("src", "img/icon.png");
				$slot.find(".slot-details").css("visibility", "visible");
				$slot.find(".slot-name").text(pokemon.name);
				$slot.find(".slot-gender").attr("src", pokemon.getGenderIcon(true));
				$slot.find(".slot-level").text(pokemon.level);
				journal.logPokemon(pokemon, true);
			}
			if (party.length >= 6)
				$withdraw.addClass("disabled");
		}
	};
});