import React, { useEffect, useRef } from 'react'
import Header from './header/Header'
import SliderHomePage from './Slider/SliderHomePage'
import Review from './Recommendations/Review/Review'
import NavHomePage from './NavHomePage/NavHomePage'
import ProductCar from './ProductCar/ProductCar'
import Footer from './footer/Footer'

import { io } from 'socket.io-client'
import { useSelector } from 'react-redux'

function Home() {
    const auth = useSelector(state => state.auth)
    const { user } = auth
    const socket = useRef()

    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        socket.current.emit("allUser", user)
    }, [user])

    return (
        <>
            <Header />
            <NavHomePage />
            <SliderHomePage />
            <Review />
            <ProductCar />
            <Footer />
        </>

    )
}

export default Home