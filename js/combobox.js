"use strict"

$.widget("custom.combobox", {
	_create: function() {
		if (this.options.data != undefined) {
			if (this.options.data instanceof Array) {
				for (var i = 0; i < this.options.data.length; i++)
				this.element.append($("<option>").text(this.options.data[i]));
			}
		}
		this.wrapper = $("<div>")
			.addClass("input-group")
			.insertAfter(this.element);
		
		this.element.hide();
		this._createAutocomplete();
		this._createShowAllButton();
	},
	
	_createAutocomplete: function() {
		this.input = $("<input>")
			.appendTo(this.wrapper)
			.attr("type", "text")
			.addClass("input-group-field")
			.autocomplete({
				delay: 0,
				minLength: 0,
				source: $.proxy(this, "_source")
			})
			.tooltip({
				classes: {
					"ui-tooltip": "ui-state-highlight"
				}
			});
		if (this.options.required) this.input.attr("required", "");
		if (this.options.placeholder) this.input.attr("placeholder", this.options.placeholder);
		this.input.autocomplete("widget").css("z-index", 1006);	
		
		
		this._on(this.input, {
			autocompleteselect: function(event, ui) {
				ui.item.option.selected = true;
				this._trigger("select", event, {
					item: ui.item.option
				});
			},
			
			autocompletechange: "_removeIfInvalid"
		});
	},
	
	_createShowAllButton: function() {
		var input = this.input;
		var wasOpen = false;
		
		var div = $("<div>")
					.addClass("input-group-button")
					.appendTo(this.wrapper);
		
		$("<button>")
			.appendTo(div)
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
	},
	
	_source: function(request, response) {
		var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
		response(this.element.children("option").map(function() {
			var text = $(this).text();
			if (this.value && (!request.term || matcher.test(text)))
				return {label: text, value: text, option: this};
		}));
	},
	
	_removeIfInvalid: function(event, ui) {
		if (ui.item) return;
		
		var value = this.input.val();
		var valid = false;
		this.element.children("option").each(function() {
			if ($(this).text().toLowerCase() == value.toLowerCase()) {
				this.selected = valid = true;
				return false;
			}
		});
		
		if (valid) return;
		
		this.input
			.val("")
			.attr("title", value + " didn't match any item")
			.tooltip("open");
		this.element.val("");
		this._delay(function() {
			this.input.tooltip("close").attr("title", "");
		}, 2500);
		this.input.autocomplete("instance").term = "";
	},
	
	_destroy: function() {
		this.wrapper.remove();
		this.element.show();
	}
});