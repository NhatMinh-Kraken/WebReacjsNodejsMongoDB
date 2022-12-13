import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Axios from 'axios';
import ProductCarAdminItem from './ProductCarAdminItem';


function ProductCarAdmin() {
    const [nametype, setNametype] = useState([])
    const [callback, setCallback] = useState(false)

    useEffect(() => {
        const getNameType = async () => {
            const res = await Axios.get('/api/nametype')
            setNametype(res.data)
        }
        getNameType()
    }, [callback])

    console.log(nametype)

    return (
        <>
            <div className='product-all col-12'>
                <div className='row'>
                    <div className='add-car d-flex pb-3 pt-3 pr-3'>
                        <Link to="/create-product" className='controll-add-car'><i className='fa-solid fa-plus'></i></Link>
                    </div>
                    {
                        nametype.map((nametypes) => {
                            return < ProductCarAdminItem key={nametypes._id} nametypes={nametypes} callback={callback} setCallback={setCallback} />
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default ProductCarAdmin