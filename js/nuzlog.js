(function () {
	"use strict";
	
	// Global variables
	var currentGame = false;
	var party = [];
	var currentPartyIndex = 0;
	var pc = [];
	var cemetery = [];
	
	// Run when doc is ready
	$(document).ready(function() {
		// Event handlers
		$("#newGameButton").click(createNewGame);
		$("#newGame").submit(newGame);
		
		$("#saveLoadGameButton").click(createSaveLoadGame);
		$("#saveFileButton").click(saveFile);
		$("#uploadFileButton").click(uploadFile);
		$("#loadFile").change(loadFile);
		$("#loadGame").submit(loadGame);
		
		$("#newLocationButton").click(moveToNewLocation);
		$("#newLocation").submit(newLocation);
		$("#battleButton").click(battle);
		
		$("#log").submit(logMessage);
		//$("#deleteLast").click(deleteLastEntry);
		
		$("#addPokemonButton").click(clearAddPokemonForm);
		$("#addPokemonName").change(addPokemonChanged);
		$("#addPokemonShiny").change(addPokemonChanged);
		$("#addPokemonForms").change(addPokemonChanged);
		$("#addPokemon").submit(addPokemon);
		
		$("#party-tabs").on("change.zf.tabs", clickPartyMember);
		
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
		
		$(".animate img").load(loadImage);
		
		// Populate data lists
		$("#game").combobox({data: data.games});
		$("#addPokemonName").combobox({data: data.pokemon, minLength: 2});
		$("#addPokemonAbility").combobox({data: data.abilities});
		$("#addPokemonMoves input").combobox({data: data.moves, minLength: 1});
		//$("#requiredMove .scombobox-display").attr("required", "");
		
		
		$(document).foundation(); //When everything is ready, load Foundation plugins
	});
	
	// -----------------------------
	// ---------- General ----------
	// -----------------------------
	
	// For internet explorer
	if (!String.prototype.startsWith) {
	  String.prototype.startsWith = function(searchString, position) {
		position = position || 0;
		return this.indexOf(searchString, position) === position;
	  };
	}

	// Escapes HTML of text
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

	// Disables properties accordingly and sets text (new game/load game)
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

	
	// ------------------------------
	// ---------- New Game ----------
	// ------------------------------

	// New Game click event
	function createNewGame() {
		$("#title").val("");
		$("#game").val("");
		$("#name").val("");
		$("#location").val("");
	}
	
	// New game form submit event
	function newGame() {
		var title = $("#title").val().trim();
		var game = $("#game").val().trim();
		var name = $("#name").val().trim();
		var loc = $("#location").val().trim();
		if (loc == "") loc = "N/A";
		
		var confirmNewGame = true;
		if (currentGame)
			confirmNewGame = confirm("Are you sure you want to create a new game? All unsaved changes will be lost.");
		
		if (confirmNewGame) {
			$("#titleLabel").text(title);
			$("#gameLabel").text(game);
			$("#nameLabel").text(name);
			disableProperties($("#disableGenders").prop('checked'), $("#disableNatures").prop('checked'), $("#disableAbilities").prop('checked'));
			var info = $("#info");
//			if (info.innerWidth() != info.prop("scrollWidth"))
	//			$("#journal").height(363);
			/*else*/ $("#journal").height(363);
			
			party = [];
			pc = [];
			cemetery = [];
			
			deselectParty();
			for (var i = 0; i < 6; i++) resetPartySlot(i);
			$("#pcList, #cemeteryList").empty().prop("disabled", true).append($("<option>")).trigger("change");
			$("#withdrawButton").addClass("disabled");
			
			$("#entries").empty();
			$("#cover").remove();
			
			if (loc != "N/A") logNewLocation(loc);
			else $("#currentLocation").text("N/A");
			
			$("#newGamePopup").foundation("close");
			currentGame = true;
		}
		return false;
	}
	
	// ------------------------------------
	// ---------- Save/Load Game ----------
	// ------------------------------------
	
	// Save/Load Game click event
	function createSaveLoadGame() {
		var save = "";
		if (currentGame) {
			save = $("#titleLabel").text();
			save += "\n" + $("#gameLabel").text();
			save += "\n" + $("#nameLabel").text();
			var disabled = $("#disabledLabel").text();
			if (disabled.indexOf("Disabled: ") == 0) {
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
	
	// credit for saveFile and loadFile:  https://thiscouldbebetter.wordpress.com/2012/12/18/loading-editing-and-saving-a-text-file-in-html5-using-javascrip/
	// Save File click event
	function saveFile() {
		var saveFile = $("#saveGame").val();
		var blob = new Blob([saveFile], {type:"text/plain"});
		var url = window.URL.createObjectURL(blob);
		var fileName = $("#titleLabel").text();
		
		var downloadLink = document.getElementById("saveFile");
		downloadLink.download = fileName;
		downloadLink.href = url;
		downloadLink.click();
	}
	
	// Upload File click event
	function uploadFile() {
		$("#loadFile").click();
	}
	
	// Load File upload event
	function loadFile() {
		var fileToLoad = document.getElementById("loadFile").files[0];
		
		var fileReader = new FileReader();
		fileReader.onload = function(fileLoadedEvent) {
			var textFromFileLoaded = fileLoadedEvent.target.result;
			document.getElementById("saveGame").value = textFromFileLoaded;
		};
		fileReader.readAsText(fileToLoad, "UTF-8");
	}
	
	// Load game click event
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
					if (disabled.indexOf("disabled:") == 0) {
						disabled = disabled.substring(disabled.indexOf(":") + 1);
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
					var log = lines[i - 1].trim();
					if (log.length == 0) continue;
					if (!pokemon) {
						var rb = log.indexOf("]");
						var time = log.substring(0, rb).trim();
						if (time == "" || !(time.indexOf("[") == 0)) throw "improper log timestamp format at line " + i;
						time = time.substring(1);
						var colon = log.indexOf(":", rb);
						var type = log.substring(rb + 1, colon).trim();
						if (type == "") throw "improper log type format at line " + i;
						var entry = log.substring(colon + 1).trim();
						if (entry == "") throw "improper log entry format at line " + i;
						if (type == "Pokemon") {
							pokemon = 1;
							pokemonTime = time;
							pokemonEntry = entry;
							poke = {};
						} else {
							var index = parseInt(type.substring(type.indexOf("[") + 1, type.indexOf("]")));
							if (index == NaN || index < 0) throw "invalid index number at line " + i;
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
								var tempIndex = entry.indexOf("Gave \"") + 6;
								tempParty[index].item = entry.substring(entry.indexOf("Gave \"") + 6, entry.indexOf("\"", tempIndex + 1));
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
							} else if (type.match(/Withdraw\[\d+\]/g)) {
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
							console.log(nameIndex);
							console.log(fullname);
							var species = fullname.substring(nameIndex + 2, fullname.lastIndexOf(")"));
							var nickname = fullname;
							if (species.length == 0 || nameIndex == -1) {
								species = fullname;
								nickname = species;
							}
							else nickname = fullname.substring(0, nameIndex);
							if (species.length > 11) throw "Pokemon name too long at line " + i;
							if (nickname.length > 12) throw "Pokemon nickname too long at line " + i;
							
							console.log(species);
							console.log(nickname);
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
								if (ability.length > 16) throw "Pokemon ability too long at line " + i;
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
							if (log.indexOf("- ") == 0) {
								var move = log.substring(2).trim();
								if (move.length > 0) {
									if (move.length > 16) throw "Pokemon move too long at line " + i;
									if (poke.moves == undefined) poke.moves = [];
									poke.moves.push(move);
								}
							} else {
								if (poke.moves.length == 0) throw "no Pokemon moves listed at line " + i;
								if (log.indexOf("Received at: ") == 0 || log.indexOf("Caught at: ") == 0) {
									poke.location = log;
									pokemon = -1;
									if (tempParty.length < 6) tempParty.push(poke);
									else tempPC.push(poke);
									journal.push([pokemonTime, "Pokemon", pokemonEntry]);
								} else throw "no location listed at line " + i;
								console.log(poke);
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
				var info = $("#info");
				//if (info.innerWidth() != info.prop("scrollWidth"))
				//	$("#journal").height(359);
				/*else*/ $("#journal").height(363);
				
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
	
	
	// ------------------------------
	// ---------- Location ----------
	// ------------------------------
	
	// New Location click event
	function moveToNewLocation() {
		$("#oldLocationText").val($("#currentLocation").text());
		$("#newLocationText").val("");
	}

	// New Location form submit event
	function newLocation() {
		logNewLocation($("#newLocationText").val());
		$("#newLocationPopup").foundation("close");
		return false;
	}
	
	// Logs new location to journal (new game/load game/new location)
	function logNewLocation(newLocation) {
		$("#currentLocation").text(newLocation);
		log("Location", newLocation);
	}
	
	
	// ----------------------------
	// ---------- Battle ----------
	// ----------------------------
	
	function battle() {
		
	}

	
	// -----------------------------
	// ---------- Journal ----------
	// -----------------------------
	
	// Log form submit event
	function logMessage() {
		var message = $("#log input[type=text]");
		if (message.val() == "") alert("Please make sure there is an entry to be logged.");
		else {
			log("Log", escapeHtml(message.val()));
			message.val("");
		}
		return false;
	}
	
	// Call this when you want to log something (adds time)
	function log(type, entry) {
		var time = new Date().toLocaleString();
		time = time.substring(0, time.length-6) + time.substring(time.length-3);
		insertLog(time, type, entry);
	}
	
	// Inserts log into journal (ONLY USED BY log())
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
		}, 0);
	}

	/*function deleteLastEntry() {
		if ($("#journal").children().length) {
			if (confirm("Delete last entry?"))
				$("#journal div[class=row]:last-child").remove();
		} else alert("No entries in the journal to delete!");
	}*/
	
	// -----------------------------------
	// ---------- Pokemon Image ----------
	// -----------------------------------
	
	// Return number of pokemon, false otherwise
	function pokemonExists(pokemon) {
		for (var i = 0; i < data.pokemon.length; i++)
			if (pokemon == data.pokemon[i])
				return i + 1;
		return false;
	}
	
	// Return URL of Pokemon image
	function getPokemonImage(pokemon, shiny, pokeForm) {
		var result = pokemonExists(pokemon);
		if (!result) return "img/question.png";
		pokemon = pokemon.replace(":","").replace(/é/g, "e").toLowerCase()
		
		var url = "https://www.pkparaiso.com/imagenes/xy/sprites/animados"
		if (result >= 722) url = url.replace("xy", "sol-luna");
		
		if (pokeForm != null) {
			pokeForm = pokeForm.replace(/[\s%-']/g, "").replace("é", "e").toLowerCase().replace("originalcap", "kantocap");
			var pikachu = {
				"belle": "-b",
				"libre": "-l",
				"ph.d": "-phd",
				"popstar": "-ps",
				"rockstar": "-r"
			};
			if (pokemon == "pikachu" && pikachu.hasOwnProperty(pokeForm))
				return "http://www.serebii.net/xy/pokemon/025" + pikachu[pokeForm] + ".png";
			else if (pokemon == "pichu" && pokeForm == "spiky-eared") {
				if (!shiny) return "http://www.serebii.net/heartgoldsoulsilver/pokemon/172-ne.png";
				else return "http://www.serebii.net/Shiny/HGSS/172-ne.png";
			}
			else if (pokemon == "unown") { //screw unown
				if (!shiny) {
					var unown = {
						"a": "",
						"b": "-bravo",
						"c": "-charlie",
						"d": "-delta",
						"e": "-echo",
						"!": "-exclamation",
						"f": "-foxtrot",
						"g": "-golf",
						"h": "-hotel",
						"i": "-india",
						"?": "-interrogation",
						"j": "-juliet",
						"k": "-kilo",
						"l": "-lima",
						"m": "-mike",
						"n": "-november",
						"o": "-oscar",
						"p": "-papa",
						"q": "-quebec",
						"r": "-romeo",
						"s": "-sierra",
						"t": "-tango",
						"u": "-uniform",
						"v": "-victor",
						"w": "-whiskey",
						"x": "-xray",
						"y": "-yankee",
						"z": "-zulu"
					};
					pokemon += unown[pokeForm];
				} else if (pokeForm != "x") {
					if (pokeForm == "!") pokeForm = "em";
					else if (pokeForm == "?") pokeForm = "qm";
					return "https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/shiny/unown-" + pokeForm + ".png"
				}
			} else {
				var oras = ["cosplay", "unbound"];
				var sm = ["alola", "kantocap", "hoenncap", "sinnohcap", "unovacap", "kaloscap", "alolacap", "10", "complete"];
				if (oras.indexOf(pokeForm) != -1) url = url.replace("xy", "rubi-omega-zafiro-alfa");
				else if (sm.indexOf(pokeForm) != -1) url = url.replace("xy", "sol-luna");
				if (sm.indexOf(pokeForm) > 0) shiny = false;
				
				var defaultForms = ["normal", "a", "plant", "sunshine", "west", "altered", "land", "red", "standard", "spring", "incarnate", "ordinary", "aria", "icysnow", "shield", "average", "neutral", "50", "confined", "baile", "midday", "solo", "meteor"];
				if (defaultForms.indexOf(pokeForm) == -1) {
					pokeForm = pokeForm.replace("core", "");
					
					pokemon += "-" + pokeForm;
				}
			}
		}

		if (shiny) url += "-shiny";
		return url + "/" + pokemon + ".gif";
	}
	
	// Return URL of Pokemon icon
	function getPokemonIcon(pokemon, pokeForm) {
		var result = pokemonExists(pokemon);
		if (!result) return "img/icon.png";
		
		if (pokeForm != null) {
			pokeForm = pokeForm.replace("?", "Question"); //unown
			pokemon += "-" + pokeForm;
		}
		
		return "img/icons/" + pokemon + ".png";
	}
	
	// Change Pokemon image for JQuery <img>
	function changePokemonImage(jquery, pokemon, shiny, pokeForm) {
		jquery.attr("src", "");
		jquery.siblings().show(); // "Loading..."
		jquery.attr("src", getPokemonImage(pokemon, shiny, pokeForm));
	}
	
	// .animate img load event
	function loadImage() {
		$(this).siblings().hide(); // hides "Loading..."
	}
	
	// Change Pokemon icon for JQuery <img>
	function changePokemonIcon(jquery, pokemon, pokemonForm) {
		jquery.attr("src", getPokemonIcon(pokemon, pokemonForm));
	}
	
	
	// --------------------------------
	// ---------- AddPokemon ----------
	// --------------------------------
	
	// Add Pokemon click event
	function clearAddPokemonForm() {
		$("#addPokemon").find("input[type=text]").val("");
		$("#addPokemon select").prop("selectedIndex", 0);
		$("#addPokemonImage").attr("src", "img/question.png");
		$("#addPokemonIcon").attr("src", "img/icon.png");
		$("#addPokemonLocation").val($("#currentLocation").text());
		$("#level").val(5);
	}
	
	// New Pokemon text, shiny check, form change events
	function addPokemonChanged() {
		var pokemon = $("#addPokemonName").val().trim();
		
		var pokeForms = $("#addPokemonForms");
		if ($(this).attr("id") == "addPokemonName") {
			pokeForms.empty();
			if (data.pokeForms.hasOwnProperty(pokemon)) {
				for (var i = 0; i < data.pokeForms[pokemon].length; i++)
					pokeForms.append("<option>" + data.pokeForms[pokemon][i] + "</option>");
				pokeForms.prop("disabled", false);
			} else pokeForms.prop("disabled", true);
		}
		var pokeForm = pokeForms.val();
		
		changePokemonImage($("#addPokemonImage"), pokemon, $("#addPokemonShiny").prop("checked"), pokeForm);
		changePokemonIcon($("#addPokemonIcon"), pokemon, pokeForm);
	}
	
	// Plant (Bulbasaur)
	function getFullname(name, nickname) {
		if (nickname != name)
			return nickname + " (" + name + ")";
		else return name;
	}
	
	// Add Pokemon form submit event
	function addPokemon() {
		var pokemonText = "";
        
		var name = $("#addPokemonName").val().trim();
		var nickname = $("#addPokemonNickname").val().trim();
		if (nickname == "")
			nickname = name;
        var fullname = getFullname(name, nickname);
        
        pokemonText = fullname;
		
		var pokeForm = $("#addPokemonForms").val();
		
		var shiny = $("#addPokemonShiny").prop("checked");

		var gender = "N/A";
		if ($("#addPokemonGender").is(":enabled")) {
			gender = $("#addPokemonGender").val();
			pokemonText += " (" + gender[0] + ")";
		}
			
		var item = $("#addPokemonItem").val().trim();
		if (item != "")
			pokemonText += " @ " + item;
		
		var ability = "N/A";
		if ($("#addPokemonAbility").is(":enabled")) {
			ability = $("#addPokemonAbility").val().trim();
			pokemonText += "<br>Ability: " + ability;
		}
		
		var level = $("#addPokemonLevel").val();
		pokemonText += "<br>Level: " + level;
		
		var nature = "N/A";
		if ($("#addPokemonNature").is(":enabled")) {
			nature = $("#addPokemonNature").val();
			pokemonText += "<br>" + nature + " Nature";
		}
		
		var moves = [];
		$("#addPokemonMoves input").each(function() {
			var move = $(this).val().trim();
			if (move != "") {
				moves.push(move);
				pokemonText += "<br>- " + move;
			}
		});
		
		var loc = $("#addPokemonMethod").val() + " " + $("#currentLocation").text();
		pokemonText += "<br>" + loc;
		
		var pokemon = {};
		pokemon.name = name;
		pokemon.nickname = nickname;
		pokemon.fullname = fullname;
		pokemon.gender = gender;
		pokemon.item = item;
		pokemon.ability = ability;
		pokemon.level = level;
		pokemon.nature = nature;
		pokemon.moves = moves;
		pokemon.loc = loc;
		
		if (party.length < 6) {
			addToParty(pokemon);
			pokemonText = pokemon.nickname + " has been added to the party!<br>" + pokemonText;
		} else {
			addToPC(pokemon);
			updatePC(poke);
			pokemonText = pokemon.nickname + " was sent to the PC.<br>" + pokemonText;
		}
		
		log("Pokemon", pokemonText);
		
		$("#addPokemonPopup").foundation("close");
		console.log(poke);
		return false;
	}
	
	
	// ---------------------------
	// ---------- Party ----------
	// ---------------------------
	
	// Appends to party (add pokemon/load game)
	function addToParty(pokemon) {
		if (party.length < 6) {
			$("#party-tabs img").eq(party.length).attr("src", getPokemonIcon(pokemon.name));
			$(".partySlotName").eq(party.length).text(pokemon.fullname);
			$(".partySlotLv").eq(party.length).css("visibility", "visible").text("Lv " + pokemon.level);
			party.push(pokemon);
		}
	}
	
	// Resets party slot at index
	function resetPartySlot(index) {
		$("#party-tabs img").eq(index).attr("src", "img/icon.png");
		$("#party-tabs .partySlotName").eq(index).text("No Pokémon");
		$("#party-tabs .partySlotLv").eq(index).css("visibility", "hidden");
	}
	
	// Deselects party
	function deselectParty() {
		$("#party-tabs li").removeClass("is-active");
		$("#party-tabs a").attr("aria-selected", false);
		$("#partyPokemon").text("No Pokémon selected");
		$("#party").css("visibility", "hidden");
	}
	
	// Party click event
	function clickPartyMember() {
		currentPartyIndex = $(this).find(".is-active").index();
		if (party[currentPartyIndex] == undefined) {
			$("#partyPokemon").text("No Pokémon selected");
			$("#party").css("visibility", "hidden");
		} else {
			var poke = party[currentPartyIndex];
			$("#party img").attr("src", getPokemonImage(poke.name));
			$("#partyPokemon").text(poke.fullname);
			$("#party .pokeLevel").text(poke.level);
			$("#party .pokeGender").text(poke.gender);
			$("#party .pokeNature").text(poke.nature);
			$("#party .pokeAbility").text(poke.ability);
			var moves = $("#party .pokeMove");
			var i = 0;
			for (i; i < poke.moves.length; i++)
				moves.eq(i).text(poke.moves[i]);
			for (i; i < 4; i++)
				moves.eq(i).text("");
			$("#party .pokeItem").text(poke.item);
			$("#party .pokeLocation").text(poke.loc);
			$("#party").css("visibility", "visible");
		}
	}
	
	// Level up click event
	function levelUp() {
		var poke = party[currentPartyIndex];
		poke.level++;
		$("#party .pokeLevel").text(poke.level);
		$(".partySlotLv").eq(currentPartyIndex).text("Lv " + poke.level);
		log("Level[" + currentPartyIndex + "]", poke.nickname + " grew to level " + poke.level + "!");
	}
	
	// Change moves click event
	function changeMovesPopup() {
		var poke = party[currentPartyIndex];
		$("#changeMovesPokemon").text(poke.nickname);
		var moves = $("#changeMoves input[type=text]");
		var i;
		for (i = 0; i < poke.moves.length; i++)
			moves.eq(i).val(poke.moves[i]);
		for (i; i < 4; i++)
			moves.eq(i).val("");
	}
	
	// 
	function changeMoves() {
		var poke = party[currentPartyIndex];
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
		
		log("Move[" + currentPartyIndex + "]", logEntry);
		
		$("#changeMovesPopup").foundation("close");
		return false;
	}
	
	function itemPopup() {
		var poke = party[currentPartyIndex];
		$("#itemPokemon").text(poke.nickname);
		$("#changeItem input[type=text]").val(poke.item);
	}
	
	function changeItem() {
		var poke = party[currentPartyIndex];
		var item = $("#changeItem input[type=text]").val().trim();
		var prevItem = poke.item;
		if (item != prevItem) {
			poke.item = item;
			$("#party .pokeItem").text(item);
			var logEntry = "";
			if (prevItem != "") logEntry = "Took " + poke.nickname + "'s \"" + prevItem + "\". ";
			if (item != "") logEntry += "Gave \"" + item + "\" to " + poke.nickname + ".";
			logEntry.trim();
			log("Item[" + currentPartyIndex + "]", logEntry);
		}
		$("#itemPopup").foundation("close");
		return false;
	}
	
	function evolvePopup() {
		var poke = party[currentPartyIndex];
		$("#evolvePokemon").text(poke.nickname);
		$("#evolveNewPokemon").val("");
		$("#evolveNewAbility").val(poke.ability);
	}
	
	function evolve() {
		var poke = party[currentPartyIndex];
		var newPoke = $("#evolveNewPokemon").val().trim();
		if (poke.name.toLowerCase() != newPoke.toLowerCase()) {
			var logEntry = poke.nickname + " evolved into " + newPoke + "!";
			
			if (poke.nickname == poke.name)
				poke.nickname = newPoke;
			poke.name = newPoke;
			poke.fullname = getFullname(poke.name, poke.nickname);
			
			$("#party-tabs img").eq(currentPartyIndex).attr("src", getPokemonIcon(poke.name));
			$(".partySlotName").eq(currentPartyIndex).text(poke.fullname);
			$("#partyPokemon").text(poke.fullname);
			$("#party img").attr("src", getPokemonImage(poke.name));
			
			var abilityText = $("#evolveNewAbility");
			if (abilityText.is(":enabled")) {
				var ability = abilityText.val().trim();
				if (ability.toLowerCase() != poke.ability.toLowerCase()) {
					poke.ability = ability;
					$("#party .pokeAbility").text(poke.ability);
					logEntry += " New ability: " + poke.ability;
				}
			}
			
			log("Evolve[" + currentPartyIndex + "]", logEntry);
			$("#evolvePopup").foundation("close");
		} else alert("Cannot evolve into the same Pokémon! Change the Pokémon to evolve into.");
		return false;
	}
	
	function deposit() {
		var poke = party.splice(currentPartyIndex, 1)[0];
		
		deselectParty();
		$("#party-tabs li").eq(currentPartyIndex).appendTo("#party-tabs");
		resetPartySlot(5);
		
		updatePC(poke);
		log("Deposit[" + currentPartyIndex + "]", "Deposited " + poke.nickname + " to the PC.");
	}
	
	function deathPopup() {
		var poke = party[currentPartyIndex];
		$("#deathPokemon").text(poke.nickname);
		$("#death label input").val("");
	}
	
	function death() {
		var poke = party.splice(currentPartyIndex, 1)[0];
		var item = poke.item;
		poke.item = "";
		poke.death = $("#death input[type=text]").val().trim();
		
		deselectParty();
		$("#party-tabs li").eq(currentPartyIndex).appendTo("#party-tabs");
		resetPartySlot(5);
		
		updateCemetery(poke);
		
		log("Death[" + currentPartyIndex + "]", "RIP " + poke.nickname + ". Cause of death: " + poke.death);
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
		if (pc.length >= 1) {
			list.prop('disabled', false);
			if (party.length < 6)
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
			var i = 0;
			for (i; i < poke.moves.length; i++)
				moves.eq(i).text(poke.moves[i]);
			for (i; i < 4; i++)
				moves.eq(i).text("");
			$("#pc .pokeItem").text(poke.item);
			$("#pc .pokeLocation").text(poke.loc);
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
		if (cemetery.length >= 1)
			list.prop("disabled", false);
		if (pc.length >= 1 && party.length < 6)
			$("#withdrawButton").removeClass("disabled");
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
			var i = 0;
			for (i; i < poke.moves.length; i++)
				moves.eq(i).text(poke.moves[i]);
			for (i; i < 4; i++)
				moves.eq(i).text("");
			$("#cemetery .pokeLocation").text(poke.loc);
			$("#pokeDeath").text(poke.death);
		}
	}
})();