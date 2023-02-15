
import React, { useState } from 'react'

import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import OwlCarousel from 'react-owl-carousel';
import steering_wheel from '../../../assets/images/steering-wheel.png'

function ProductCarAllItem({ nametypes }) {
    const auth = useSelector(state => state.auth)

    const { isAdmin } = auth
    const [isHover, setIsHover] = useState(false)

    const handleHover = () => {
        setIsHover(true)
    }

    const handleNotHover = () => {
        setIsHover(false)
    }


    const options = {
        loop: true,
        center: true,
        items: 3,
        margin: 0,
        autoplay: true,
        dots: true,
        autoplayTimeout: 3500,
        smartSpeed: 450,
        nav: false,
        responsive: false
    };

    return (
        <>
            <div className='product-card col-4' onMouseEnter={handleHover} onMouseLeave={handleNotHover}>
                <Link to="/detail_product" className='product-card-link' >
                    <div className='product-car-header'>
                        <div className='product-card-name'>
                            <span>{nametypes.name}</span>
                        </div>
                        <div className='product-card-type pr-2'>
                            {
                                nametypes
                                && nametypes.type
                                && nametypes.type.name
                                && <span>{nametypes.type.name}</span>
                            }
                            -
                            {
                                nametypes.energy === 0 ? <span className='pl-2 font-weight-bold text-success'>Xe Xăng</span> : <span className='pl-2 font-weight-bold text-warning'>Xe Điện</span>
                            }
                        </div>
                        <div className='product-card-money'>
                            <span>{nametypes.money}</span>
                        </div>
                    </div>
                    <div className='product-card-body'>
                        <OwlCarousel id="customer-testimonoals" className="product owl-carousel owl-theme" {...options}>
                            {
                                nametypes.avatar.map((img, index) => (
                                    <div key={index} className='item p-0' style={{ width: "240px" }}>
                                        <div className='product-card-img'>
                                            <img src={img.url} alt={img.url} loading="lazy" />
                                        </div>
                                    </div>
                                ))
                            }
                        </OwlCarousel>
                    </div>
                </Link>
                <div className={`product-car-control ${isHover ? "visible" : "hidden"} ${isHover ? "opacity-1" : "opacity-0"}`}>
                    <div className='product-car-detail heights-48'>
                        <a href={`/detail_product/${nametypes._id}`} className='detail-product'><i className="fa-solid fa-circle-info d-flex pr-3"></i>Detail</a>
                    </div>
                    <div className='product-car-detail heights-48'>
                        <Link to="/3D" className='detail-product'><img src={steering_wheel} alt="steering" /><span>3D</span></Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductCarAllItem