# Changelog

## v. 2.0.2 (November 30, 2017)
* Fixed issue with loading saves after last update
* Modified log entry texts to sound more natural
* Added item icon to display if a Pokémon has an item
* Changed undo to not deselect Pokémon in menu
* Minor graphical changes

## v. 2.0.1 (November 28, 2017)
* Fixed journal scrolling bugs
* Fixed Undo not properly undoing failed catches
* Fixed issue with erasing party after sending Pokémon to cemetery
* Added 'Level Up' button for quick +1 leveling
* Fixed sprite issues with Mime Jr. and Mr. Mime
* Minor performance optimizations

## v. 2.0.0 (November 22, 2017)
* Completely redesigned user interface (dark theme available)
* New Game
	* Removed disabling genders, natures, abilities
	* Added rules list to keep track of your ruleset
* Save/Load Game
	* Changed file format from .txt to .json
	* Added function to download/upload save files to/from your computer
	* For save files from version 1, there is an Import v1 function to import your to proper v2 format
* Location (NEW): you can now keep track of your in-game location
* Journal
	* Added "Undo" button for the journal
	* Added "Export" button to export your journal in human-readable format
* Add Pokémon
	* Added support for gender forms, alternate forms, and shiny forms
	* Added check to see if you already caught a Pokemon at a certain location
* Catches (NEW)
	* Keep track of all your catches from adding Pokemon and their locations
	* If you failed a catch, report it here to keep track of it
* Bag (not implemented yet)
* Battle (not implemented yet)
* Added "Move Pokemon" button for better moving between Party/PC
* Pokemon options
	* Edit Pokemon: edit Pokemon attributes (level, form, item, evolution, etc)
	* Death: record Pokemon death, and it will be sent to the cemetery

## v. 1.0.6 (May 12, 2017)
* Fixed bug with evolving after loading a game
* Fixed compatibility issues with using Internet Explorer

## v. 1.0.5 (December 29, 2016)
* Fixed minor bug with loading files with different timestamp format

## v. 1.0.4 (November 25, 2016)
* Fixed major bug with giving/taking items, however this is not backwards-compatible so you may need to modify your logfiles.
	* To fix them, simply add quotes around item names (e.g. change 'Gave Oran Berry to Bulbasaur' to 'Gave "Oran Berry" to Bulbasaur')
* Fixed moves display when switching party members
* Fixed PC Withdraw button not enabling sometimes
* Pokemon that die now have their items removed
* Fixed bug with withdrawing from PC if box holds 10 or more Pokemon

## v. 1.0.3 (November 18, 2016)
* Fixed loading bug

## v. 1.0.2 (November 18, 2016)
* Fixed evolution not working
* Limited text inputs to prevent overflowing content messing up layout

## v. 1.0.1 (November 18, 2016)
* Fixed certain characters not showing (e.g. apostrophes)
* Fixed Nidorans, Farfetch'd, Mr. Mime, and Mime. Jr not showing
* Fixed party to update upon leveling or evolving
* Fixed bugs with loading games
* Removed some code redundancies

## v. 1.0.0 (November 17, 2016)
* Release!
