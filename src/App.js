import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import SearchPage from './components/SearchPage';
import RestPage from './components/RestPage';
import MapTest from './components/MapTest';

import * as ROUTES from './utils/routes';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path={ROUTES.SEARCH} component={SearchPage} />
          <Route exact path={ROUTES.REST + '/:id'} component={RestPage} />
          <Route exact path={ROUTES.MAP_TEST} component={MapTest} />
        </Switch>
      </div>
    );
  }
}

export default App;
