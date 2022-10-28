import React, { Fragment, useEffect } from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'

import { path } from '../src/components/utils/constant'
import Body from './components/body/Body';

import { useSelector, useDispatch } from 'react-redux'
import { dispatchLogin, fetchUser, dispatchGetUser } from './redux/action/authAction'
import Axios from 'axios';
import NotFound from './components/utils/NotFound/NotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProfieLayout from './components/body/ProfieLayout';
import Home from './components/Home';


function App() {

  const dispatch = useDispatch()
  const token = useSelector(state => state.token)
  const auth = useSelector(state => state.auth)
  const { isLogged } = auth

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
          <Route path={path.PRODUCTCAR} component={Home} />
          <Body />
          <Route path={path.PROFILE} component={(isLogged ? ProfieLayout : NotFound)} />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
