import React from 'react';

import defaultIcon from 'img/defaultIcon.png';
import icons from 'img/icons';

import normalize from 'utilities/normalize';

export default class PokeIcon extends React.PureComponent {
  constructor() {
    super();
    this.state = {icon: defaultIcon};
  }

  componentWillReceiveProps(nextProps) {
    let icon;
    if (nextProps.pokemon) {
      let {species, gender, form} = nextProps.pokemon;
      species = normalize(species);
      form = normalize(form);

      icon = icons[species + '-' + form];
      if (!icon) {
        if (gender != 'F') {
          icon = icons[species];
        } else {
          icon = icons[species + '-f'];
          if (!icon) icon = icons[species];
        }
      }
    }
    if (!icon) icon = defaultIcon;
    this.setState({icon});
  }

  render() {
    return (
      <img src={this.state.icon} />
    )
  }
}