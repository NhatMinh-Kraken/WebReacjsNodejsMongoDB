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

    const handleCategory = (e) => {
        setCategory(e.target.value)
    }

    return (
        <>
            <div className='ProductCar-Button'>
                <div className='ProductCar-Button-item'>
                    <div className='ProductCar-Button-Group-item'>
                        <button className="Product-Button-1" value={category} onClick={handleCategory}><span>Tất cả các dòng xe</span></button>
                        {
                            categories.map((ct) => (
                                ct.checkThinhHanh === 1 ? <button key={"type=" + ct._id} value={"type=" + ct._id} className="Product-Button-1" onClick={handleCategory}><span>{ct.name}</span></button> : null
                            ))
                        }


                        {/* <select name="category" value={category} onChange={handleCategory} >
                            <option value=''>All Products</option>
                            {
                                categories.map(category => (
                                    <option value={"type=" + category._id} key={category._id}>
                                        {category.name}
                                    </option>
                                ))
                            }
                        </select> */}


                        {/* <NavLink to="/mercedes_eq" className={({ isActive }) => (isActive ? 'Product-Button-2 active' : 'Product-Button-2')}><span>Mercedes-EQ</span></NavLink>
                        <NavLink to="/amg" className={({ isActive }) => (isActive ? 'Product-Button-3 active' : 'Product-Button-3')}><span>AMG</span></NavLink>
                        <NavLink to="/maybach" className={({ isActive }) => (isActive ? 'Product-Button-4 active' : 'Product-Button-4')}><span>MayBach</span></NavLink> */}
                    </div>
                </div>
            </div>
            <div className='ProductCar-Body-item d-flex col-12'>
                <div className='Product-Item-Controll d-flex col-3'>
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
                <div className='Product-Item d-flex col-9'>

                    <>
                        <ProductCarAll />
                    </>
                    {/* <Switch>
                        <Route path="/all_car" component={ProductCarAll} />
                        <Route path="/mercedes_eq">mercedes_eq</Route>
                        <Route path="/amg">AMG</Route>
                        <Route path="/maybach">MayBach</Route>
                        <Route path="/Energy">Energy</Route>
                        <Route path="/Sedans">Sedans</Route>
                        <Route path="/USV">USV</Route>
                        <Route path="/Coupe">Coupe</Route>
                    </Switch> */}
                </div>
            </div>
        </>
    )
}

export default ProductCarContr