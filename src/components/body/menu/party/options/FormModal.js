import React from 'react';
import { Modal, Panel, FormGroup, FormControl, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';

import pokedex from 'data/pokedex';

import normalize from 'utilities/normalize';
import getPokemon from 'components/pokemon/getPokemon';
import getFullname from 'components/pokemon/getFullname';

import PokeIcon from 'components/pokemon/PokeIcon';
import PokeSprite from 'components/pokemon/PokeSprite';

import RRForm from 'components/form/RRForm';
import { RRFCombobox } from 'components/form/RRFControls';

import { changeForm } from 'actions';

const getForms = pokemon => {
  let forms = ['Normal'];
  if (pokemon) {
    const entry = pokedex.get(normalize(pokemon.species));
    if (entry && entry.forms) {
      forms = forms.concat(entry.forms);
    }
  }
  return forms;
}

class FormModal extends React.Component {
  constructor(props) {
    super(props);
    const pokemon = getPokemon(props.party[props.index]);
    this.state = {
      pokemon,
      forms: getForms(pokemon)
    };

    this.handleEnter = this.handleEnter.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const pokemon = getPokemon(nextProps.party[nextProps.index]);
    this.setState({
      pokemon,
      forms: getForms(pokemon)
    });
  }

  handleEnter() {
    this.dispatch(actions.focus('local.form'));
  }

  handleChange(form) {
    this.setState(({pokemon}) => ({
      pokemon: {...pokemon, form}
    }));
  }

  handleSubmit(values) {
    this.props.onChangeForm(this.props.index, values.form);
    this.props.onHide();
  }

  render() {
    const {pokemon, forms} = this.state;

    return (
      <Modal
        show={this.props.show}
        onEnter={this.handleEnter}
        onHide={this.props.onHide}>
        <RRForm
          getDispatch={dispatch => this.dispatch = dispatch}
          onUpdate={this.handleUpdate}
          onSubmit={this.handleSubmit}>
          <Modal.Header closeButton><h2>Change Form</h2></Modal.Header>
          <Modal.Body>
            <p><PokeIcon pokemon={pokemon} /> {getFullname(pokemon)}</p>
            <PokeSprite pokemon={pokemon} />
            <RRFCombobox
              model='.form'
              label='Form'
              placeholder='Normal'
              onChange={this.handleChange}
              defaultValue={pokemon.form}>
              {forms}
            </RRFCombobox>
          </Modal.Body>
          <Modal.Footer>
            <Button type='submit' bsStyle='warning' bsSize='large' block>
              Change Form
            </Button>
          </Modal.Footer>
        </RRForm>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    party: state.party
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onChangeForm: (index, form) => {
        dispatch(changeForm(index, form));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormModal);