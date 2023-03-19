import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import garage from '../../../../../../assets/images/garage.jpg'
import ItemDonHoanThanh from './Items/ItemDonHoanThanh'

function FormDonHoanThanh() {

    const [allLaiThu, setAllLaiThu] = useState([])

    const [donHoanThanh, setDonHoanThanh] = useState([])
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

    useEffect(() => {
        allLaiThu.map((item) => {
            if (item.checked === 1) {
                setDonHoanThanh([item])
            }
        })
    }, [allLaiThu])

    console.log(donHoanThanh)

    return (
        <>
            <div className='form-all-laithu'>
                <div className='container'>
                    <div className='row'>

                        {
                            donHoanThanh.length !== 0
                                ?
                                <>
                                    <div>
                                        {
                                            donHoanThanh.map((lt, index) => (
                                                <>
                                                    <div className='col-12'>
                                                        <ItemDonHoanThanh lt={lt} garage={garage} key={lt._id} />
                                                    </div>
                                                </>
                                            ))
                                        }
                                    </div>
                                </>
                                :
                                <>
                                    <span>
                                        Chưa có đơn hoàn thành
                                    </span>
                                </>
                        }

                    </div>
                </div>
            </div>
        </>
    )
}

export default FormDonHoanThanh