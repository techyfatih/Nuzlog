define(["jquery", "info"],
function($, info) {
	function initSaveLoadGame() {
		$("#save-load-game-button").click(function() {
			var save = "";
			if (gameOpen) {
				save = title;
				save += "\n" + game;
				save += "\n" + name;
				save += "\n";
			}
			$("#save-game").val(save);
		});
		$("#save-file-button").click(function() {
		});
		$("#upload-file-button").click(function() {
			
		});
		$("#load-file").click(function() {
		});
		$("#load-game").submit(function() {
			
		});
	}
	
	return {
		init: function() {
		}
	}
});