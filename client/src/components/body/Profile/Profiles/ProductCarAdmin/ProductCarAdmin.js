import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import steering_wheel from '../../../../../assets/images/steering-wheel.png'
import Axios from 'axios';
import ProductCarAdminItem from './ProductCarAdminItem';


function ProductCarAdmin() {
    const [nametype, setNametype] = useState([])

    useEffect(() => {
        const getNameType = async () => {
            const res = await Axios.get('/api/nametype')
            setNametype(res.data)
        }
        getNameType()
    }, [])


    return (
        <>
            <div className='product-all col-12'>
                <div className='row'>
                    <div className='add-car d-flex pb-3 pt-3 pr-3'>
                        <Link to="/create-product" className='controll-add-car'><i className='fa-solid fa-plus'></i></Link>
                    </div>
                    {
                        nametype.map((nametypes) => {
                            return < ProductCarAdminItem key={nametypes.id} nametypes={nametypes} />
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default ProductCarAdmin