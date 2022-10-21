import React from 'react'
import Header from './header/Header'
import SliderHomePage from './Slider/SliderHomePage'
import Review from './Recommendations/Review/Review'
import NavHomePage from './NavHomePage/NavHomePage'

function Home() {
    return (
        <>
            <Header />
            <NavHomePage />
            <SliderHomePage />
            <Review />
        </>

    )
}

export default Home