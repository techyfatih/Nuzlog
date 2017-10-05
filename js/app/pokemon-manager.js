define(["jquery", "pokemon/party", "pokemon/pc", "pokemon/cemetery"],
function($, party, pc, cemetery) {
	$tabs = $("#pokemon-tabs");
	$partyTab = $("#party-tab");
	$pcTab = $("#pc-tab");
	$cemeteryTab = $("#cemetery-tab");
	
	$deposit = $("#deposit-button");
	function onDepositClick() {
		
	}
	
	return {
		init: function() {
			party.init();
			$deposit.clik
		},
		
		reset: function() {
			party.clear();
		},
		
		partySize: function() {return party.size();},
		
		addPokemon: function(pokemon) {
			if (pokemon) {
				if (party.size() < 6) {
					party.add(pokemon);
				} else {
					pc.add(pokemon);
				}
				this.focusPokemon(pokemon);
			}
		},
		
		focusPokemon: function(pokemon) {
			if (pokemon && pokemon.slot) {
				if (pokemon.slot["party"] != undefined) {
					$tabs.foundation("_handleTabChange", $partyTab);
					party.focusSlot(pokemon.slot["party"]);
				} else if (pokemon.slot["pc"] != undefined) {
					$tabs.foundation("_handleTabChange", $pcTab);
					pc.focusSlot(pokemon.slot["pc"]);
				} else if (pokemon.slot["cemetery"] != undefined) {
					$tabs.foundation("_handleTabChange", $cemeteryTab);
					cemetery.focusSlot(pokemon.slot["cemetery"]);
				}
			}
		}
	};
});