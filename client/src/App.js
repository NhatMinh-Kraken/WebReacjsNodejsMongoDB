import React, { useEffect, useRef, useState } from 'react'
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

import DeatailProduct from './components/ProductCar/Detail/DeatailProduct'

import AOS from 'aos'
import "aos/dist/aos.css";
import Loadding from './components/utils/Loadding/loadding';

import ManagerLayout from './components/body/ManagerLayout';
import MessagerLayout from './components/body/MessagerLayout';

import { DataProviderNew } from './GlobalState '
import LaiThu from './components/ProductCar/LaiThu/LaiThu';

import BaoDuong from './components/BaoDuong/BaoDuong';
import QuyTrinhBaoDuong from './components/body/Profile/Profiles/AdminManager/QuyTrinhBaoDuong/QuyTrinhBaoDuong';
import Text from '../../client/src/Text';



function App() {

  const dispatch = useDispatch()
  const token = useSelector(state => state.token)
  const auth = useSelector(state => state.auth)
  const { isLogged, isAdmin } = auth

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
      setLoading(false)
    }
  }, [auth.isLogged, dispatch])

  useEffect(() => {
    if (token) {
      const gettUser = () => {
        dispatch(dispatchLogin())

        return fetchUser(token).then(res => {
          dispatch(dispatchGetUser(res))
        })
      }
      gettUser()
    }
  }, [token, dispatch])

  if (loading) {
    return <div><Loadding /></div>
  }

  return (
    <DataProviderNew>
      <Router>
        <div className="App">
          {/* <Route path={path.PRODUCTCAR} component={Home} /> */}
          <Route path={path.HOME} component={Home} exact />
          <Route path="/datlich-baoduong" component={BaoDuong} exact />
          <Route path="/detail_product/:id" component={DeatailProduct} exact />
          <Route path="/dangky_laithu/:id" component={LaiThu} exact />
          <Body />
          <Route path={path.PROFILE} component={(isLogged ? ProfieLayout : NotFound)} />
          <Route path='/manager' component={(isAdmin ? ManagerLayout : NotFound)} />
          <Route path='/quytrinh-bao-duong/:id' component={(isAdmin ? QuyTrinhBaoDuong : NotFound)} exact />
          <Route path='/all-messager' component={(isAdmin ? MessagerLayout : NotFound)} />

          <Route path='/text' component={(isAdmin ? Text : NotFound)} />

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
    </DataProviderNew>
  );
}

export default App;
