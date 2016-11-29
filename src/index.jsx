import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
require('normalize.css')
import App from './app.jsx';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
require('es6-promise').polyfill();

render(<AppContainer>
  <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
    <App />
  </MuiThemeProvider>
</AppContainer>, document.querySelector("#app"));

if (module.hot) {
  module.hot.accept('./app.jsx', () => {
    const App = require('./app.jsx').default;
    render(
      <AppContainer>
        <App />
      </AppContainer>,
      document.querySelector("#app")
    );
  });
}
