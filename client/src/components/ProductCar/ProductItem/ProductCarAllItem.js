import React from 'react'
import { Link } from 'react-router-dom'

function ProductCarAllItem({ nametypes }) {

    return (
        <>
            <div className='product-card'>
                <div className='product-car-header'>
                    <div className='product-card-name'>
                        <span>{nametypes.name}</span>
                    </div>
                    <div className='product-card-type'>
                        {
                            nametypes && nametypes.CategoryData && nametypes.CategoryData.name
                            &&
                            <span>{nametypes.CategoryData.name}</span>
                        }

                    </div>
                    <div className='product-card-money'>
                        <span>{nametypes.money}</span>
                    </div>
                </div>
                <div className='product-card-body'>
                    <div className='product-card-img'>
                        <img src={nametypes.avatar} alt="" />
                    </div>
                    <div className='product-car-img-mini'>
                        <div className='img-mini'>
                            <img src={nametypes.colortypeone} alt="1" />
                            <img src={nametypes.colortypetwo} alt="2" />
                            <img src={nametypes.colortypethree} alt="3" />
                        </div>
                    </div>
                </div>
                <div className='product-car-control'>
                    <div className='product-car-detail'>
                        <Link to="/detail_product" className='detail-product'>detail</Link>
                    </div>
                    <div className='product-car-add-cart'>
                        Add
                    </div>
                    <div className='product-car-advise'>
                        Advise
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductCarAllItem