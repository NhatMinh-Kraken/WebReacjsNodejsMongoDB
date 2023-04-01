import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useSelector } from 'react-redux'


import '../optionBaoDuong/optionBaoDuong.scss'
import DonBaoDuongItems from './DonBaoDuongItems'

function DonBaoDuong() {
    const [donBaoDuong, setDonBaoDuong] = useState([])
    const [callback, setCallback] = useState(false)
    const [query, setQuery] = useState("")

    useEffect(() => {
        const get = async () => {
            const res = await Axios.get('/api/get-datlichbaoduong')
            setDonBaoDuong(res.data)
        }
        get()
    }, [callback])

    useEffect(() => {
        const fetchData = async () => {
            const res = await Axios.get(`/api/searchQuery?query=${query}`);
            setDonBaoDuong(res.data);
        };

        fetchData()
        // if (query.length === 0 || query.length > 2) ;
    }, [query])

    return (
        <>
            <div className='DonBaoDuong pt-3'>
                <div className='ManagerDonBaoDuong-body'>
                    <div className='search-item pb-3 col-12 d-flex'>
                        <div className='control-thongke col-2'>
                        </div>
                        <div className='col-10 p-0'>
                            <Form.Control className="form-control form-control-sm w-75" type="text" placeholder="Search biển số" onChange={(e) => setQuery(e.target.value.toLowerCase())} />
                        </div>
                    </div>
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