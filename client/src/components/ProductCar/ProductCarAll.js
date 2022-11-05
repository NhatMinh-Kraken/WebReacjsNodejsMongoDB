import Axios from 'axios'
import React, { useEffect, useState } from 'react'

import ProductCarAllItem from './ProductItem/ProductCarAllItem'

function ProductCarAll() {
    const [nametype, setNametype] = useState([])

    useEffect(() => {
        const getNameType = async () => {
            const res = await Axios.get('/api/nametype')
            setNametype(res.data)
        }
        getNameType()
    }, [])

    return (
        <div className='product-all'>
            {
                nametype.map((nametypes) => {
                    return < ProductCarAllItem key={nametypes.id} nametypes={nametypes} />
                })
            }
        </div>
    )
}

export default ProductCarAll