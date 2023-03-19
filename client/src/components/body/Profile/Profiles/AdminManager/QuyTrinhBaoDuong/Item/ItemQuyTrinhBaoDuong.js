import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import DichVuBaoDuongChung from './Item-QuyTrinhBaoDuong/DichVuBaoDuongChung'
import DichVuBaoDuongTheoKhachHang from './Item-QuyTrinhBaoDuong/DichVuBaoDuongTheoKhachHang'
import TongTienBaoDuong from './Item-QuyTrinhBaoDuong/TongTienBaoDuong'
import QuyTrinhBaoDuongSteps from './QuyTrinhBaoDuongSteps/QuyTrinhBaoDuongSteps'

function ItemQuyTrinhBaoDuong() {

    const [currentStep, setCurrentStep] = useState()
    const [callback, setCallback] = useState(false)
    const [datLichBaoDuong, setDatLichBaoDuong] = useState([])
    const { id } = useParams()
    const token = useSelector(state => state.token)
    const [datLichBaoDuongUser, setDatLichBaoDuongUser] = useState([])
    const [LichBaoDuongUser, setLichBaoDuongUser] = useState([])

    const steps = [
        "Bảo dưỡng chung",
        "Mục bảo dưỡng của khách hàng",
        "Hóa đơn",
    ]

    const displaySteps = (steps) => {
        switch (steps) {
            case 1: {
                return <DichVuBaoDuongChung datLichBaoDuongUser={datLichBaoDuongUser} setCallback={setCallback} callback={callback} handleClick={handleClickBuoc1} id={id} />
            }

            case 2: {
                return <DichVuBaoDuongTheoKhachHang datLichBaoDuongUser={datLichBaoDuongUser} setCallback={setCallback} callback={callback} handleClick={handleClickBuoc2} handleClickB1={handleClickVeBuoc1} id={id} />
            }

            case 3: {
                return <TongTienBaoDuong datLichBaoDuongUser={datLichBaoDuongUser} handleClick={handleClickVeBuoc2} setCallback={setCallback} callback={callback} LichBaoDuongUser={LichBaoDuongUser} id={id} />
            }

            default:
        }
    }

    useEffect(() => {
        const get = async () => {
            const ret = await Axios.get('/api/get-datlichbaoduong')
            setLichBaoDuongUser(ret.data)
        }
        get()
    }, [callback])

    useEffect(() => {
        const get = async () => {
            const ret = await Axios.get('/api/quytrinhbaoduong')
            setDatLichBaoDuong(ret.data)
        }
        get()
    }, [callback])

    useEffect(() => {
        datLichBaoDuong.map((c) => {
            if (c.IdDonDatLichBaoDuong._id === id) {
                setDatLichBaoDuongUser(c)
            }
        })
    }, [datLichBaoDuong, callback])

    const handleClickBuoc1 = async () => {
        try {
            await Axios.put(`/api/hoanthanh-option-buoc1/${id}`, {
                HoanThanhB1: 1,
                GiaiDoan: 2
            }, {
                headers: { Authorization: token }
            })
            setCallback(!callback)
            toast.success("Hoàn thành bước 1")
        } catch (err) {
            toast.error(err.response.data.msg)
            console.log(err)
        }
    }

    const handleClickBuoc2 = async () => {
        try {
            await Axios.put(`/api/hoanthanh-option-buoc2/${id}`, {
                HoanThanhB2: 1,
                GiaiDoan: 3
            }, {
                headers: { Authorization: token }
            })
            setCallback(!callback)
            toast.success("Hoàn thành bước 2")
        } catch (err) {
            toast.error(err.response.data.msg)
            console.log(err)
        }
    }

    const handleClickVeBuoc1 = async () => {
        try {
            await Axios.put(`/api/hoanthanh-option-ve-buoc1/${id}`, {
                GiaiDoan: 1
            }, {
                headers: { Authorization: token }
            })
            setCallback(!callback)
        } catch (err) {
            toast.error(err.response.data.msg)
            console.log(err)
        }
    }

    const handleClickVeBuoc2 = async () => {
        try {
            await Axios.put(`/api/hoanthanh-option-ve-buoc2/${id}`, {
                GiaiDoan: 2
            }, {
                headers: { Authorization: token }
            })
            setCallback(!callback)
        } catch (err) {
            toast.error(err.response.data.msg)
            console.log(err)
        }
    }

    return (
        // <a href='/manager/all-don-baoduong'>ItemQuyTrinhBaoDuong</a>
        <>
            <div className='form-item-quytrinh-baoduong mx-auto container'>
                <div className='formQt-BaoDuong-header p-3 mt-3'>
                    <h1 className='m-0'>Quy trình bảo dưỡng</h1>
                    <p className='m-0 pl-3'>Biển số: {datLichBaoDuongUser.IdDonDatLichBaoDuong?.BienSo}</p>
                    <p className='m-0 pl-3'>Tên Khách Hàng: <span className='font-weight-bold'>{datLichBaoDuongUser.IdDonDatLichBaoDuong?.name}</span></p>
                </div>
                <div className='formQt-BaoDuong-Step horizontal mt-3'>
                    <QuyTrinhBaoDuongSteps
                        steps={steps}
                        currentStep={datLichBaoDuongUser.GiaiDoan} />
                </div>
                <div className='form-thongtin-steper-Qt-baoduong pb-5'>
                    {displaySteps(datLichBaoDuongUser.GiaiDoan)}
                </div>
            </div>
        </>
    )
}

export default ItemQuyTrinhBaoDuong