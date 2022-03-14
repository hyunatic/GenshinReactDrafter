import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Main from '../pages/Main';



class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Main} /> 
        <Route render={() => <h1>Not Found</h1>} />
      </Switch>
    );
  }
}

export default Routes;