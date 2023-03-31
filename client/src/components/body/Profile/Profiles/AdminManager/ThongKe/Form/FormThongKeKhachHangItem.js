import React from 'react'
import { Table } from 'react-bootstrap'

function FormThongKeKhachHangItem({ allKH }) {
    console.log(allKH)
    return (
        <>
            <div className="col-12 d-flex">
                <div className="col-6">
                    <div className='form-header-thongke d-flex justify-content-center'>
                        <span className='text-center font-weight-bold'>Doanh thu từ khách hàng</span>
                    </div>
                    <div className="form-body-thongke">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th className="text-center">#</th>
                                    <th className="text-center">Họ và tên</th>
                                    <th className="text-center">Doanh thu</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allKH.map((c, index) => (
                                        <>
                                            <tr>
                                                <td className="text-center">{index + 1}</td>
                                                <td className="text-center">{c._id?.name}</td>
                                                <td className="text-center">
                                                    {
                                                        Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(c.records?.reduce((sum, item) => sum += Number(item.Tong), 0))
                                                    }
                                                </td>
                                            </tr>
                                        </>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </div>
                </div>
                <div className="col-6">
                    <div className='form-header-thongke d-flex justify-content-center'>
                        <span className='text-center font-weight-bold'>Cơ hội từ khách hàng</span>
                    </div>
                    <div className="form-body-thongke">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th className="text-center">#</th>
                                    <th className="text-center">Họ và tên</th>
                                    <th className="text-center"> Số lần đăng ký</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allKH.map((c, index) => (
                                        <>
                                            <tr>
                                                <td className="text-center">{index + 1}</td>
                                                <td className="text-center">{c._id?.name}</td>
                                                <td className="text-center">
                                                    {
                                                        c.records?.length
                                                    }
                                                </td>
                                            </tr>
                                        </>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FormThongKeKhachHangItem