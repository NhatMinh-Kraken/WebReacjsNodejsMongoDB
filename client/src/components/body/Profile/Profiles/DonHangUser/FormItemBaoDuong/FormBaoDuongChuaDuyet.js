import React from 'react'
import { Button } from 'react-bootstrap'

function FormBaoDuongChuaDuyet({ allBaoDuongChuaDuyet, garage, logo }) {
    return (
        <>
            {
                allBaoDuongChuaDuyet.length === 0
                    ?
                    <>
                        <span className='d-flex justify-content-center align-items-center text-danger'>Không có đơn chưa duyệt</span>
                    </>
                    :
                    <>
                        <div className='form-all-baoduong'>
                            <div className='form-all-baoduong-item d-flex flex-column'>
                                {
                                    allBaoDuongChuaDuyet.map((lt, index) => (
                                        <>
                                            <div className='form-all-baoduong-bg mb-3'>
                                                <div className='form-all-baoduong'>
                                                    <div className='col-12 p-0 d-flex'>
                                                        <div className='form-bg col-1 p-0 d-flex align-items-center justify-content-center'>
                                                            <div className='d-flex '>
                                                                <div className='d-flex '>
                                                                    <img src={logo} alt="logo" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='col-11 p-2'>
                                                            <div className='form-all-baoduong-item p-0 col-12 d-flex'>
                                                                <div className='col-9 d-flex p-0 '>
                                                                    {/* <div className='d-flex col-1 align-items-center'>{index + 1}</div> */}
                                                                    <div className='col-12 p-0 d-flex'>
                                                                        <div className='d-flex col-3 p-0 align-items-center'>
                                                                            <img src={garage} alt="img" />
                                                                            <span className='d-flex align-items-center pl-2 font-p'>{lt.Iddaily.Name}</span>
                                                                        </div>
                                                                        <div className='d-flex col-10 p-0 align-items-center'>
                                                                            <i className="fa-solid fa-location-dot pr-1"></i><p className='m-0 font-p'>{lt.Iddaily.Address}</p>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                                <div className='col-3 d-flex justify-content-end'>
                                                                    <div className='pl-2 pr-2 d-flex justify-content-center align-items-center font-p'>
                                                                        {
                                                                            lt.Duyet === 1 ? <><span className='text-success'>Đã duyệt</span></> : <><span className='text-danger'>Chưa duyệt</span></>
                                                                        }
                                                                    </div>
                                                                    <div className='pl-2 pr-2 d-flex justify-content-center align-items-center font-p'>
                                                                        {
                                                                            lt.checked === 1 ? <><span className='text-success'>Đã hoàn thành</span></> : <><span className='text-danger'>Chưa hoàn thành</span></>
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='form-laithu-view-user-body pr-2 pt-2 pl-0 col-12 d-flex'>
                                                                <div className='form-laithu-view-body d-flex col-12 p-0'>
                                                                    <div className='col-12 p-0 d-flex'>
                                                                        <div className='d-flex p-0 col-6 align-items-center font-p'>
                                                                            <div className='form-laithu-view-body-name pr-3 d-flex'>
                                                                                <span className='font-weight-bold'>Loại xe: </span> <p className='m-0 pl-1'>{lt.IdLoaiXe.name}</p>
                                                                            </div>
                                                                            <div className='form-laithu-view-body-name pr-3 d-flex'>
                                                                                <span className='font-weight-bold'>Biển số: </span><p className='m-0 pl-1'>{lt.BienSo}</p>
                                                                            </div>
                                                                            <div className='form-laithu-view-body-name pr-3 d-flex'>
                                                                                <span className='font-weight-bold'>Quãng đường đi: </span> <p className='m-0 pl-1'>{lt.QuangDuongDi} km</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className='d-flex align-items-center col-4 p-0 font-p'>
                                                                            <div className='form-laithu-view-body-date-times d-flex pr-2'>
                                                                                <span className='text-success font-weight-bold'>Ngày: </span><span className='text-success'>{lt.dates}</span>
                                                                            </div>
                                                                            <div className='form-laithu-view-body-date-times d-flex'>
                                                                                <span className='text-primary font-weight-bold'>Thời gian: </span><span className='text-primary'>{lt.times}</span>
                                                                            </div>
                                                                        </div>
                                                                        {/* <div className='d-flex col-2 align-items-center p-0 font-p'>
                                                                            <Button variant="primary">
                                                                                Xem hóa đơn
                                                                            </Button>
                                                                        </div> */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    ))
                                }
                            </div>
                        </div>
                    </>
            }
        </>
    )
}

export default FormBaoDuongChuaDuyet