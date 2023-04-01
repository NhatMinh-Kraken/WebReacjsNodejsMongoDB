import React from 'react'
import { Button, Modal } from 'react-bootstrap'


function FormAllDonBaoDuong({ sum, optionBuoc1, optionBuoc2, handleClose, show, ClickDonHang, donDatLichUser, datLichBaoDuongUser, allBaoDuongUser, garage, logo }) {

    return (
        <>

            <Modal
                size="lg"
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header className='HoaDonHeaderModal' closeButton>
                    <Modal.Title>MERCEDES-BENZ <img src={logo} alt="logo" /></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: "#fffdfc" }}>
                    <div className='Modal-HoaDon'>
                        <div className='form-dichvu-baoduong-tongtien-mr'>
                            {/* <div className='form-dichvu-baoduong-tongtien-bg'> */}
                            <div className='form-tong-tien-baoduong-body p-4'>
                                <div className='form-tongtin-baoduong-body-header-top d-flex justify-content-center align-items-center p-3'>
                                    <span>Hóa đơn</span>
                                    <img src={logo} alt="img" />
                                </div>
                                <div className='form-dichvu-baoduong-tongtien-bg p-3'>
                                    <div className='form-tongtin-baoduong-body-user'>
                                        <div className='form-tongtin-baoduong-body-user-title d-flex align-items-center pb-1'>
                                            <span><i className="fa-solid fa-user pr-2"></i>Thông tin cá nhân khách hàng</span>
                                        </div>
                                        <div className='form-tongtin-baoduong-body-user-name d-flex pl-3 col-12'>
                                            <span className='font-weight-bold col-3 pr-1'>Họ và tên: </span>
                                            <p className='m-0 col-9 p-0'>{donDatLichUser.IdUser?.name}</p>
                                        </div>
                                        <div className='form-tongtin-baoduong-body-user-name d-flex pl-3 col-12'>
                                            <span className='font-weight-bold col-3 pr-1'>Email: </span>
                                            <p className='m-0 col-9 p-0'>{donDatLichUser.IdUser?.email}</p>
                                        </div>
                                        <div className='form-tongtin-baoduong-body-user-name d-flex pl-3 col-12'>
                                            <span className='font-weight-bold col-3 pr-1'>Số điện thoại: </span>
                                            <p className='m-0 col-9 p-0'>{donDatLichUser.IdUser?.numberphone}</p>
                                        </div>
                                        <div className='form-tongtin-baoduong-body-user-name d-flex pl-3 col-12'>
                                            <span className='font-weight-bold col-3 pr-1'>Địa chỉ: </span>
                                            <p className='m-0 col-9 p-0'>{donDatLichUser.IdUser?.address}</p>
                                        </div>

                                        <p className='boder m-0 mb-3 mt-3'></p>
                                    </div>

                                    <div className='form-tongtin-baoduong-body-user'>
                                        <div className='form-tongtin-baoduong-body-user-title d-flex align-items-center pb-1'>
                                            <span><i className="fa-solid fa-car pr-2"></i>Thông tin xe khách hàng</span>
                                        </div>
                                        <div className='form-tongtin-baoduong-body-user-name d-flex pl-3 col-12'>
                                            <span className='font-weight-bold col-3 pr-1'>Loại xe: </span>
                                            <p className='m-0 col-9 p-0'>{donDatLichUser.IdLoaiXe?.name}</p>
                                        </div>
                                        <div className='form-tongtin-baoduong-body-user-name d-flex pl-3 col-12'>
                                            <span className='font-weight-bold col-3 pr-1'>Biển số: </span>
                                            <p className='m-0 col-9 p-0'>{donDatLichUser.BienSo}</p>
                                        </div>
                                        <div className='form-tongtin-baoduong-body-user-name d-flex pl-3 col-12'>
                                            <span className='font-weight-bold col-3 pr-1'>Quãng đường đi: </span>
                                            <p className='m-0 col-9 p-0'>{donDatLichUser.QuangDuongDi} km</p>
                                        </div>

                                        <div className='form-tongtin-baoduong-body-user-name d-flex pl-3 pt-3 col-12'>
                                            <div className='col-6 p-0'>
                                                <div className='col-12 p-0 d-flex text-success'>
                                                    <span className='font-weight-bold col-6 pr-1 '>Ngày đăng ký: </span>
                                                    <p className='m-0 col-6 p-0'>{donDatLichUser.dates}</p>
                                                </div>
                                            </div>
                                            <div className='col-6 p-0'>
                                                <div className='col-12 p-0 d-flex text-success'>
                                                    <span className='font-weight-bold col-6 pr-1'>thời gian đăng ký: </span>
                                                    <p className='m-0 col-6 p-0'>{donDatLichUser.times}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <p className='boder m-0 mb-3 mt-3'></p>
                                    </div>

                                    <div className='form-tongtin-baoduong-body-user'>
                                        <div className='form-tongtin-baoduong-body-user-title d-flex align-items-center pb-1'>
                                            <span><i className="fa-solid fa-location-dot pr-2"></i>Thông tin đại lý</span>
                                        </div>
                                        <div className='form-tongtin-baoduong-body-user-name d-flex pl-3 col-12'>
                                            <span className='font-weight-bold col-3 pr-1'>Tên đại lý: </span>
                                            <p className='m-0 col-9 p-0'>{donDatLichUser.Iddaily?.Name}</p>
                                        </div>
                                        <div className='form-tongtin-baoduong-body-user-name d-flex pl-3 col-12'>
                                            <span className='font-weight-bold col-3 pr-1'>Email đại lý: </span>
                                            <p className='m-0 col-9 p-0'>{donDatLichUser.Iddaily?.Email}</p>
                                        </div>
                                        <div className='form-tongtin-baoduong-body-user-name d-flex pl-3 col-12'>
                                            <span className='font-weight-bold col-3 pr-1'>Địa chỉ đại lý: </span>
                                            <p className='m-0 col-9 p-0'>{donDatLichUser.Iddaily?.Address}</p>
                                        </div>

                                        <p className='boder m-0 mb-3 mt-3'></p>
                                    </div>
                                    <div className='form-tongtin-baoduong-body-header pb-1'>
                                        <span><i className="fa-solid fa-list pr-2"></i>Option bảo dưỡng Bước 1:</span>
                                    </div>
                                    <div className='form-tongtin-baoduong-body d-flex flex-column'>
                                        {
                                            optionBuoc1?.map(lt => (
                                                lt.HoanThanh === 1 && (
                                                    <>
                                                        <div className='option-baoduong d-flex pl-3 col-12'>
                                                            <span className='font-weight-bold col-5 pr-1'>{lt.name}:</span>
                                                            <p className='m-0 col-7 p-0 d-flex justify-content-end'>{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(lt.money)}</p>
                                                        </div>
                                                    </>
                                                )
                                            ))
                                        }
                                        <p className='boder m-0 mb-3 mt-3'></p>
                                    </div>

                                    <div className='form-tongtin-baoduong-body-header'>
                                        <span><i className="fa-solid fa-list pr-2"></i>Option bảo dưỡng Bước 2:</span>
                                    </div>
                                    <div className='form-tongtin-baoduong-body d-flex flex-column'>
                                        {
                                            optionBuoc2?.map(lt => (
                                                lt.HoanThanh === 1 && (
                                                    <>
                                                        <div className='option-baoduong d-flex pl-3 col-12'>
                                                            <span className='font-weight-bold col-5 pr-1'>{lt.name}:</span>
                                                            <p className='m-0 col-7 p-0 d-flex justify-content-end'>{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(lt.money)}</p>
                                                        </div>
                                                    </>
                                                )
                                            ))
                                        }

                                        <p className='boder m-0 mb-3 mt-3'></p>
                                    </div>

                                    <div className='form-tongtin-baoduong-body-user'>
                                        <div className='form-tongtin-baoduong-body-user-name d-flex pl-3 col-12'>
                                            <span className='font-weight-bold col-3 pr-1'>Tổng giá tiền: </span>
                                            <p className='m-0 col-9 p-0 d-flex justify-content-end'>
                                                {
                                                    Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(sum)
                                                }
                                            </p>
                                        </div>
                                        <p className='border-p m-0 mb-3 mt-3'></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>Đóng</Button>
                </Modal.Footer>
            </Modal>

            {
                allBaoDuongUser.length === 0
                    ?
                    <>
                        <>
                            <span className='d-flex justify-content-center align-items-center text-danger'>Không có đơn hàng</span>
                        </>
                    </>
                    :
                    <>
                        <div className='form-all-baoduong'>
                            <div className='form-all-baoduong-item d-flex flex-column'>
                                {
                                    allBaoDuongUser.map((lt, index) => (
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
                                                                <div className='col-3 d-flex justify-content-end p-0'>
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
                                                                        {
                                                                            lt.checked === 1 && (
                                                                                <>
                                                                                    <div className='d-flex col-2 align-items-center p-0 font-p'>
                                                                                        <Button variant="primary" onClick={() => ClickDonHang(lt)}>
                                                                                            Xem hóa đơn
                                                                                        </Button>
                                                                                    </div>
                                                                                </>
                                                                            )
                                                                        }

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

export default FormAllDonBaoDuong