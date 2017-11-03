import React from 'react';

export default class Pokemon {
  constructor({
    species,
    nickname,
    gender,
    level,
    shiny,
    form,
    nature,
    ability,
    moves,
    item,
    method,
    location
  }) {
    this.species = species;
    this.nickname = nickname;
    this.name = nickname ? nickname : species;
    this.gender = gender;
    this.level = level;
    this.shiny = shiny;
    this.form = form;
    this.nature = nature;
    this.ability = ability;
    this.moves = moves;
    this.item = item;
    this.method = method;
    this.location = location;
  }

  static export(pokemon) {
    let text = pokemon.species;
    if (pokemon.form)
      text += "-" + pokemon.form;
    if (pokemon.nickname)
      text = pokemon.nickname + " (" + text + ")";
    
    if (pokemon.gender && pokemon.gender != "N")
      text += " (" + pokemon.gender + ")";
    if (pokemon.item)
      text += " @ " + pokemon.item;
    
    if (pokemon.ability)
      text += "\nAbility: " + pokemon.ability;
    
    text += "\nLevel: " + pokemon.level;
    text += pokemon.shiny ? "\nShiny: Yes" : "";
    
    if (pokemon.nature)
      text += "\n" + pokemon.nature + " Nature";
    
    if (pokemon.moves) {
      for (let i = 0; i < pokemon.moves.length; i++)
        text += "\n- " + pokemon.moves[i];
    }
    
    text += "\n" + pokemon.method + " " + pokemon.location;
    return text;
  }

  static exportReact(pokemon) {
    return (
      <span>
        {Pokemon.export(pokemon).split('\n').map((line, index) => (
          <span key={index}>{line}<br/></span>
        ))}
      </span>
    )
  }
}