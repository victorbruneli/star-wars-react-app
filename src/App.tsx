import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import People from './pages/People';
import Films from './pages/Films';
import Starships from './pages/Starship';
import Vehicles from './pages/Vehicles';
import Species from './pages/Species';
import Planets from './pages/Planets';

import './App.css';

function App() {
  return (
    <div>
      <BrowserRouter>

        <div className="menu">
          <Link to="people">People</Link>
          <Link to="films">Films</Link>
          <Link to="starships">Starships</Link>
          <Link to="vehicles">Vehicles</Link>
          <Link to="species">Species</Link>
          <Link to="planets">Planets</Link>
        </div>

        <Switch>
          <Route path="/" exact>
            <People title="PESSOAS LEGAIS"></People>
          </Route>

          <Route path="/people">
            <People></People>
          </Route>

          <Route path="/films">
              <Films></Films>
          </Route>

          <Route path="/starships">
            <Starships></Starships>
          </Route>

          <Route path="/vehicles">
            <Vehicles></Vehicles>
          </Route>

          <Route path="/species">
            <Species></Species>
          </Route>

          <Route path="/planets">
            <Planets></Planets>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;