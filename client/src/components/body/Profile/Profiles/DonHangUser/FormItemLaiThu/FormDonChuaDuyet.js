import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import garage from '../../../../../../assets/images/garage.jpg'
import ItemDonChuaDuyet from './Items/ItemDonChuaDuyet'

function FormDonChuaDuyet() {

    const [allLaiThu, setAllLaiThu] = useState([])

    const [donChuaDuyet, setDonChuaDuyet] = useState([])
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
            if (item.duyet === 0) {
                setDonChuaDuyet([item])
            }
        })
    }, [allLaiThu])


    return (
        <>
            <div className='form-all-laithu'>
                <div className='container'>
                    <div className='row'>

                        {
                            donChuaDuyet.length !== 0
                                ?
                                <>
                                    <div>
                                        {
                                            donChuaDuyet.map((lt, index) => (
                                                <>
                                                    <div className='col-12'>
                                                        <ItemDonChuaDuyet lt={lt} garage={garage} key={lt._id} />
                                                    </div>
                                                </>
                                            ))
                                        }
                                    </div>
                                </>
                                :
                                <>
                                    <span>
                                        Chưa có đơn chưa duyệt
                                    </span>
                                </>
                        }

                    </div>
                </div>
            </div>
        </>
    )
}

export default FormDonChuaDuyet