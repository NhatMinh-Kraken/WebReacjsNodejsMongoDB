import React, { Fragment, useEffect } from 'react'
import { Route, Switch, BrowserRouter as Router, Link } from 'react-router-dom'

import { path } from '../src/components/utils/constant'
import Login from './components/body/Auth/Login';
import Home from './components/Home/Home';
import Register from './components/body/Auth/Register';
import ActivationEmail from './components/body/Auth/ActivationEmail';

import { useSelector, useDispatch } from 'react-redux'

import { dispatchLogin, fetchUser, dispatchGetUser } from './redux/action/authAction'
import Axios from 'axios';


function App() {

  const dispatch = useDispatch()
  const token = useSelector(state => state.token)
  const auth = useSelector(state => state.auth)


  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin')
    if (firstLogin) {
      const getToken = async () => {
        const res = await Axios.post('/user/refresh_token', null)
        dispatch({ type: 'GET_TOKEN', payload: res.data.access_token })
      }
      getToken()
    }
  }, [auth.isLogged, dispatch])

  useEffect(() => {
    if (token) {
      const getUser = () => {
        dispatch(dispatchLogin())

        return fetchUser(token).then(res => {
          dispatch(dispatchGetUser(res))
        })
      }
      getUser()
    }
  }, [token, dispatch])

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
