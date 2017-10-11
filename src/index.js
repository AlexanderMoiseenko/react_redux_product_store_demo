/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './containers';
import { Provider } from 'react-redux';
import ConnectedRouter from 'react-router-redux/ConnectedRouter';
import store, { history } from './store';
import registerServiceWorker from './registerServiceWorker';
import { ThemeProvider } from 'styled-components';
import theme from './styles/styles_js/theme';
import ErrorBoundary from './components/addons/ErrorBoundary';

const target = document.getElementById('root');


ReactDOM.render(
   <Provider store={store}>
      <ThemeProvider theme={theme}>
         <ConnectedRouter history={history}>
            <ErrorBoundary>
               <App store={store} />
            </ErrorBoundary>
         </ConnectedRouter>
      </ThemeProvider>
   </Provider>,
   target
);

registerServiceWorker();
