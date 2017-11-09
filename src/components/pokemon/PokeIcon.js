import React from 'react';

import defaultIcon from 'img/defaultIcon.png';
import icons from 'img/icons';

import normalize from 'utilities/normalize';

const getIcon = pokemon => {
  let icon;
  if (pokemon) {
    let {species, gender, form} = pokemon;
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
  return icon;
}

export default class PokeIcon extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {icon: getIcon(props.pokemon)};
  }

  componentWillReceiveProps(nextProps) {
    this.setState({icon: getIcon(nextProps.pokemon)});
  }

  render() {
    return (
      <img src={this.state.icon} />
    )
  }
}