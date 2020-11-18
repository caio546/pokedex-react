import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Main from '../pages/Main';
import InfoPokemon from '../pages/InfoPokemon';
import Favourites from '../pages/Favourites';

function Routes() {
  return (
    <Switch>
      <Route path="/" component={Login} exact />
      <Route path="/main" component={Main} />
      <Route path="/infopokemon" component={InfoPokemon} />
      <Route path="/favourites" component={Favourites} />
    </Switch>
  );
}

export default Routes;
