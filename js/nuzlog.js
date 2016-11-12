(function () {
	"use strict";
	
	//Global variables
	var currentGame = false;
	var party = [];
	var pc = [];
	var cemetery = [];
	
	//Run when doc is ready
	$(document).ready(function() {
		//Event handlers
		$(".popup .close").click(closePopup);
		$("#full").click(closePopup);
		
		$("#newGameButton").click(createNewGame);
		$("#newGame").submit(newGame);
		
		$("#saveLoadGameButton").click(createSaveLoadGame);
		$("#loadGame").click(loadGame);
		
		$("#log").submit(logMessage);
		$("#log a").click(deleteLastEntry);
		
		$("#addPokemonButton").click(addPokemonPopup);
		$("#addPokemon").submit(addPokemon);
		
		$("#party .button").click(pokemonPopup);
		
		//Populate data lists
		combobox($("#game"), data.games, true, "Pokemon Ruby");
		combobox($("#pokemon"), data.pokemon, true, "Bulbasaur");
		$("#pokemon").scombobox("change", addPokemonChanged);
		combobox($("#ability"), data.abilities, true, "Overgrow");
		combobox($("#moves select"), data.moves, false, "");
		$("#requiredMove .scombobox-display").attr("required", "");
		
		$(document).foundation(); //When everything is ready, load Foundation plugins
	});
	
	window.onkeyup = function(e) {
		var key = e.keyCode ? e.keyCode : e.which;
		
		if (key == 27) {
			closePopup();
		}
	};
	
	
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

	function combobox(jquery, options, required, placeholder) {
		var data = [];
		for (var i = 0; i < options.length; i++) {
			data.push({value: options[i], text: options[i]});
		}
		jquery.scombobox({data: data, empty: true, required: required, sort: false, fullMatch: true, invalidAsValue: true, maxHeight: "350%", placeholder: placeholder});
	}
	
	function getValue(jqstring) {
		var jquery = $(jqstring);
		if (jquery.hasClass("scombobox")) {
			return escapeHtml(jquery.scombobox("val"));
		} else {
			return escapeHtml(jquery.val());
		}
	}
	
	function closePopup(e) {
		$(".popup").find("input[type=text], textarea").val("");
		$(".popup select").each(function(i) {
			$(this)[0].selectedIndex = 0;
		});
		$(".animate img").attr("src", "img/question.png");
		$("#level").val(5);
		$(".popup").hide();
		$("#full").hide();
		if (!currentGame)
			$("#main").show();
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
		$("#ability").scombobox("disabled", disableAbilities);
	}

	
	//New game functions
	
	function createNewGame() {
		var confirmNewGame = true;
		if (currentGame)
			confirmNewGame = confirm("Are you sure you want to create a new game? All unsaved changes will be lost.");
		if (confirmNewGame) {
			$("#main").hide();
			$("#full").show();
			$("#newGamePopup").show();
		}
	}

	function newGame() {
		var title = getValue("#title");
		var game = getValue("#game");
		var name = getValue("#name");
		
		if (title == "" || game == "" || name == "")
			alert("Please make sure all fields are entered.");
		else {
			$("#titleLabel").text(title);
			$("#gameLabel").text(game);
			$("#nameLabel").text(name);
			disableProperties($("#disableGenders").prop('checked'), $("#disableNatures").prop('checked'), $("#disableAbilities").prop('checked'));

			currentGame = true;
			$("#journal").empty();
			closePopup();
			return false;
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
			$("#journal").children().each(function(i) {
				save += "\n";
				var log = $(this).children();
				save += "[" + log.first().text() + "] " + log.first().next().text() + ": " + log.last().html().replace(/<br>/g, "\t");
			});
			$("#saveGame").val(save);
		}
		
		$("#main").hide();
		$("#full").show();
		$("#saveLoadGame").show();
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
					
					// Journal
					var journal = [];
					lines.forEach(function(log) {
						var time = log.substring(0, log.indexOf("]")).trim();
						if (time == "" || !(time.startsWith("["))) throw "improper format with log timestamp";
						var type = log.substring(log.indexOf("]") + 1, log.indexOf(":", 16)).trim();
						if (type == "") throw "improper format with log type";
						var entry = log.substring(log.indexOf(":", 16) + 1).trim();
						if (entry == "") throw "improper format with log entry";
						journal.push([time.substring(1), type, entry.replace(/\t/g, "<br>")]);
					});
					
					// Apply changes
					$("#titleLabel").text(title);
					$("#gameLabel").text(game);
					$("#nameLabel").text(name);
					disableProperties(disableGenders, disableNatures, disableAbilities);
					$("#journal").empty();
					party = [];
					pc = [];
					cemetery = [];
					journal.forEach(function(log) {
						insertLog(log[0], log[1], log[2]);
					});
					
					currentGame = true;
					closePopup();
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
		var $timeCol = $("<div/>", {class: "large-4 small-3 columns", text: time});		
		var $typeCol = $("<div/>", {class: "large-2 small-3 columns", text: type});
		var $entryCol = $("<div/>", {class: "small-6 columns", html: entry});
		
		$row.append($timeCol);
		$row.append($typeCol);
		$row.append($entryCol);
		$("#journal").append($row);
	}

	function deleteLastEntry() {
		if ($("#journal").children().length) {
			if (confirm("Delete last entry?"))
				$("#journal div[class=row]:last-child").remove();
		} else alert("No entries in the journal to delete!");
	}
	
	//Add Pokemon functions
	
	function addPokemonPopup() {
		$("#full").show();
		$("#addPokemonPopup").show();
	}
    
    function pokemonExists(pokemon) {
		return $("#pokemon select option").filter(function() {
			return $(this).text() == pokemon;
		}).length;
    }
	
	function addPokemonChanged() {
		pokemonAnimation(getValue("#pokemon"));
	}
	
	function pokemonAnimation(pokemon) {
		if (pokemonExists(pokemon)) {
			$(".animate img").attr("src", "http://www.pokestadium.com/sprites/xy/" + pokemon.toLowerCase() + ".gif");
		} else {
			$(".animate img").attr("src", "img/question.png");
		}
	}
	
	function addPokemon() {
		var pokemon = "";
        
		var name = getValue("#pokemon");
		var nickname = getValue("#nickname");
        var fullName = name;
		if (nickname != "" && nickname != name) {
			fullName = nickname + " (" + name + ")";
        } else {
            nickname = name;
        }
        
        pokemon = fullName;

		var gender;
		if ($("#gender").is(":enabled")) {
			gender = getValue("#gender");
			pokemon += " (" + gender + ")";
		}
			
		var item = getValue("#item");
		if (item != "")
			pokemon += " @ " + item;
		
		var ability;
		if ($("#ability .scombobox-display").is(":enabled")) {
			ability = getValue("#ability");
			pokemon += "<br>Ability: " + ability;
		}
		
		var level = getValue("#level");
		pokemon += "<br>Level: " + level;
		
		var nature;
		if ($("#nature").is(":enabled")) {
			nature = getValue("#nature");
			pokemon += "<br>" + nature + " Nature";
		}
		
		var moves = [];
		$("#moves .scombobox-display").each(function() {
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
		poke.gender = gender;
		poke.item = item;
		poke.ability = ability;
		poke.level = level;
		poke.nature = nature;
		poke.moves = moves;
		poke.loc = loc;
		
		if (party.length < 6) {
            var slot = $("#party .button").eq(party.length);
            if (pokemonExists(poke.name)) {
                slot.children().first().attr("src", "http://www.pokestadium.com/assets/img/sprites/misc/icons/" + name.toLowerCase() + ".png");
            }
            slot.children().eq(1).html(fullName + "<br>Lv " + poke.level);
            slot.removeAttr("disabled")
            party.push(poke);
            pokemon = poke.nickname + " has been added to the party!<br><br>" + pokemon;
        } else {
            pc.push(poke);
            pokemon = poke.nickname + " was sent to the PC.<br><br>" + pokemon;
        }
		
		log("Pokemon", pokemon);
		
		closePopup();
		return false;
	}
	
	function pokemonPopup(e) {
		var poke = party[parseInt($(e.currentTarget).attr("data-num")-1)];
		pokemonAnimation(poke.name);
		$("#pokeLevel").text("Level " + poke.level);
		$("#pokeGender").text("Gender: " + poke.gender);
		$("#pokeNature").text("Nature: " + poke.nature);
		$("#pokeAbility").text("Ability: " + poke.ability);
		$("#pokeMoves h5").each(function(i) {
			var move = poke.moves[i];
			if (move != undefined) {
				$(this).text("- " + move);
			}
		});
		$("#pokeItem").text("Item: " + poke.item);
		$("#pokeLocation").text(poke.loc);
		
		$("#full").show();
		$("#pokemonPopup").show();
	}
})();