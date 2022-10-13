import React from 'react'
import Header from '../header/Header'
import ProfileUser from './Profile/ProfileUser'
import ProfileItem from './Profile/ProfileItem'

import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import ProfileRoute from './Profile/ProfileRoute'


function Profile() {
    return (
        <>
            {/* <Header /> */}
            <div className='profile_page pt-5'>
                <div className='container'>
                    <div className='profile_page_body'>
                        <div className='row'>
                            <Router basename='/profile'>
                                <ProfileUser />
                                <ProfileRoute />
                            </Router>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile