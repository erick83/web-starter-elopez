import React from 'react';
import ReactDOM from 'react-dom';

import moment from 'moment';

import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import IconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import IconUrl from 'leaflet/dist/images/marker-icon.png';
import ShadowUrl from 'leaflet/dist/images/marker-shadow.png';

import { ApolloProvider } from 'react-apollo';
import { client } from './utils/apollo';

import App from './App';
import * as serviceWorker from './serviceWorker';

import theme from './Theme';

import 'typeface-roboto';
// import { setContext } from 'apollo-link-context';
// import Cookies from 'universal-cookie';

// --------- Fix CDN icon import Error
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: IconRetinaUrl,
  iconUrl: IconUrl,
  shadowUrl: ShadowUrl
});
// ---------

// Configure moment to use shorthand relative time
moment.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: '%ds',
    ss: '%ds',
    m: '%dm',
    mm: '%dm',
    h: '%dh',
    hh: '%dh',
    d: '%dd',
    dd: '%dd',
    M: '%dm',
    MM: '%dm',
    y: '%dy',
    yy: '%dy'
  }
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </BrowserRouter>
  </MuiThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
