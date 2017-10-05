define(["jquery", "journal", "pokemon/party"],
function($, journal, party) {
	var party = [];
	var pc = [];
	var cemetery = [];
	
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
	
	var $pc = $("#pc");
	var $withdraw = $("#withdraw-button");
	
	var $cemetery = $("#pc");
	
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
	
	function pcRemove() {
		if (pc.length > 0) {
			$pc.find("li:last-child").remove();
			return pc.pop();
		}
		return null;
	}
	
	function cemeteryAdd() {
		if (pokemon) {
			var $pokemon = $tab.clone(true).appendTo($cemetery);
			$pokemon.css("visibility", "visible");
			$pokemon.find(".slot-name").text(pokemon.name);
			$pokemon.find(".slot-gender").attr("src", pokemon.getGenderIcon(true));
			$pokemon.find(".slot-level").text(pokemon.level);
			pokemon.slot = {pc: pc.length};
			pc.push(pokemon);
		}
	}
	
	function cemeteryRemove() {
		if (cemetery.length > 0) {
			$cemetery.find("li:last-child").remove();
			return cemetery.pop();
		}
		return null;
	}
	
	// Handlers
	function resetParty() {
		$partyIcon.attr("src", "img/icon.png");
		$partyName.text("No Pokémon");
		$partyHide.css("visibility", "hidden");
	}
	
	function onPartyChange() {
		$dropdown.foundation("close");
		
		var pokemon = party[$party.find(".is-active").index()];
		if (pokemon != undefined) {
			$partyHide.css("visibility", "visible");
			$partyName.text(pokemon.fullname());
			$partyGender.attr("src", pokemon.getGenderIcon(false));
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
		} else resetParty();
	}
	
	return {
		init: function() {
			// Populate party
			for (var i = 0; i < 5; i ++)
				$tab.clone(true).appendTo($party)
			$partySlots = $party.find("a");
			
			// Party handlers
			$party.on("collapse.zf.tabs", resetParty);
			$party.on("change.zf.tabs", onPartyChange);
		},
		
		reset: function() {
			while (party.length > 0)
				partyRemove();
			while (pc.length > 0)
				pcRemove();
			while (cemetery.length > 0)
				cemeteryRemove();
		},
		
		partySize: function() {
			return party.length;
		},
		
		addPokemon: function(pokemon) {
			if (pokemon) {
				var $slot;
				if (party.length < 6) {
					$slot = $partySlots.eq(party.length);
					pokemon.slot = {party: party.length};
					party.push(pokemon);
					journal.logPokemon(pokemon, true);
				} else {
					$slot = $tab.clone(true).appendTo($pc);
					pokemon.slot = {pc: pc.length};
					pc.push(pokemon);
					journal.logPokemon(pokemon, false);
				}
				$slot.find(".slot-icon").attr("src", "img/icon.png");
				$slot.find(".slot-details").css("visibility", "visible");
				$slot.find(".slot-name").text(pokemon.name());
				$slot.find(".slot-gender").attr("src", pokemon.getGenderIcon(true));
				$slot.find(".slot-level").text(pokemon.level);
			}
			if (party.length >= 6)
				$withdraw.addClass("disabled");
		}
	};
});