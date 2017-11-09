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
      let {name, gender, form} = nextProps.pokemon;
      name = normalize(name);
      form = normalize(form);

      icon = icons[name + '-' + form];
      if (!icon) {
        if (gender != 'F') {
          icon = icons[name];
        } else {
          icon = icons[name + '-f'];
          if (!icon) icon = icons[name];
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