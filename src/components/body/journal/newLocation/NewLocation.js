import React from 'react';
import { FormGroup, ControlLabel, InputGroup, FormControl,
  Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import './NewLocation.css';

import { newLocation } from 'actions';

class NewLocation extends React.Component {
  constructor() {
    super();
    this.state = {location: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({location: e.target.value});
  }

  handleSubmit(e) {
    const {location} = this.state;
    if (location && location != this.props.location) {
      this.props.newLocation(location);
      this.setState({location: ''});
    }
    e.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} autoComplete='off' noValidate>
        <FormGroup controlId='location'>
          <ControlLabel>Current Location</ControlLabel>
          <InputGroup>
            <InputGroup.Addon>
              <div id='current-location'>{this.props.location}</div>
            </InputGroup.Addon>
            <FormControl type='text' value={this.state.location}
              onChange={this.handleChange} />
            <InputGroup.Button>
              <Button type='submit' bsStyle='warning'>New Location</Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
      </form>
    )
  }
}

const mapStateToProps = state => {
  return {
    location: state.location
  };
};

const mapDispatchToProps = dispatch => {
  return {
    newLocation: location => dispatch(newLocation(location))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewLocation);