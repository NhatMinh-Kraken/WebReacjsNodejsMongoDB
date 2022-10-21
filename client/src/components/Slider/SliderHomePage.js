import React, { useState, useEffect } from 'react';
import './SliderHomePage.scss'
import { sliderData } from "./Slider-Data";


const SliderHomePage = () => {

    // render() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slideLength = sliderData.length;
    // slideLength = 123
    //CurrentSlide = 0 1 2 

    const autoScroll = true;
    let slideInterval;
    let intervalTime = 3000;

    const nextSlide = () => {
        setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1)
    };

    const prevSlide = () => {
        setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1)
    };

    function auto() {
        slideInterval = setInterval(nextSlide, intervalTime)
    }

    useEffect(() => {
        setCurrentSlide(0)
    }, [])

    useEffect(() => {
        if(autoScroll){
            auto();
        }
        return() => clearInterval(slideInterval);
    }, [currentSlide])

    return (
        <div className='slider'>
            <div className='OutlineArrow'>
                <div className="arrow prev" onClick={prevSlide}>
                    <i className="fa fa-angle-left"></i>
                </div>
                <div className="arrow next" onClick={nextSlide}>
                    <i className="fa fa-angle-right"></i>
                </div>
            </div>


            {sliderData.map((slide, index) => {
                return (
                    <div className={index === currentSlide ? "slide current" : "slide"} key={index}>
                        {index === currentSlide && (
                            <div className='item-picture'>
                                <img src={slide.image} alt="picture" />
                                <div className='slider-content'>
                                    <h2>{slide.heading}</h2>
                                    <p>{slide.desc}</p>
                                    <hr />
                                    <button className='btn btn-primary'>Get Started</button>
                                </div>
                            </div>
                        )}
                    </div>
                )
            })}

        </div>
    );
}

// }




export default SliderHomePage;
