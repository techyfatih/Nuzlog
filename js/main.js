"use strict"

requirejs.config({
	baseUrl: "js/app",
	paths: {
		jquery: "../vendor/jquery",
		foundation: "../vendor/foundation"
	},
	shim: {
		"foundation": ["jquery"] //dependency
	}
});

requirejs(["jquery", "foundation"],
function($) {
	var gameOpen = false;
	
	$(document).ready(function() {
		//game.init();
		
		$(document).foundation();
	});
});