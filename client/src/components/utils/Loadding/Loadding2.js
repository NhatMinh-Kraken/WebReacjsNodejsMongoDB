import React from 'react'
import loading from '../../../assets/images/logo.png'

import './Loadding2.scss'

function Loadding2() {
    return (
        <>
            <div className='loadding2'>
                <div className='loadding2-top'>
                    <img src={loading} alt="mer" />
                </div>
            </div>
        </>
    )
}

export default Loadding2