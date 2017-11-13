import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';

import getPokemon from 'utilities/getPokemon';
import getFullname from 'utilities/getFullname';

import PokeIcon from 'components/pokemon/PokeIcon';

import RRForm from 'components/form/RRForm';
import { RRFText } from 'components/form/RRFControls';

import { death } from 'actions';

class DeathModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: getPokemon(props.party[props.index])
    };
    this.handleEnter = this.handleEnter.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({
      pokemon: getPokemon(nextProps.party[nextProps.index])
    });
  }

  handleEnter() {
    this.dispatch(actions.focus('local.cause'));
  }

  handleSubmit(values) {
    this.props.onDeath(this.props.index, values.cause);
    this.props.onHide();
  }

  render() {
    const {pokemon} = this.state;
    
    return (
      <Modal
        show={this.props.show}
        onEnter={this.handleEnter}
        onHide={this.props.onHide}>
        <RRForm
          getDispatch={dispatch => this.dispatch = dispatch}
          onSubmit={this.handleSubmit}>
          <Modal.Header closeButton><h2>Death</h2></Modal.Header>
          <Modal.Body>
            <p>
              <PokeIcon pokemon={pokemon} />&nbsp;
              {getFullname(pokemon)}
            </p>
            <RRFText model='.cause' label='Cause of Death*'
              placeholder='Freaking crit' required />
          </Modal.Body>
          <Modal.Footer>
            <h4 style={{color: 'red'}}>
              WARNING: Once a Pokémon dies, you cannot bring it back to life!
            </h4>
            <Button type='submit' bsStyle='danger' bsSize='large' block>
              Death
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
    onDeath: (index, cause) => {
        dispatch(death(index, cause));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeathModal);