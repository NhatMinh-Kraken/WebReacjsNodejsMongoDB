import React from 'react'
import loading from '../../../assets/images/logo.png'

import './loadding.scss'

function loadding() {
    return (
        <>
            <div className='loadding'>
                <div className='loadding-top'>
                    <img src={loading} alt="mer"/>
                </div>
            </div>
        </>
    )
}

export default loadding