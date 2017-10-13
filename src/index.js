import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { combineForms } from 'react-redux-form';

import App from './components/App';

const store = createStore(combineForms({
}));

const root = document.getElementById('root');
const render = Component => (
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>, root
  )
)

render(App);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NewApp = require('./components/App').default;
    render(NewApp);
  })
}