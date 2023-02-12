import Axios from 'axios'
import React, { useEffect, useState } from 'react'

import LaiThuItem from './LaiThuItem'
import './LaiThu.scss'

function DonLaiThu() {
    const [laithu, setLaiThu] = useState([])
    const [callback, setCallback] = useState(false)

    useEffect(() => {
        const getlaiThu = async () => {
            const res = await Axios.get('/api/laithu')
            setLaiThu(res.data)
        }
        getlaiThu()
    }, [callback])

    //console.log(laithu)

    return (
        <>
            <div className='ManagerLaiThu p-3'>
                <div className='ManagerLaiThu-body'>
                    {
                        laithu.map((laithus) => {
                            return <LaiThuItem key={laithus._id} laithus={laithus} setCallback={setCallback} callback={callback} />
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default DonLaiThu