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
		$("#loadGame").click(loadGame);
		
		$("#log").submit(logMessage);
		//$("#deleteLast").click(deleteLastEntry);
		
		$("#addPokemonButton").click(clearAddPokemonForm);
		$("#pokemon").change(addPokemonChanged);
		$("#addPokemon").submit(addPokemon);
		
		$("#party-tabs").on("change.zf.tabs", partyChange);
		
		$("#levelUp").click(levelUp);
		$("#changeMovesButton").click(changeMovesPopup);
		$("#changeMoves").submit(changeMoves);
		$("#itemButton").click(itemPopup);
		$("#changeItem").submit(changeItem);
		$("#evolveButton").click(evolvePopup);
		$("#evolve").submit(evolve);
		$("#deposit").click(deposit);
		$("#deathButton").click(deathPopup);
		$("#death").submit(death);
		
		$("#withdraw").click(withdraw);
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
	
	function getValue(jqstring) {
		var jquery = $(jqstring);
		if (jquery.hasClass("scombobox")) {
			return escapeHtml(jquery.scombobox("val"));
		} else {
			return escapeHtml(jquery.val()).trim();
		}
	}
	
	function disableProperties(disableGenders, disableNatures, disableAbilities) {
		var disabled = [];
		if (disableGenders) disabled.push("Genders");
		if (disableNatures) disabled.push("Natures");
		if (disableAbilities) disabled.push("Abilities");
		if (disabled.length > 0) {
			$("#disabled").text("Disabled: " + disabled.join(", "));
		} else {
			$("#disabled").text("All Enabled");
		}
		$("#gender").prop('disabled', disableGenders);
		$("#nature").prop('disabled', disableNatures);
		$("#ability, #newAbility").prop("disabled", disableAbilities);
	}

	
	//New game functions

	function createNewGame() {
		$("#title").val("");
		$("#game").val("");
		$("#name").val("");
	}
	
	function newGame() {
		var title = getValue("#title");
		var game = getValue("#game");
		var name = getValue("#name");
		
		if (title == "" || game == "" || name == "")
			alert("Please make sure all fields are entered.");
		else {
			var confirmNewGame = true;
			if (currentGame)
				confirmNewGame = confirm("Are you sure you want to create a new game? All unsaved changes will be lost.");
			
			if (confirmNewGame) {
				$("#titleLabel").text(title);
				$("#gameLabel").text(game);
				$("#nameLabel").text(name);
				disableProperties($("#disableGenders").prop('checked'), $("#disableNatures").prop('checked'), $("#disableAbilities").prop('checked'));
				
				party = [];
				var partyTabs = $("#party-tabs li");
				for (var i = 0; i < 6; i++) {
					var tab = partyTabs.eq(i);
					tab.removeClass("is-active");
					var a = tab.children().first();
					a.attr("aria-selected", false);
					var content = a.children();
					content.eq(0).attr("src", "img/icon.png");
					content.eq(1).attr("No Pokemon");
					content.eq(2).css("visibility", "hidden");
				}
				$("#partyPokemon").text("No Pokemon selected");
				$("#party").css("visibility", "hidden");
				
				pc = [];
				var pcList = $("#pcList");
				pcList.empty().append($("<option>"));
				pcList.prop("disabled", true);
				$("#withdraw").addClass("disabled");
				$("#pcPokemon").text("No Pokemon selected");
				$("#pc").css("visibility", "hidden");
				
				cemetery = [];
				var cemeteryList = $("#cemeteryList");
				cemeteryList.empty().append($("<option>"));
				cemeteryList.prop("disabled", true);
				$("#cemeteryPokemon").text("No Pokemon selected");
				$("#cemetery").css("visibility", "hidden");

				$("#entries").empty();
				$("#cover").remove();
				$("#newGamePopup").foundation("close");
				currentGame = true;
				return false;
			}
		}
	}
	
	//Saving and loading functions
	
	function createSaveLoadGame() {
		if (currentGame) {
			var save = $("#titleLabel").text();
			save += "\n" + $("#gameLabel").text();
			save += "\n" + $("#nameLabel").text();
			var disabled = $("#disabled").text();
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
			$("#saveGame").val(save.replace("\n\n", "\n"));
		}
		
		$("#saveLoadGamePopup").foundation("open");
	}
	
	function loadGame() {
		var confirmLoadGame = true;
		if (currentGame)
			confirmLoadGame = confirm("Are you sure you want to load another game? All unsaved changes will be lost.");
		
		if (confirmLoadGame) {
			var load = $("#saveGame").val();
			if (load == "") {
				alert("No save file detected!");
			} else {
				var lines = load.split("\n");
				try {
					// Title, game, trainer name, disabled properties
					var title = lines.shift();
					var game = lines.shift();
					if (game == undefined || game == "") throw "missing game name";
					var name = lines.shift();
					if (name == undefined || game == "") throw "missing trainer name";
					var disabled = lines.shift();
					var disableGenders = false;
					var disableNatures = false;
					var disableAbilities = false;
					if (disabled != undefined) {
						if (disabled.startsWith("Disabled: ")) {
							disabled.split(",").forEach(function(property) {
								var temp = property.trim().toLowerCase();
								if (temp == "genders") {
									disableGenders = true;
								} else if (temp == "natures") {
									disableNatures = true;
								} else if (temp == "abilities") {
									disableAbilities = true;
								}
							});
							lines.shift();
						} else if (disabled != "") throw "improper format with disabled features";
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
					for (var i = 0; i < lines.length; i++) {
						var log = lines[i];
						if (log.length == 0) continue;
						if (!pokemon) {
							var time = log.substring(0, log.indexOf("]")).trim();
							if (time == "" || !(time.startsWith("["))) throw "improper format with log timestamp";
							var type = log.substring(log.indexOf("]") + 1, log.indexOf(":", 16)).trim();
							if (type == "") throw "improper format with log type";
							var entry = log.substring(log.indexOf(":", 16) + 1).trim();
							if (entry == "") throw "improper format with log entry";
							if (type == "Pokemon") {
								pokemon = 1;
								pokemonTime = time.substring(1);
								pokemonEntry = entry;
								poke = {};
							} else {
								if (type.match(/Level\[\d\]/g)) {
									var index = type[type.indexOf("[") + 1];
									if (index >= tempParty.length) throw "invalid index for party at line " + i;
									tempParty[index].level++;
								} else if (type.match(/Move\[\d\]/g)) {
									var index = type[type.indexOf("[") + 1];
									if (index >= tempParty.length) throw "invalid index for party at line " + i;
									var movesEntry = entry.split("\t");
									var moves = [];
									for (var j = 1; j < movesEntry.length; j++)
										if (movesEntry[j].length > 2) moves.push(movesEntry[j].substring(2));
									if (moves.length == 0) throw "insufficient Pokemon moves at line " + i;
									tempParty[index].moves = moves;
								} else if (type.match(/Item\[\d\]/g)) {
									var index = type[type.indexOf("[") + 1];
									if (index >= tempParty.length) throw "invalid index for party at line " + i;
									tempParty[index].item = entry.substring(entry.indexOf(". Gave ") + 7, entry.lastIndexOf(" to "));
								} else if (type.match(/Evolve\[\d\]/g)) {
									var index = type[type.indexOf("[") + 1];
									if (index >= tempParty.length) throw "invalid index for party at line " + i;
									var exclamation = entry.lastIndexOf("!");
									tempParty[index].name = entry.substring(entry.indexOf(" evolved into ") + 14, exclamation);
									var ability = entry.substring(exclamation + 15);
									if (ability.length > 0) tempParty[index].ability = ability;
								} else if (type.match(/Deposit\[\d\]/g)) {
									var index = type[type.indexOf("[") + 1];
									if (index >= tempParty.length) throw "invalid index for party at line " + i;
									tempPC.push(tempParty.splice(index, 1)[0]);
								} else if (type.match(/Withdraw\[\d\]/g)) {
									var index = type[type.indexOf("[") + 1];
									if (index >= tempPC.length) throw "invalid index for PC at line " + i;
									tempParty.push(tempPC.splice(index, 1)[0]);
								} else if (type.match(/Death\[\d\]/g)) {
									var index = type[type.indexOf("[") + 1];
									if (index >= tempParty.length) throw "invalid index for party at line " + i;
									tempCemetery.push(tempParty.splice(index, 1)[0]);
								}
								journal.push([time, type, entry]);
							}
						} else {
							if (pokemon == 1) {
								var atIndex = log.indexOf("@");
								if (atIndex != log.lastIndexOf("@")) throw "additional @ symbols in Pokemon name and/or item at line " + i;
								
								var fullname = log.substring(0, atIndex - 1 - 4 * !disableGenders);
								if (fullname.length == 0) throw "invalid Pokemon name at line " + i;
								var nameIndex = fullname.lastIndexOf(" (");
								var name = fullname.substring(nameIndex, fullname.lastIndexOf(")"));
								var nickname = fullname;
								if (name.length == 0) nickname = fullname.substring(0, nameIndex);
								else name = fullname;
								
								var gender = "N/A";
								if (!disableGenders) {
									gender = log.substring(fullname.length + 2, atIndex - 2);
									if (gender.length == 0) throw "invalid Pokemon gender at line " + i;
									switch (gender) {
										case "M": gender = "Male"; break;
										case "F": gender = "Female"; break;
										case "G": gender = "Genderless"; break;
										default: throw "invalid Pokemon gender at line " + i;
									}
								}
								
								var item = log.substring(atIndex + 1);
								if (item.length == 0) throw "invalid Pokemon item at line " + i;
								
								poke.name = name;
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
									if (poke.moves.length == 0) throw "insufficient Pokemon moves at line " + i;
									if (log.startsWith("Received at: ") || log.startsWith("Caught at: ")) {
										poke.location = log;
										pokemon = -1;
										if (tempParty.length < 6) tempParty.push(poke);
										else tempPC.push(poke);
										journal.push([pokemonTime, "Pokemon", pokemonEntry]);
									}
								}
							}
							pokemonEntry += "<br>" + log;
							pokemon++;
						}
					}
					
					// Apply changes
					$("#titleLabel").text(title);
					$("#gameLabel").text(game);
					$("#nameLabel").text(name);
					disableProperties(disableGenders, disableNatures, disableAbilities);
					
					$("#entries").empty();
					for (var i = 0; i < journal.length; i++) {
						var log = journal[i];
						insertLog(log[0], log[1], log[2]);
					}
					
					party = tempParty;
					var partyTabs = $("#party-tabs li");
					var i = 0;
					for (i; i < party.length; i++) {
						var li = partyTabs.eq(i);
						li.removeClass("is-active");
						var a = li.children().first();
						a.attr("aria-selected", false);
						var content = a.children();
						content.first().attr("src", getPokemonIcon(party[i].name));
						content.eq(1).text(party[i].fullname);
						content.eq(2).css("visibility", "visible");
						content.eq(2).text("Lv " + party[i].level);
					}
					for (i; i < 6; i++) {
						var li = partyTabs.eq(i);
						li.removeClass("is-active");
						var a = li.children().first();
						a.attr("aria-selected", false);
						var content = a.children();
						content.first().attr("src", "img/icon.png");
						content.eq(1).text("No Pokemon");
						content.eq(2).css("visibility", "hidden");
					}
					$("#partyPokemon").text("No Pokemon selected");
					$("#party").css("visibility", "hidden");
					
					pc = tempPC;
					var pcList = $("#pcList")
					pcList.empty().append($("<option>"));
					for (var i = 0; i < pc.length; i++) pcList.append("<option>" + pc[i].fullname + "</option>");
					pcList.prop("disabled", true);
					var withdraw = $("#withdraw").addClass("disabled");
					if (pc.length > 0) {
						pcList.prop("disabled", false);
						if (party.length < 6) withdraw.removeClass("disabled");
					}
					$("#pcPokemon").text("No Pokemon selected");
					$("#pc").css("visibility", "hidden");
					
					cemetery = tempCemetery;
					var cemeteryList = $("#cemeteryList");
					cemeteryList.empty().append($("<option>"));
					for (var i = 0; i < cemetery.length; i++) cemeteryList.append("<option>" + cemetery[i].fullname + "</option>");
					cemeteryList.prop("disabled", true);
					if (cemetery.length > 0) cemeteryList.prop("disabled", false);
					$("#cemeteryPokemon").text("No Pokemon selected");
					$("#cemetery").css("visibility", "hidden");
					
					console.log(party);
					console.log(pc);
					console.log(cemetery);
					
					currentGame = true;
					$("#cover").remove();
					$("#saveLoadGamePopup").foundation("close");	
				} catch(err) {
					alert("There was an error in loading the game: " + err);
				}
			}
		}
	}
	
	//Journal functions
	
	function logMessage() {
		var message = $("#log input[type=text]");
		if (message.val() == "")
			alert("Please make sure there is an entry to be logged.");
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
		$("#addPokemon select").each(function() {$(this).selectedIndex = 0;});
		$("#addPokemon img").attr("src", "img/question.png");
		$("#level").val(5);
	}
	
	function addPokemonChanged() {
		$("#addPokemon img").attr("src", getPokemonImage(getValue(this)));
	}
	
	function getPokemonImage(pokemon) {
		var result = pokemonExists(pokemon);
		console.log(result);
		if (result == "alola") return "img/alola/" + pokemon.toLowerCase() + ".png";
		else if (result) {
			return "http://www.pokestadium.com/sprites/xy/" + pokemon.toLowerCase() + ".gif";
		} else return "img/question.png";
	}
	
	function getPokemonIcon(pokemon) {
		var result = pokemonExists(pokemon);
		if (result != "alola" && result) {
			return "http://www.pokestadium.com/assets/img/sprites/misc/icons/" + pokemon.toLowerCase() + ".png";
		} else return "img/icon.png";
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
	
	function addPokemon() {
		var pokemon = "";
        
		var name = getValue("#pokemon");
		var nickname = getValue("#nickname");
        var fullname = name;
		if (nickname != "" && nickname != name) {
			fullname = nickname + " (" + name + ")";
        } else {
            nickname = name;
        }
        
        pokemon = fullname;

		var gender;
		if ($("#gender").is(":enabled")) {
			gender = getValue("#gender");
			pokemon += " (" + gender[0] + ")";
		} else gender = "N/A"
			
		var item = getValue("#item");
		if (item != "")
			pokemon += " @ " + item;
		
		var ability;
		if ($("#ability").is(":enabled")) {
			ability = getValue("#ability");
			pokemon += "<br>Ability: " + ability;
		} else ability = "N/A";
		
		var level = getValue("#level");
		pokemon += "<br>Level: " + level;
		
		var nature;
		if ($("#nature").is(":enabled")) {
			nature = getValue("#nature");
			pokemon += "<br>" + nature + " Nature";
		} else nature = "N/A";
		
		var moves = [];
		$("#moves input").each(function() {
			var move = getValue(this);
			if (move != "") {
				moves.push(move);
				pokemon += "<br>- " + move;
			}
		});
		
		var loc = getValue("#method") + " " + getValue("#location");
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
			updateParty(poke);
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
	
	function updateParty(poke) {
		party.push(poke);
		var slot = $("#party-tabs a").eq(party.length - 1).children();
		slot.first().attr("src", getPokemonIcon(poke.name));
		slot.eq(1).html(poke.fullname);
		slot.eq(2).html("Lv " + poke.level);
		slot.eq(2).css("visibility", "visible");
	}
	
	function partyChange() {
		partyIndex = $(this).find(".is-active").index();
		if (party[partyIndex] == undefined) {
			$("#partyPokemon").text("No Pokémon selected");
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
		log("Level[" + partyIndex + "]", poke.nickname + " grew to level " + poke.level + "!");
	}
	
	function changeMovesPopup() {
		var poke = party[partyIndex];
		$("#changeMovesPokemon").text(poke.nickname);
		var moves = $("#changeMoves input");
		var i;
		for (i = 0; i < poke.moves.length; i++)
			moves.eq(i).val(poke.moves[i]);
		for (i; i < 4; i++)
			moves.eq(i).val("");
	}
	
	function changeMoves() {
		var poke = party[partyIndex];
		var moves = [];
		$("#changeMoves label input").each(function() {
			var move = getValue(this);
			if (move != "") moves.push(move);
		});
		
		if (moves.length == poke.moves.length) {
			var equal = true;
			for (var i = 0; i < moves.length; i++) {
				if (moves[i] != poke.moves[i]) {
					equal = false;
					break;
				}
			}
			if (equal) return false;
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
		$("#changeItem label input").val(poke.item);
	}
	
	function changeItem() {
		var poke = party[partyIndex];
		var item = getValue("#changeItem label input");
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
		$("#evolvePokemon").text(poke.nicknam);
		$("#newPokemon").val("");
		$("#newAbility").val(poke.ability);
	}
	
	function evolve() {
		var poke = party[partyIndex];
		var newPoke = getValue("#newPokemon");
		if (poke.name.toLowerCase() != newPoke.toLowerCase()) {
			var nickname = poke.nickname;
			poke.fullname = newPoke;
			if (poke.nickname != poke.name) {
				poke.fullname = poke.nickname + " (" + poke.fullname + ")";
			} else poke.nickname = newPoke;
			poke.name = newPoke;
			
			$("#partyPokemon").text(poke.fullname);
			$("#party img").attr("src", getPokemonImage(poke.name));
			
			var logEntry = nickname + " evolved into " + poke.name + "!";
			
			var abilityText = $("#newAbility");
			if (abilityText.is(":enabled")) {
				var ability = getValue(abilityText);
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
		
		var tab = $("#party-tabs li").eq(partyIndex);
		tab.appendTo("#party-tabs").removeClass("is-active");
		tab.children().first().attr("aria-selected", false);
		tab.find("img").attr("src", "img/icon.png");
		var p = tab.find("p");
		p.first().text("No Pokémon");
		p.eq(1).css("visibility", "hidden");
		$("#partyPokemon").text("No Pokémon selected");
		$("#party").css("visibility", "hidden");
		
		updatePC(poke);
		log("Deposit[" + partyIndex + "]", "Deposited " + poke.nickname + " to the PC.");
	}
	
	function deathPopup() {
		var poke = party[partyIndex];
		$("#deathPokemon").text(poke.nickname);
		$("#deathCause").val("");
	}
	
	function death() {
		var poke = party.splice(partyIndex, 1)[0];
		poke.death = getValue($("#deathCause"));
		
		var tab = $("#party-tabs li").eq(partyIndex);
		tab.appendTo("#party-tabs").removeClass("is-active");
		tab.children().first().attr("aria-selected", false);
		tab.find("img").attr("src", "img/icon.png");
		var p = tab.find("p");
		p.first().text("No Pokémon");
		p.eq(1).css("visibility", "hidden");
		$("#partyPokemon").text("No Pokemon selected");
		$("#party").css("visibility", "hidden");
		
		cemetery.push(poke);
		var dropdown = $("#cemeteryList");
		dropdown.append($("<option>", {value: cemetery.length - 1, text: poke.fullname}));
		if (cemetery.length == 1)
			dropdown.prop('disabled', false);
		
		log("Death[" + partyIndex + "]", "RIP " + poke.nickname + ". Cause of death: " + poke.death);
		$("#deathPopup").foundation("close");
		return false;
	}
	
	//PC functions
	
	function updatePC(poke) {
		pc.push(poke);
		var dropdown = $("#pcList");
		dropdown.append($("<option>", {text: poke.fullname}));
		if (pc.length == 1) {
			dropdown.prop('disabled', false);
			$("#withdraw").removeClass('disabled');
		}
	}
	
	function pcChange() {
		var index = $(this).prop("selectedIndex");
		if (index == 0) {
			$("#pcPokemon").text("No Pokémon selected");
			$("#pc").css("visibility", "hidden");
		} else {
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
			updateParty(poke);
			list.children().eq(index).remove();
			list.children().first().prop("selected", true);
			list.trigger("change");
			
			if (pc.length == 0 || party.length == 6) {
				$("#pcList").attr("disabled", "");
				$(this).addClass("disabled");
			}
			log("Withdraw[" + (index - 1) + "]", "Withdrew " + poke.nickname + " from the PC.");
		}
	}
	
	//Cemetery change function
	
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
			for (var i = 0; i < poke.moves.length; i++) {
				moves.eq(i).text(poke.moves[i]);
			}
			$("#cemetery .pokeItem").text(poke.item);
			$("#cemetery .pokeLocation").text(poke.location);
			$("#pokeDeath").text(poke.death);
		}
	}
})();