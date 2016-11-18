(function () {
	"use strict";
	
	//Global variables
	var currentGame = false;
	var party = [];
	var partyIndex = 0;
	var pc = [];
	var cemetery = [];
	
	//Run when doc is ready
	$(document).ready(function() {
		//Event handlers
		$("#newGameButton").click(createNewGame);
		$("#newGame").submit(newGame);
		
		$("#saveLoadGameButton").click(createSaveLoadGame);
		$("#loadGame").submit(loadGame);
		
		$("#log").submit(logMessage);
		//$("#deleteLast").click(deleteLastEntry);
		
		$("#addPokemonButton").click(clearAddPokemonForm);
		$("#addPokemonName").change(addPokemonChanged);
		$("#addPokemon").submit(addPokemon);
		
		$("#party-tabs").on("change.zf.tabs", partyChange);
		
		$("#levelUpButton").click(levelUp);
		$("#changeMovesButton").click(changeMovesPopup);
		$("#changeMoves").submit(changeMoves);
		$("#itemButton").click(itemPopup);
		$("#changeItem").submit(changeItem);
		$("#evolveButton").click(evolvePopup);
		$("#evolve").submit(evolve);
		$("#depositButton").click(deposit);
		$("#deathButton").click(deathPopup);
		$("#death").submit(death);
		
		$("#withdrawButton").click(withdraw);
		$("#pcList").change(pcChange);
		$("#cemeteryList").change(cemeteryChange);
		
		//Populate data lists
		//combobox($("#game"), data.games, true, "Pokemon Ruby");
		//$("#game").combobox({data: data.games, required: true, placeholder: "Pokemon Ruby"});
		//combobox($("#pokemon"), data.pokemon, true, "Bulbasaur");
		//$("#pokemon").combobox({data: data.pokemon, required: true, placeholder: "Bulbasaur"});
		//$("#pokemon").scombobox("change", addPokemonChanged);
		//combobox($("#ability"), data.abilities, true, "Overgrow");
		//$("#ability").combobox({data: data.abilities, required: true, placeholder: "Overgrow"});
		//combobox($("#moves select"), data.moves, false, "");
		//$("#requiredMove .scombobox-display").attr("required", "");
		
		$(document).foundation(); //When everything is ready, load Foundation plugins
	});
	
	//General functions

	function escapeHtml(text) {
		var map = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": '&#039;'
		};

		return text.replace(/[&<>"']/g, function (m) { return map[m]; }).trim();
	}

	/*function combobox(jquery, options, required, placeholder) {
		var data = [];
		for (var i = 0; i < options.length; i++) {
			data.push({value: options[i], text: options[i]});
		}
		jquery.scombobox({data: data, empty: true, required: required, sort: false, fullMatch: true, invalidAsValue: true, maxHeight: "350%", placeholder: placeholder});
	}*/
	
	/*function getValue(jqstring) {
		var jquery = $(jqstring);
		if (jquery.hasClass("scombobox")) {
			return escapeHtml(jquery.scombobox("val"));
		} else {
			return escapeHtml(jquery.val()).trim();
		}
	}*/
	
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
		$("#addPokemonAbility, #evolveAbility").prop("disabled", disableAbilities);
	}

	
	//New game functions

	function createNewGame() {
		$("#title").val("");
		$("#game").val("");
		$("#name").val("");
	}
	
	function newGame() {
		var title = $("#title").val().trim();
		var game = $("#game").val().trim();
		var name = $("#name").val().trim();
		
		var confirmNewGame = true;
		if (currentGame)
			confirmNewGame = confirm("Are you sure you want to create a new game? All unsaved changes will be lost.");
		
		if (confirmNewGame) {
			$("#titleLabel").text(title);
			$("#gameLabel").text(game);
			$("#nameLabel").text(name);
			disableProperties($("#disableGenders").prop('checked'), $("#disableNatures").prop('checked'), $("#disableAbilities").prop('checked'));
			var info = $("#info");
			if (info.innerWidth() != info.prop("scrollWidth"))
				$("#journal").height(359);
			else $("#journal").height(376);
			
			party = [];
			pc = [];
			cemetery = [];
			
			deselectParty();
			for (var i = 0; i < 6; i++) resetPartySlot(i);
			$("#pcList, #cemeteryList").empty().prop("disabled", true).append($("<option>")).trigger("change");
			$("#withdrawButton").addClass("disabled");
			
			$("#entries").empty();
			$("#cover").remove();
			$("#newGamePopup").foundation("close");
			currentGame = true;
			return false;
		}
	}
	
	//Saving and loading functions
	
	function createSaveLoadGame() {
		var save = "";
		if (currentGame) {
			save = $("#titleLabel").text();
			save += "\n" + $("#gameLabel").text();
			save += "\n" + $("#nameLabel").text();
			var disabled = $("#disabledLabel").text();
			if (disabled.startsWith("Disabled: ")) {
				save += "\n"  + disabled;
			}
			save += "\n";
			$("#entries").children().each(function(i) {
				save += "\n";
				var log = $(this).children();
				var time = "[" + log.eq(0).text() + "]";
				var type = log.eq(1).text();
				var entry = log.eq(2).html();
				if (type == "Pokemon") entry = entry.replace(/<br>/g, "\n");
				else entry = entry.replace(/<br>/g, "\t");
				save += time + " " + type + ": " + entry;
			});
		}
		$("#saveGame").val(save);
	}
	
	function loadGame() {
		var confirmLoadGame = true;
		if (currentGame) confirmLoadGame = confirm("Are you sure you want to load another game? All unsaved changes will be lost.");
		
		if (confirmLoadGame) {
			var lines = $("#saveGame").val().split("\n");
			try {
				// Title, game, trainer name, and disabled properties
				var title = lines[0];
				if (title == undefined || title == "") throw "missing title name on line 1";
				title.trim();
				var game = lines[1];
				if (game == undefined || game == "") throw "missing game name on line 2";
				game = game.trim();
				var name = lines[2];
				if (name == undefined || name == "") throw "missing trainer name on line 3";
				name = name.trim();
				var disabled = lines[3];
				var disableGenders = false;
				var disableNatures = false;
				var disableAbilities = false;
				var i = 5;
				if (disabled != undefined) {
					disabled = disabled.toLowerCase().trim();
					if (disabled.startsWith("disabled:")) {
						disabled = disabled.substring(disabled.indexOf(":"));
						var disabledProperties = disabled.split(",");
						for (var j = 0; j < disabledProperties.length; j++) {
							var property = disabledProperties[j].trim().toLowerCase();
							if (property == "genders") disableGenders = true;
							else if (property == "natures") disableNatures = true;
							else if (property == "abilities") disableAbilities = true;
						}
						i = 6;
					} else if (disabled != "") throw "cannot parse disabled features at line 4";
				}
				
				// Parse load file into journal array
				var journal = [];
				var pokemon = 0;
				var pokemonTime = "";
				var pokemonEntry = "";
				var poke = {};
				var tempParty = [];
				var tempPC = [];
				var tempCemetery = [];
				for (i; i <= lines.length; i++) {
					var log = lines[i - 1];
					if (log.length == 0) continue;
					if (!pokemon) {
						var time = log.substring(0, log.indexOf("]")).trim();
						if (time == "" || !(time.startsWith("["))) throw "improper log timestamp format at line " + i;
						var type = log.substring(log.indexOf("]") + 1, log.indexOf(":", 16)).trim();
						if (type == "") throw "improper log type format at line " + i;
						var entry = log.substring(log.indexOf(":", 16) + 1).trim();
						if (entry == "") throw "improper log entry format at line " + i;
						if (type == "Pokemon") {
							pokemon = 1;
							pokemonTime = time.substring(1);
							pokemonEntry = entry;
							poke = {};
						} else {
							var index = type[type.indexOf("[") + 1];
							if (type.match(/Level\[\d\]/g)) {
								if (index >= tempParty.length) throw "invalid index for party at line " + i;
								tempParty[index].level++;
							} else if (type.match(/Move\[\d\]/g)) {
								if (index >= tempParty.length) throw "invalid index for party at line " + i;
								var movesEntry = entry.split("\t");
								var moves = [];
								for (var j = 1; j < movesEntry.length; j++)
									if (movesEntry[j].length > 2) moves.push(movesEntry[j].substring(2));
								if (moves.length == 0) throw "insufficient Pokemon moves at line " + i;
								tempParty[index].moves = moves;
							} else if (type.match(/Item\[\d\]/g)) {
								if (index >= tempParty.length) throw "invalid index for party at line " + i;
								tempParty[index].item = entry.substring(entry.indexOf(". Gave ") + 7, entry.lastIndexOf(" to "));
							} else if (type.match(/Evolve\[\d\]/g)) {
								if (index >= tempParty.length) throw "invalid index for party at line " + i;
								var tempPoke = tempParty[index];
								var exclamation = entry.lastIndexOf("!");
								tempPoke.name = entry.substring(entry.indexOf(" evolved into ") + 14, exclamation);
								tempPoke.fullname = getFullname(tempPoke.name, tempPoke.nickname);
								var ability = entry.substring(exclamation + 15);
								if (ability.length > 0) tempParty[index].ability = ability;
							} else if (type.match(/Deposit\[\d\]/g)) {
								if (index >= tempParty.length) throw "invalid index for party at line " + i;
								tempPC.push(tempParty.splice(index, 1)[0]);
							} else if (type.match(/Withdraw\[\d\]/g)) {
								if (index >= tempPC.length) throw "invalid index for PC at line " + i;
								tempParty.push(tempPC.splice(index, 1)[0]);
							} else if (type.match(/Death\[\d\]/g)) {
								if (index >= tempParty.length) throw "invalid index for party at line " + i;
								var poke = tempParty.splice(index, 1)[0];
								poke.death = entry.substring(entry.indexOf(". Cause of death: ") + 18);
								tempCemetery.push(poke);
							}
							journal.push([time, type, entry]);
						}
					} else {
						pokemonEntry += "<br>" + log;
						if (pokemon == 1) {
							var atIndex = log.indexOf("@");
							if (atIndex != log.lastIndexOf("@")) throw "additional @ symbols in Pokemon name and/or item at line " + i;
							
							var fullname = log;
							var item = "";
							if (atIndex != -1) {
								fullname = log.substring(0, atIndex - 1);
								item = log.substring(atIndex + 1);
							}
							
							var gender = "N/A";
							if (!disableGenders) {
								gender = fullname.substring(fullname.lastIndexOf("(") + 1, fullname.lastIndexOf(")"));
								if (gender.length == 0) throw "invalid Pokemon gender at line " + i;
								switch (gender) {
									case "M": gender = "Male"; break;
									case "F": gender = "Female"; break;
									case "G": gender = "Genderless"; break;
									default: throw "invalid Pokemon gender at line " + i;
								}
								fullname = fullname.substring(0, fullname.length - 4);
							}
							
							if (fullname.length == 0) throw "invalid Pokemon name at line " + i;
							var nameIndex = fullname.lastIndexOf(" (");
							var species = fullname.substring(nameIndex + 2, fullname.lastIndexOf(")"));
							var nickname = fullname;
							if (species.length == 0) species = fullname;
							else nickname = fullname.substring(0, nameIndex);
							
							poke.name = species;
							poke.nickname = nickname;
							poke.fullname = fullname;
							poke.gender = gender;
							poke.item = item;
						} else if (pokemon == 2) {
							var ability = "N/A";
							if (!disableAbilities) {
								ability = log.substring(9);
								if (ability.length == 0) throw "invalid Pokemon ability at line " + i;
								poke.ability = ability;
							} else pokemon++;
						}
						if (pokemon == 3) {
							var level = log.substring(7);
							if (level.length == 0) throw "invalid Pokemon level at line " + i;
							poke.level = level;
						} else if (pokemon == 4) {
							var nature = "N/A";
							if (!disableNatures) {
								nature = log.substring(0, log.lastIndexOf(" Nature"));
								if (nature.length == 0) throw "invalid Pokemon nature at line " + i;
								poke.nature = nature;
							} else pokemon++;
						}
						if (pokemon >= 5) {
							if (log.startsWith("- ")) {
								var move = log.substring(2);
								if (move.length > 0) {
									if (poke.moves == undefined) poke.moves = [];
									poke.moves.push(move);
								}
							} else {
								if (poke.moves.length == 0) throw "no Pokemon moves listed at line " + i;
								if (log.startsWith("Received at: ") || log.startsWith("Caught at: ")) {
									poke.location = log;
									pokemon = -1;
									if (tempParty.length < 6) tempParty.push(poke);
									else tempPC.push(poke);
									journal.push([pokemonTime, "Pokemon", pokemonEntry]);
								} else throw "no location listed at line " + i;
							}
						}
						pokemon++;
					}
				}
				
				// Apply changes
				$("#titleLabel").text(title);
				$("#gameLabel").text(game);
				$("#nameLabel").text(name);
				disableProperties(disableGenders, disableNatures, disableAbilities);
				if (info.innerWidth() != info.prop("scrollWidth"))
					$("#journal").height(359);
				else $("#journal").height(376);
				
				$("#entries").empty();
				for (var i = 0; i < journal.length; i++) {
					var log = journal[i];
					insertLog(log[0], log[1], log[2]);
				}
				
				party = tempParty;
				deselectParty();
				for (var i = 0; i < 6; i++) {
					if (i < party.length) updateParty(i, party[i]);
					else resetPartySlot(i);
				}
				
				pc = tempPC;
				var pcList = $("#pcList").empty().append($("<option>")).trigger("change");
				for (var i = 0; i < pc.length; i++) pcList.append("<option>" + pc[i].fullname + "</option>");
				var withdraw = $("#withdrawButton").addClass("disabled");
				if (pc.length > 0) {
					pcList.prop("disabled", false);
					if (party.length < 6) withdraw.removeClass("disabled");
				} else pcList.prop("disabled", true);
				
				cemetery = tempCemetery;
				var cemeteryList = $("#cemeteryList").empty().append($("<option>")).trigger("change");
				for (var i = 0; i < cemetery.length; i++) cemeteryList.append("<option>" + cemetery[i].fullname + "</option>");
				cemeteryList.prop("disabled", cemetery.length == 0);
				
				currentGame = true;
				$("#cover").remove();
				$("#saveLoadGamePopup").foundation("close");	
			} catch(err) {
				alert("There was an error in loading the game: " + err);
			}
			return false;
		}
	}
	
	//Journal functions
	
	function logMessage() {
		var message = $("#log input[type=text]");
		if (message.val() == "") alert("Please make sure there is an entry to be logged.");
		else {
			log("Log", escapeHtml(message.val()));
			message.val("");
		}
		return false;
	}
	
	function log(type, entry) {
		var time = new Date().toLocaleString();
		time = time.substring(0, time.length-6) + time.substring(time.length-3);
		insertLog(time, type, entry);
	}
	
	function insertLog(time, type, entry) {
		var $row = $("<div/>", {class: "row"});
		var $timeCol = $("<div/>", {class: "small-3 columns", text: time});		
		var $typeCol = $("<div/>", {class: "small-3 columns", text: type});
		var $entryCol = $("<div/>", {class: "small-6 columns", html: entry});
		
		$row.append($timeCol);
		$row.append($typeCol);
		$row.append($entryCol);
		$("#entries").append($row);
		$("#journal").animate({
			scrollTop: $("#journal").scrollTop() + $row.offset().top
		}, 100);
	}

	/*function deleteLastEntry() {
		if ($("#journal").children().length) {
			if (confirm("Delete last entry?"))
				$("#journal div[class=row]:last-child").remove();
		} else alert("No entries in the journal to delete!");
	}*/
	
	//Add Pokemon functions
	
	function clearAddPokemonForm() {
		$("#addPokemon").find("input[type=text]").val("");
		$("#addPokemon select").prop("selectedIndex", 0);
		$("#addPokemon img").attr("src", "img/question.png");
		$("#level").val(5);
	}
	
	function addPokemonChanged() {
		$("#addPokemon img").attr("src", getPokemonImage($(this).val().trim()));
	}
	
	function getPokemonImage(pokemon) {
		var result = pokemonExists(pokemon);
		if (result == "alola") return "img/alola/" + pokemon.replace(":","").toLowerCase() + ".png"; //I'M LOOKING AT YOU TYPE:NULL
		else if (result) return "http://www.pokestadium.com/sprites/xy/" + pokemon.toLowerCase() + ".gif";
		else return "img/question.png";
	}
	
	function getPokemonIcon(pokemon) {
		var result = pokemonExists(pokemon);
		if (result != "alola" && result) return "http://www.pokestadium.com/assets/img/sprites/misc/icons/" + pokemon.toLowerCase() + ".png";
		else return "img/icon.png";
	}
	
	function pokemonExists(pokemon) {
		for (var i = 0; i < data.pokemon.length; i++) {
			if (pokemon.toLowerCase() == data.pokemon[i].toLowerCase()) {
				if (i > 720) return "alola";
				else return true;
			}
		}
		return false;
	}
	
	function getFullname(name, nickname) {
		if (nickname != name)
			return nickname + " (" + name + ")";
		else return name;
	}
	
	function addPokemon() {
		var pokemon = "";
        
		var name = $("#addPokemonName").val().trim();
		var nickname = $("#addPokemonNickname").val().trim();
		if (nickname == "")
			nickname = name;
        var fullname = getFullname(name, nickname);
        
        pokemon = fullname;

		var gender;
		if ($("#addPokemonGender").is(":enabled")) {
			gender = $("#addPokemonGender").val();
			pokemon += " (" + gender[0] + ")";
		} else gender = "N/A"
			
		var item = $("#addPokemonItem").val().trim();
		if (item != "")
			pokemon += " @ " + item;
		
		var ability;
		if ($("#addPokemonAbility").is(":enabled")) {
			ability = $("#addPokemonAbility").val().trim();
			pokemon += "<br>Ability: " + ability;
		} else ability = "N/A";
		
		var level = $("#addPokemonLevel").val();
		pokemon += "<br>Level: " + level;
		
		var nature;
		if ($("#addPokemonNature").is(":enabled")) {
			nature = $("#addPokemonNature").val();
			pokemon += "<br>" + nature + " Nature";
		} else nature = "N/A";
		
		var moves = [];
		$("#addPokemonMoves input").each(function() {
			var move = $(this).val().trim();
			if (move != "") {
				moves.push(move);
				pokemon += "<br>- " + move;
			}
		});
		
		var loc = $("#addPokemonMethod").val() + " " + $("#addPokemonLocation").val().trim();
		pokemon += "<br>" + loc;
		
		var poke = {};
		poke.name = name;
		poke.nickname = nickname;
		poke.fullname = fullname;
		poke.gender = gender;
		poke.item = item;
		poke.ability = ability;
		poke.level = level;
		poke.nature = nature;
		poke.moves = moves;
		poke.location = loc;
		
		if (party.length < 6) {
			updateParty(party.length, poke);
			party.push(poke);
			pokemon = poke.nickname + " has been added to the party!<br>" + pokemon;
		} else {
			updatePC(poke);
			pokemon = poke.nickname + " was sent to the PC.<br>" + pokemon;
		}
		
		log("Pokemon", pokemon);
		
		$("#addPokemonPopup").foundation("close");
		
		return false;
	}
	
	//Party functions
	
	function updateParty(index, poke) {
		$("#party-tabs img").eq(index).attr("src", getPokemonIcon(poke.name));
		$(".partySlotName").eq(index).text(poke.fullname);
		$(".partySlotLv").eq(index).css("visibility", "visible").text("Lv " + poke.level);
	}
	
	function resetPartySlot(index) {
		$("#party-tabs img").eq(index).attr("src", "img/icon.png");
		$("#party-tabs .partySlotName").eq(index).text("No Pokemon");
		$("#party-tabs .partySlotLv").eq(index).css("visibility", "hidden");
	}
	
	function deselectParty() {
		$("#party-tabs li").removeClass("is-selected");
		$("#party-tabs a").attr("aria-selected", false);
		$("#partyPokemon").text("No Pokemon selected");
		$("#party").css("visibility", "hidden");
	}
	
	function partyChange() {
		partyIndex = $(this).find(".is-active").index();
		if (party[partyIndex] == undefined) {
			$("#partyPokemon").text("No Pokemon selected");
			$("#party").css("visibility", "hidden");
		} else {
			var poke = party[partyIndex];
			$("#party img").attr("src", getPokemonImage(poke.name));
			$("#partyPokemon").text(poke.fullname);
			$("#party .pokeLevel").text(poke.level);
			$("#party .pokeGender").text(poke.gender);
			$("#party .pokeNature").text(poke.nature);
			$("#party .pokeAbility").text(poke.ability);
			var moves = $("#party .pokeMove");
			for (var i = 0; i < poke.moves.length; i++) {
				moves.eq(i).text(poke.moves[i]);
			}
			$("#party .pokeItem").text(poke.item);
			$("#party .pokeLocation").text(poke.location);
			$("#party").css("visibility", "visible");
		}
	}
	
	function levelUp() {
		var poke = party[partyIndex];
		poke.level++;
		$("#party .pokeLevel").text(poke.level);
		$(".partySlotLv").eq(partyIndex).text("Lv " + poke.level);
		log("Level[" + partyIndex + "]", poke.nickname + " grew to level " + poke.level + "!");
	}
	
	function changeMovesPopup() {
		var poke = party[partyIndex];
		$("#changeMovesPokemon").text(poke.nickname);
		var moves = $("#changeMoves input[type=text]");
		var i;
		for (i = 0; i < poke.moves.length; i++)
			moves.eq(i).val(poke.moves[i]);
		for (i; i < 4; i++)
			moves.eq(i).val("");
	}
	
	function changeMoves() {
		var poke = party[partyIndex];
		var moves = [];
		$("#changeMoves input[type=text]").each(function() {
			var move = $(this).val().trim();
			if (move != "")
				moves.push(move);
		});
		
		if (moves.length == poke.moves.length) {
			var equal = true;
			for (var i = 0; i < moves.length; i++) {
				if (moves[i] != poke.moves[i]) {
					equal = false;
					break;
				}
			}
			if (equal)
				return false;
		}
		
		var pokeMoves = $("#party .pokeMove");
		var i;
		var logEntry = poke.nickname + "'s moves:";
		for (i = 0; i < moves.length; i++) {
			pokeMoves.eq(i).text(moves[i]);
			logEntry += "<br>- " + moves[i];
		}
		for (i; i < 4; i++)
			pokeMoves.eq(i).text("");
		poke.moves = moves;
		
		log("Move[" + partyIndex + "]", logEntry);
		
		$("#changeMovesPopup").foundation("close");
		return false;
	}
	
	function itemPopup() {
		var poke = party[partyIndex];
		$("#itemPokemon").text(poke.nickname);
		$("#changeItem input[type=text]").val(poke.item);
	}
	
	function changeItem() {
		var poke = party[partyIndex];
		var item = $("#changeItem input[type=text]").val().trim();
		var prevItem = poke.item;
		if (item != prevItem) {
			poke.item = item;
			$("#party .pokeItem").text(item);
			var logEntry = "";
			if (prevItem != "") logEntry = "Took " + poke.nickname + "'s " + prevItem + ". ";
			if (item != "") logEntry += "Gave " + item + " to " + poke.nickname + ".";
			else logEntry.trim();
			log("Item[" + partyIndex + "]", logEntry);
		}
		$("#itemPopup").foundation("close");
		return false;
	}
	
	function evolvePopup() {
		var poke = party[partyIndex];
		$("#evolvePokemon").text(poke.nickname);
		$("#evolveNewPokemon").val("");
		$("#evolveNewAbility").val(poke.ability);
	}
	
	function evolve() {
		var poke = party[partyIndex];
		var newPoke = $("#evolveNewPokemon").val().trim();
		if (poke.name.toLowerCase() != newPoke.toLowerCase()) {
			if (poke.nickname == poke.name)
				poke.nickname = newPoke;
			poke.name = newPoke;
			poke.fullname = getFullname(poke.name, poke.nickname);
			
			$("#party-tabs img").eq(partyIndex).attr("src", getPokemonIcon(poke.name));
			$(".partySlotName").eq(partyIndex).text(poke.fullname);
			$("#partyPokemon").text(poke.fullname);
			$("#party img").attr("src", getPokemonImage(poke.name));
			
			var logEntry = poke.nickname + " evolved into " + poke.name + "!";
			
			var abilityText = $("#evolveNewAbility");
			if (abilityText.is(":enabled")) {
				var ability = abilityText.val().trim();
				if (ability.toLowerCase() != poke.ability.toLowerCase()) {
					poke.ability = ability;
					$("#party .pokeAbility").text(poke.ability);
					logEntry += " New ability: " + poke.ability;
				}
			}
			
			log("Evolve[" + partyIndex + "]", logEntry);
			$("#evolvePopup").foundation("close");
		}
		return false;
	}
	
	function deposit() {
		var poke = party.splice(partyIndex, 1)[0];
		
		deselectParty();
		$("#party-tabs li").eq(partyIndex).appendTo("#party-tabs");
		resetPartySlot(5);
		
		updatePC(poke);
		log("Deposit[" + partyIndex + "]", "Deposited " + poke.nickname + " to the PC.");
	}
	
	function deathPopup() {
		var poke = party[partyIndex];
		$("#deathPokemon").text(poke.nickname);
		$("#death label input").val("");
	}
	
	function death() {
		var poke = party.splice(partyIndex, 1)[0];
		poke.death = $("#death input[type=text]").val().trim();
		
		deselectParty();
		$("#party-tabs li").eq(partyIndex).appendTo("#party-tabs");
		resetPartySlot(5);
		
		updateCemetery(poke);
		
		log("Death[" + partyIndex + "]", "RIP " + poke.nickname + ". Cause of death: " + poke.death);
		$("#deathPopup").foundation("close");
		return false;
	}
	
	//PC functions
	
	function resetPC() {
		$("#pcPokemon").text("No Pokémon selected");
		$("#pc").css("visibility", "hidden");
	}
	
	function updatePC(poke) {
		pc.push(poke);
		var list = $("#pcList").append("<option>" + poke.fullname + "</option>");
		if (pc.length == 1) {
			list.prop('disabled', false);
			$("#withdrawButton").removeClass("disabled");
		}
	}
	
	function pcChange() {
		var index = $(this).prop("selectedIndex");
		if (index == 0)
			resetPC();
		else {
			var poke = pc[index - 1];
			$("#pc").css("visibility", "visible");
			$("#pc img").attr("src", getPokemonImage(poke.name));
			$("#pcPokemon").text(poke.fullname);
			$("#pc .pokeLevel").text(poke.level);
			$("#pc .pokeGender").text(poke.gender);
			$("#pc .pokeNature").text(poke.nature);
			$("#pc .pokeAbility").text(poke.ability);
			var moves = $("#pc .pokeMove");
			for (var i = 0; i < poke.moves.length; i++) {
				moves.eq(i).text(poke.moves[i]);
			}
			$("#pc .pokeItem").text(poke.item);
			$("#pc .pokeLocation").text(poke.location);
		}
	}
	
	function withdraw() {
		var list = $("#pcList");
		var index = list.prop("selectedIndex");
		if (index != 0) {
			var poke = pc.splice(index - 1, 1)[0];
			updateParty(party.length, poke);
			party.push(poke);
			list.children().eq(index).remove();
			list.children().first().prop("selected", true);
			resetPC();
			
			if (pc.length == 0)
				list.prop("disabled", true);
			if (pc.length == 0 || party.length == 6)
				$(this).addClass("disabled");
			
			log("Withdraw[" + (index - 1) + "]", "Withdrew " + poke.nickname + " from the PC.");
		}
	}
	
	//Cemetery functions
	
	function updateCemetery(poke) {
		cemetery.push(poke);
		var list = $("#cemeteryList").append("<option>" + poke.fullname + "</option>");
		if (cemetery.length == 1)
			list.prop("disabled", false);
	}
	
	function cemeteryChange() {
		var index = $(this).prop("selectedIndex");
		if (index == 0) {
			$("#cemeteryPokemon").text("No Pokémon selected");
			$("#cemetery").css("visibility", "hidden");
		} else {
			var poke = cemetery[index - 1];
			$("#cemetery").css("visibility", "visible");
			$("#cemetery img").attr("src", getPokemonImage(poke.name));
			$("#cemeteryPokemon").text(poke.fullname);
			$("#cemetery .pokeLevel").text(poke.level);
			$("#cemetery .pokeGender").text(poke.gender);
			$("#cemetery .pokeNature").text(poke.nature);
			$("#cemetery .pokeAbility").text(poke.ability);
			var moves = $("#cemetery .pokeMove");
			for (var i = 0; i < poke.moves.length; i++)
				moves.eq(i).text(poke.moves[i]);
			$("#cemetery .pokeItem").text(poke.item);
			$("#cemetery .pokeLocation").text(poke.location);
			$("#pokeDeath").text(poke.death);
		}
	}
})();