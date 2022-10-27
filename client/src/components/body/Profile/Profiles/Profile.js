import React from 'react'
import ProfileUser from './ProfileUser'

import { BrowserRouter as Router } from 'react-router-dom'
import ProfileRoute from './ProfileRoute'

function Profile() {
    return (
        <>
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