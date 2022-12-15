import React from 'react'
import Footer from '../footer/Footer'
import Header from '../header/Header'

import AdminMessager from './Profile/Profiles/AdminManager/Messager/AdminMessager'


function MessagerLayout() {
    return (
        <>
            <Header />
            <AdminMessager />
            <Footer />
        </>
    )
}

export default MessagerLayout