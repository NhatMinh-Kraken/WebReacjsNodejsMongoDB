import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import ProfileAllUser from './ProfileAllUser'
import ProfileItem from './ProfileItem'

import EditRoleUser from './EditRoleUser'
import NotFound from '../../utils/NotFound/NotFound'


function ProfileRoute() {
    const auth = useSelector(state => state.auth)
    const { user, isLogged, isAdmin } = auth
    return (
        <Switch>
            <Route path="/profileuser" component={isLogged ? ProfileItem : NotFound} exact />
            <Route path="/all-user" component={isLogged ? ProfileAllUser : NotFound} exact />
            <Route path="/edit_user/:id" component={isAdmin ? EditRoleUser : NotFound} exact />
            <Route path="/address" exact>
                <div>address</div>
            </Route>
            <Route path="/changePassword" exact>
                <div>changePassword</div>
            </Route>
        </Switch>
    )
}

export default ProfileRoute