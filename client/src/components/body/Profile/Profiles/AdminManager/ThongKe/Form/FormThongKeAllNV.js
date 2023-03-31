import React from 'react'
import { Table } from 'react-bootstrap'

function FormThongKeAllNV({ allNhanVienCVLength, allNhanVienCV }) {
    return (
        <>
            <div className='form-header-thongke d-flex justify-content-center'>
                <span className='text-center font-weight-bold'>Nhân viên</span>
            </div>
            <div className="form-body-thongke">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th className="text-center">#</th>
                            <th className="text-center">Họ và tên</th>
                            <th className="text-center">Số lần được đăng ký</th>
                            <th className="text-center">Danh hiệu</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allNhanVienCV.map((c, index) => (
                                <>
                                    <tr>
                                        <td className="text-center">{index + 1}</td>
                                        <td className="text-center">{c.name}</td>
                                        <td className="text-center">
                                            {
                                                allNhanVienCVLength.map((d, index) => (
                                                    d._id?._id === c._id ?
                                                        <>
                                                            {
                                                                d.records?.length
                                                            }
                                                        </>
                                                        :
                                                        <span>0</span>

                                                ))
                                            }
                                        </td>
                                        <td className="text-center">
                                            {
                                                allNhanVienCVLength.map((d, index) => (
                                                    d._id?._id === c._id ?
                                                        <>
                                                            {
                                                                d.records?.length > 1 && (<>Tốt</>)
                                                            }
                                                        </>
                                                        :
                                                        <>
                                                            Chưa tốt
                                                        </>
                                                ))
                                            }
                                        </td>
                                    </tr>
                                </>
                            ))
                        }
                    </tbody>
                </Table>

            </div>
        </>
    )
}

export default FormThongKeAllNV