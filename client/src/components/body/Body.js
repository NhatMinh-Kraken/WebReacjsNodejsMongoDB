import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Login from './Auth/Login';
import Register from './Auth/Register';
import ForgotPassword from './Auth/ForgotPassword';
import ResetPassword from './Auth/ResetPassword';

import ActivationEmail from './Auth/ActivationEmail';
import { path } from '../utils/constant'
import NotFound from '../utils/NotFound/NotFound';

import { useSelector } from 'react-redux'
import Home from '../Home';



function Body() {
  const auth = useSelector(state => state.auth)
  const { isLogged } = auth

  return (
    <section>
      <Switch>
        <Route path={path.LOGIN} component={(isLogged ? NotFound : Login)} exact />
        <Route path={path.REGISTER} component={(isLogged ? NotFound : Register)} exact />
        <Route path={path.FORGOTPASSWORD} component={ForgotPassword} exact />
        <Route path={path.RESETPASSWORD} component={ResetPassword} exact />
        <Route path="/user/activation/:activation_token" component={ActivationEmail} exact />
      </Switch>
    </section>
  )
}

export default Body