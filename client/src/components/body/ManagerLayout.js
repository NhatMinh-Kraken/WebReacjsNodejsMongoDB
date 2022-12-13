import React from 'react'
import Footer from '../footer/Footer'
import Header from '../header/Header'
import AdminManager from './Profile/Profiles/AdminManager/AdminManager'


function ManagerLayout() {
    return (
        <>
            <Header />
            <AdminManager />
            <Footer />
        </>
    )
}

export default ManagerLayout