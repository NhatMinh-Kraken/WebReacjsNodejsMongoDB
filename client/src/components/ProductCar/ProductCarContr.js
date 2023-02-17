import React, { useContext, useEffect, useState } from 'react'
import { NavLink, Route, Switch } from 'react-router-dom'

import Sedans from '../../assets/images/sedan-car-model.png'
import SUV from '../../assets/images/car-suv.png'
import Coupe from '../../assets/images/coupe-car.png'
import ProductCarAll from './ProductCarAll'
import Axios from 'axios'

import { GlobalState } from '../../GlobalState '

function ProductCarContr() {

    const state = useContext(GlobalState)
    const [categories] = state.categoriesAPI.categories
    const [category, setCategory] = state.productsAPI.category
    const [products, setProducts] = state.productsAPI.products

    return (
        <>
            <div className='ProductCar-Button'>
                <div className='ProductCar-Button-item'>
                    <div className='ProductCar-Button-Group-item'>
                        <button className={category === "" ? "Product-Button-1 active" : "Product-Button-1"} value='' onClick={e => setCategory("")}><span>Tất cả các dòng xe</span></button>
                        {
                            categories?.map((ct) => (
                                ct.checkThinhHanh === 1 ? <button key={"type=" + ct._id} value={"type=" + ct._id} className={category === "type=" + ct._id ? "Product-Button-1 active" : "Product-Button-1"} onClick={e => setCategory("type=" + ct._id)}><span>{ct.name}</span></button> : null
                            ))
                        }

                    </div>
                </div>
            </div>
            <div className='ProductCar-Body-item d-flex col-12'>
                <>
                    <ProductCarAll nametype={products} />
                </>
            </div>
        </>
    )
}

export default ProductCarContr