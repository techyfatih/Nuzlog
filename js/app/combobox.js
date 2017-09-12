"use strict"

$.widget("custom.combobox", {
	_create: function() {
		if (this.options.data != undefined && this.options.data instanceof Array)
			for (var i = 0; i < this.options.data.length; i++)
				this.element.append($("<option>").text(this.options.data[i]));
		
		this.input = $(this.element);
		this.input.wrap("<div class='input-group'></div>");
		
		this._createAutocomplete();
		this._createShowAllButton();
	},
	
	_createAutocomplete: function() {
		var min = 0;
		if (this.options.minLength != undefined)
			min = this.options.minLength;
		
		this.input
			.addClass("input-group-field")
			.autocomplete({
				delay: 0,
				minLength: min,
				source: $.proxy(this, "_source")
			});
		this.input.autocomplete("widget").css({
			zIndex: 1006,
			maxHeight: "200px",
			overflowY: "auto",
			overflowX: "hidden"
		});
		
		
		this._on(this.input, {
			autocompleteselect: function(event, ui) {
				ui.item.option.selected = true;
				this._trigger("select", event, {
					item: ui.item.option
				});
			}
		});
	},
	
	_createShowAllButton: function() {
		var input = this.input;
		var wasOpen = false;
		
		var div = $("<div>")
					.addClass("input-group-button")
					.insertAfter(input);
		
		var butt = $("<button>");
		
		butt.appendTo(div)
			.addClass("hollow secondary button")
			.attr("type", "button")
			.html("&#x25BC;")
			.mousedown(function() {
				wasOpen = input.autocomplete("widget").is(":visible");
			})
			.click(function() {
				input.trigger("focus");
				if (wasOpen) return;
				input.autocomplete("search", "");
			});
			
		if (this.options.minLength != undefined) {
			if (this.options.minLength == 1)
				butt.attr("title", "Enter 1 character to search");
			else butt.attr("title", "Enter " + this.options.minLength + " characters to search");
			butt.tooltip();
		}
	},
	
	_source: function(request, response) {
		var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
		response(this.element.children("option").map(function() {
			var text = $(this).text();
			if (this.value && (!request.term || matcher.test(text) || matcher.test(text.replace("é", "e"))))
				return {label: text, value: text, option: this};
		}));
	},
	
	_destroy: function() {
		var par = this.input.parent();
		par.before(this.input);
		par.remove();
	}
});