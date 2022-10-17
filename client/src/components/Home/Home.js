import React from 'react'
import Header from '../header/Header'
import Body from '../body/Body'
import { Route, Router, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import NotFound from '../utils/NotFound/NotFound'
import Login from '../body/Auth/Login'
import { path } from '../utils/constant'
import Profile from '../body/Profile'

function Home() {

    const auth = useSelector(state => state.auth)
    const { isLogged } = auth

    return (
        <>
            <Switch>
                <Route path="/" component={isLogged ? Header : null} />
            </Switch>
        </>
    )
}

export default Home