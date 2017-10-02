"use strict"

requirejs.config({
	baseUrl: "js/app",
	paths: {
		jquery: "../vendor/jquery",
		foundation: "../vendor/foundation",
		jquery_ui: "../vendor/jquery-ui"
	},
	shim: {
		"foundation": ["jquery"] //dependency
	}
});

requirejs(["jquery", "foundation", "game", "combobox"],
function($, foundation, game) {
	$(document).ready(function() {
		$(document).foundation();
		game.init();
	});
});