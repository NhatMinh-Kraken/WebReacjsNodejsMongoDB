import React from 'react'
import Header from '../header/Header'
import Body from '../body/Body'
import { Route, Router, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import NotFound from '../utils/NotFound/NotFound'

function Home() {

    const auth = useSelector(state => state.auth)
    const { isLogged } = auth
    return (
        <>

            <Switch>
                <Route path="" component={isLogged ? Header : null} />
            </Switch>


        </>
    )
}

export default Home