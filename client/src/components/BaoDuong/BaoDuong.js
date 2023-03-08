import React from 'react'
import Footer from '../footer/Footer'
import Header from '../header/Header'
import NavHomePage from '../NavHomePage/NavHomePage'
import FormBaoDuong from './FormBaoDuong'

import { UseContextProviderBaoDuong } from './FormThongTinBaoDuong/FormThongTinBaoDuong'

function BaoDuong() {
    return (
        <>
            <Header />
            <NavHomePage />
            <UseContextProviderBaoDuong>
                <FormBaoDuong />
            </UseContextProviderBaoDuong>
            <Footer />
        </>
    )
}

export default BaoDuong