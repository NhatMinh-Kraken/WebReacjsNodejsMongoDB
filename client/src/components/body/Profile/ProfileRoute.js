import React from 'react'
import { Route, Switch } from 'react-router-dom'
import ProfileItem from './ProfileItem'

function ProfileRoute() {
    return (
        <Switch>
            <Route path="/profileuser" component={ProfileItem} exact />
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