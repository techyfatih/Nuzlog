"use strict"

define(["jquery", "jquery_ui/widgets/autocomplete"],
function($, autocomplete, button) {
	$.widget("custom.combobox", $.ui.autocomplete, {
		options: {
			delay: 0,
			minLength: 0
		},
		
		_create: function() {
			this._super();
			var autocomplete = this;
			
			var wrapper = $("<div class=\"input-group\" style=\"height: 39px\"></div>")
				.insertAfter(this.element);
			
			this.element.appendTo(wrapper)
				.addClass("input-group-field");
			
			var button = $(
				"<div class=\"input-group-button\">" +
					"<button type=\"button\" class=\"hollow secondary dropdown button combobox\" tabIndex=-1 style=\"padding: 0; background: whitesmoke\">" +
				"</div>")
				.click(function() {
					autocomplete.search(autocomplete.element.val());
				})
				.appendTo(wrapper);
			
			var menu = this.menu;
			menu.element.on("menufocus", function() {menu.bindings.length = 0;}); // hack for performance optimization
		},
		
		_renderMenu: function(ul, items) {
			var $ul = $(ul);
			var $items = "";
			for (var i = 0; i < items.length; i++) {
				$items += "<li class=\"ui-menu-item\"><div tabindex=\"-1\" class=\"ui-menu-item-wrapper\">" + items[i].label + "</div></li>";
			}
			$ul.append($items)
			$ul.css({
				"z-index": 9001,
				"max-height": "200px",
				"overflow-y": "auto",
				"overflow-x": "hidden"
			});
			var children = $ul.children();
			for (var i = 0; i < items.length; i++) {
				$(children[i]).data("ui-autocomplete-item", items[i]);
			}
		}
	});
});