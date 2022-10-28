import React from 'react'
import { NavLink } from 'react-router-dom'

function ProductCarRouter() {
    return (
        <>
            <div className='ProductCar-Button'>
                <div className='ProductCar-Button-item'>
                    <div className='ProductCar-Button-Group-item'>
                        <NavLink to="/all_car" className={({ isActive }) => (isActive ? 'Product-Button-1 active' : 'Product-Button-1')}><span>Tất cả các dòng xe</span></NavLink>
                        <NavLink to="/mercedes_eq" className={({ isActive }) => (isActive ? 'Product-Button-2 active' : 'Product-Button-2')}><span>Mercedes-EQ</span></NavLink>
                        <NavLink to="/amg" className={({ isActive }) => (isActive ? 'Product-Button-3 active' : 'Product-Button-3')}><span>AMG</span></NavLink>
                        <NavLink to="/maybach" className={({ isActive }) => (isActive ? 'Product-Button-4 active' : 'Product-Button-4')}><span>MayBach</span></NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductCarRouter