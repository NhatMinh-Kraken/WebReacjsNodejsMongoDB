import Axios from 'axios'
import React, { useEffect, useState } from 'react'

import ProductCarAllItem from './ProductItem/ProductCarAllItem'

function ProductCarAll({ nametype }) {

    return (
        <div className='product-all col-12'>
            <div className='row'>
                {
                    nametype.map((nametypes) => {
                        return < ProductCarAllItem key={nametypes._id} nametypes={nametypes} />
                    })
                }
            </div>
        </div>
    )
}

export default ProductCarAll