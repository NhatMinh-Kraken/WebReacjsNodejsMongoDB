import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'


import '../optionBaoDuong/optionBaoDuong.scss'
import DonBaoDuongItems from './DonBaoDuongItems'

function DonBaoDuong() {
    const [donBaoDuong, setDonBaoDuong] = useState([])
    const [callback, setCallback] = useState(false)

    useEffect(() => {
        const get = async () => {
            const res = await Axios.get('/api/get-datlichbaoduong')
            setDonBaoDuong(res.data)
        }
        get()
    }, [callback])

    return (
        <>
            <div className='DonBaoDuong pt-3'>
                <div className='ManagerDonBaoDuong-body'>
                    {
                        donBaoDuong.map((c, index) => {
                            return <DonBaoDuongItems key={c._id} c={c} setCallback={setCallback} callback={callback} />
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default DonBaoDuong