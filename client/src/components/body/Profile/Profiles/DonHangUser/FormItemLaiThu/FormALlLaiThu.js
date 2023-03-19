import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import garage from '../../../../../../assets/images/garage.jpg'
import ItemsDonLaiThu from './Items/ItemsDonLaiThu'

function FormALlLaiThu() {
    const [allLaiThu, setAllLaiThu] = useState([])
    const [callback, setCallback] = useState(false)
    const auth = useSelector(state => state.auth)
    const { user } = auth

    useEffect(() => {
        const get = async () => {
            const res = await Axios.get(`/api/donlaithu-infor/${user._id}`)
            setAllLaiThu(res.data)
        }
        get()
    }, [callback])

   // console.log(allLaiThu)

    return (
        <>
            <div className='form-all-laithu'>
                <div className='container'>
                    <div className='row'>
                        {
                            allLaiThu.map((lt, index) => (
                                <>
                                    <div className='col-12'>
                                        <ItemsDonLaiThu lt={lt} garage={garage} key={lt._id} />
                                    </div>
                                </>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default FormALlLaiThu