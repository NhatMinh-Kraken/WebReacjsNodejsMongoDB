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
                {/* <div className='Product-Item-Controll d-flex col-3'>
                    <div className='Product_Item_Controll-Energy'>
                        <h2>Loại nhiên liệu</h2>
                        <div className='Product_Item_Energy'>
                            <NavLink to="/Energy" className={({ isActive }) => (isActive ? 'Product-Item-Energy active' : 'Product-Item-Energy')}><i className="fa-solid fa-charging-station"></i><span>Điện</span></NavLink>
                        </div>
                    </div>
                    <div className='Product_Item_Controll-Body'>
                        <h2>Loại thân xe</h2>
                        <div className='Product_Item_Img'>
                            <NavLink to="/Sedans" className={({ isActive }) => (isActive ? 'Product-Item-Car active' : 'Product-Item-Car')}><img src={Sedans} /><span>Xe Sedans</span></NavLink>
                            <NavLink to="/USV" className={({ isActive }) => (isActive ? 'Product-Item-Car active' : 'Product-Item-Car')}><img src={SUV} /><span>Xe địa hình / SUV</span></NavLink>
                            <NavLink to="/Coupe" className={({ isActive }) => (isActive ? 'Product-Item-Car active' : 'Product-Item-Car')}><img src={Coupe} /><span>Xe Coupe</span></NavLink>
                        </div>
                    </div>
                </div>
                <div className='Product-Item d-flex col-9'> */}
                <>
                    <ProductCarAll nametype={products} />
                    {/* {
                            category === ""
                                ?
                                <>
                                    <span> Đang tạo</span>
                                </>
                                :
                                <>
                                    <ProductCarAll nametype={products} />
                                </>
                        } */}
                </>
                {/* </div> */}
            </div>
        </>
    )
}

export default ProductCarContr