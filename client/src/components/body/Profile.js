import React from 'react'
import Header from '../header/Header'
import ProfileUser from './Profile/ProfileUser'

import { Link, Route, Switch } from 'react-router-dom'


function Profile() {
    return (
        <>
            <Header />
            <ProfileUser />
        </>
    )
}

export default Profile