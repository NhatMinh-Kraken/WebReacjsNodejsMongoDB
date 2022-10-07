import React, { Fragment } from 'react'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'

import { path } from '../src/components/utils/constant'
import Login from './components/body/Auth/Login';
import Home from './components/Home/Home';
import Register from './components/body/Auth/Register';
import ActivationEmail from './components/body/Auth/ActivationEmail';

function App() {
  return (
    <Fragment>
      <Router>
        <div className="App">
          <Switch>
            <Route path={path.HOME} exact component={(Home)} />
            <Route path={path.LOGIN} component={(Login)} />
            <Route path={path.REGISTER} component={(Register)} />

            <Route path="/user/activation/:activation_token" component={ActivationEmail} exact />
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
