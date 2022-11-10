import React, { useState } from 'react'
import OwlCarousel from 'react-owl-carousel';
import { Link } from 'react-router-dom';

function ProductCarAdminItem({ nametypes }) {
    const [isHover, setIsHover] = useState(false)

    const handleHover = () => {
        setIsHover(true)
    }

    const handleNotHover = () => {
        setIsHover(false)
    }

    const avatarJson = JSON.parse(nametypes.avatar)
    const oneJson = JSON.parse(nametypes.colortypeone)
    const twoJson = JSON.parse(nametypes.colortypetwo)
    const threeJson = JSON.parse(nametypes.colortypethree)

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
                <input type="checkbox" className="custom-control-inputs" style={{ opacity: isHover ? "1" : "0" }} id="customCheck1" />
                <Link to="/detail_product" className='product-card-link' >
                    <div className='product-car-header'>
                        <div className='product-card-name'>
                            <span>{nametypes.name}</span>
                        </div>
                        <div className='product-card-type'>
                            {
                                nametypes
                                && nametypes.CategoryData
                                && nametypes.CategoryData.name
                                && <span>{nametypes.CategoryData.name}</span>
                            }

                        </div>
                        <div className='product-card-money'>
                            <span>{nametypes.money}</span>
                        </div>
                    </div>
                    <div className='product-card-body'>
                        <OwlCarousel id="customer-testimonoals" className="product owl-carousel owl-theme" {...options}>
                            <div className='item p-0' style={{ width: "240px" }}>
                                <div className='product-card-img'>
                                    <img src={avatarJson.url} alt="0" />
                                </div>
                            </div>
                            <div className='item p-0' style={{ width: "240px" }}>
                                <div className='product-card-img'>
                                    <img src={oneJson.url} alt="1" />
                                </div>
                            </div>
                            <div className='item p-0' style={{ width: "240px" }}>
                                <div className='product-card-img'>
                                    <img src={twoJson.url} alt="2" />
                                </div>
                            </div>
                            <div className='item p-0' style={{ width: "240px" }}>
                                <div className='product-card-img'>
                                    <img src={threeJson.url} alt="3" />
                                </div>
                            </div>
                        </OwlCarousel>
                    </div>
                </Link>
                <div className={`product-car-control ${isHover ? "visible" : "hidden"} ${isHover ? "opacity-1" : "opacity-0"}`}>
                    <div className='product-car-detail heights-48'>
                        <Link to={`/edit-product/${nametypes.id}`} className='detail-product'><i className="fa-solid fa-pen-to-square d-flex pr-3"></i>Edit</Link>
                    </div>
                    <div className='product-car-detail heights-48'>
                        <Link to="/delete" className='detail-product'><i className="fa-solid fa-trash d-flex pr-3"></i>Delete</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductCarAdminItem