import React from "react";
import { connect } from "react-redux";

import "./PokeCard.css";

import male from "img/male.png";
import female from "img/female.png";

import getFullname from "utilities/getFullname";

import PokeIcon from "../PokeIcon";
import PokeSprite from "../sprite/PokeSprite";

import EditModal from "./EditModal";
import DeathModal from "./DeathModal";

import { editPokemon } from "actions";

const LevelUp = connect(
  null,
  dispatch => {
    return {
      onLevelUp: (index, level) => {
        dispatch(editPokemon(index, { level }));
      }
    };
  }
)(
  class extends React.Component {
    render() {
      let { index, level, cause } = this.props.pokemon;
      level = parseInt(level) + 1;

      if (!cause) {
        return (
          <Button
            bsStyle="primary"
            bsSize="xs"
            onClick={() => this.props.onLevelUp(index, level)}
          >
            Level Up
          </Button>
        );
      } else return "";
    }
  }
);

export default class PokeCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: props.pokemon,
      edit: false,
      death: false
    };
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      pokemon: nextProps.pokemon
    });
  }

  open(modal) {
    this.setState({ [modal]: true });
  }

  close(modal) {
    this.setState({ [modal]: false });
  }

  render() {
    let { pokemon, edit, death } = this.state;
    if (!pokemon) pokemon = {};
    const name = getFullname(pokemon);
    const moves = Array.isArray(pokemon.moves);

    return (
      <Panel
        className="poke-card"
        bsStyle={this.props.bsStyle}
        header={
          <Media>
            <Media.Left align="middle">
              <PokeIcon pokemon={pokemon} />
            </Media.Left>
            <Media.Body>
              <Media.Heading>
                <span className="name">{name ? name : "No Pokémon"}</span>&nbsp;
                {pokemon.gender == "M" ? (
                  <img className="gender" src={male} />
                ) : pokemon.gender == "F" ? (
                  <img className="gender" src={female} />
                ) : (
                  ""
                )}
              </Media.Heading>
              <span className={pokemon.level ? "" : "invisible"}>
                Level {pokemon.level}&nbsp;
                <LevelUp pokemon={pokemon} />
              </span>
              <br />
              <span
                className={"location " + (pokemon.method ? "" : "invisible")}
              >
                {pokemon.method ? pokemon.method : "?"} {pokemon.location}
              </span>
            </Media.Body>
            {pokemon.shiny && <Media.Right className="shiny">*</Media.Right>}
          </Media>
        }
      >
        <div className={this.props.pokemon ? "" : "invisible"}>
          <PokeSprite pokemon={pokemon} />
          <Table condensed>
            <tbody>
              <tr>
                <th width={125}>Form:</th>
                <td>{pokemon.form ? pokemon.form : "Normal"}</td>
              </tr>
              <tr>
                <th>Nature:</th>
                <td>{pokemon.nature}</td>
              </tr>
              <tr>
                <th>Ability:</th>
                <td>{pokemon.ability}</td>
              </tr>
              <tr>
                <th>Moves:</th>
                <td>
                  - {moves && pokemon.moves[0]} <br />-{" "}
                  {moves && pokemon.moves[1]} <br />-{" "}
                  {moves && pokemon.moves[2]} <br />-{" "}
                  {moves && pokemon.moves[3]}
                </td>
              </tr>
              {!pokemon.cause && (
                <tr>
                  <th>Item:</th>
                  <td>{pokemon.item}</td>
                </tr>
              )}
              {pokemon.cause && (
                <tr>
                  <th>Cause of Death:</th>
                  <td className="cause">
                    <div>{pokemon.cause}</div>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
          {!pokemon.cause && (
            <ButtonGroup justified>
              <Button
                bsStyle="warning"
                href="#"
                onClick={() => this.open("edit")}
              >
                Edit Pokémon
              </Button>
              <Button
                bsStyle="danger"
                href="#"
                onClick={() => this.open("death")}
              >
                Death
              </Button>
            </ButtonGroup>
          )}
        </div>

        <EditModal
          pokemon={pokemon}
          show={edit}
          onHide={() => this.close("edit")}
        />
        <DeathModal
          pokemon={pokemon}
          show={death}
          onHide={() => this.close("death")}
        />
      </Panel>
    );
  }
}
