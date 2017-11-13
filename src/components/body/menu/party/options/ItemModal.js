import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';

import getPokemon from 'utilities/getPokemon';
import getFullname from 'utilities/getFullname';

import PokeIcon from 'components/pokemon/PokeIcon';

import RRForm from 'components/form/RRForm';
import { RRFText } from 'components/form/RRFControls';

import { changeItem } from 'actions';

class ItemModal extends React.Component {
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
    this.dispatch(actions.focus('local.item'));
  }

  handleSubmit(values) {
    this.props.onChangeItem(this.props.index, values.item);
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
          <Modal.Header closeButton><h2>Change Item</h2></Modal.Header>
          <Modal.Body>
            <p>
              <PokeIcon pokemon={pokemon} />&nbsp;
              {getFullname(pokemon)}
            </p>
            <RRFText model='.item' label='Item' placeholder='Oran Berry' />
          </Modal.Body>
          <Modal.Footer>
            <Button type='submit' bsStyle='warning' bsSize='large' block>
              Change Item
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
    onChangeItem: (index, item) => {
        dispatch(changeItem(index, item));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemModal);