import React from 'react';
import { Well, Grid, ButtonGroup } from 'react-bootstrap';

import ThemeSwitcher from './ThemeSwitcher';
import NewGameButton from './NewGameButton';
import SaveLoadGameButton from './SaveLoadGameButton';

export default class Header extends React.Component {
  render() {
    return (
      <Well bsSize='small'>
        <Grid>
          <h1 className='pull-left'>Nuzlog <small>v.1.1.0</small></h1>
          <ThemeSwitcher className='pull-right' />
          <ButtonGroup bsSize='large' justified>
            <NewGameButton />
            <SaveLoadGameButton />
          </ButtonGroup>
        </Grid>
      </Well>
    );
  }
}