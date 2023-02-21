
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

    const formatMoney = Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(nametypes.money)

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
                <Link to={`/detail_product/${nametypes._id}`} className='product-card-link' >
                    <div className='product-car-header'>
                        <div className='product-card-name'>
                            <span>{nametypes.name}</span>
                        </div>
                        <div className='product-card-type'>
                            {
                                nametypes
                                && nametypes.type
                                && nametypes.type.name
                                && <span className='pr-2'>{nametypes.type.name}</span>
                            }
                            -
                            {
                                nametypes.energy === 0 ? <span className='pl-2 font-weight-bold text-success'>Xe Xăng</span> : <span className='pl-2 font-weight-bold text-warning'>Xe Điện</span>
                            }
                        </div>
                        <div className='product-card-money'>
                            <span>Giá từ: {formatMoney}</span>
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
                        <a href={`/detail_product/${nametypes._id}`} className='detail-product'><i className="fa-solid fa-circle-info d-flex pr-3"></i>Tìm hiểu thêm</a>
                    </div>
                    {
                        nametypes.laithu === 1
                            ?
                            <>
                                <div className='product-car-detail heights-48'>
                                    <Link to={`/dangky_laithu/${nametypes._id}`} className='detail-product'><img src={steering_wheel} alt="steering" /><span>Đăng ký lái thử</span></Link>
                                </div>
                            </>
                            :
                            null
                    }
                </div>
            </div>
        </>
    )
}

export default ProductCarAllItem