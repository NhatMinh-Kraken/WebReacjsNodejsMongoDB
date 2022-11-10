import React, { Fragment, useEffect, useState } from 'react'
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

import AOS from 'aos'
import "aos/dist/aos.css";
import Loadding from './components/utils/Loadding/loadding';


function App() {

  const dispatch = useDispatch()
  const token = useSelector(state => state.token)
  const auth = useSelector(state => state.auth)
  const { isLogged } = auth

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    AOS.init();
    const firstLogin = localStorage.getItem('firstLogin')
    if (firstLogin) {
      const getToken = async () => {
        setLoading(true)
        const res = await Axios.post('/user/refresh_token', null)
        dispatch({ type: 'GET_TOKEN', payload: res.data.access_token })
        setLoading(false)

        setTimeout(() => {
          getToken()
        }, 10 * 60 * 1000)
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

  if (loading) {
    return <div><Loadding /></div>
  }

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
