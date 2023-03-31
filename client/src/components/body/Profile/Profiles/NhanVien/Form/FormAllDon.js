import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

function FormAllDon({ ClickDonHangHT, donBaoDuongUser, garage, logo, sum, donDatLichUser, handleCloseHT, optionBuoc1, optionBuoc2, showHT, DonHoanThanh, QuyTrinhBaoDuong }) {
    const [IdDonBaoDuong, setIdDonBaoDuong] = useState([])
    const [show, setShow] = useState(false)

    // const ClickDonHang = () => {

    // }

    const ClickXemChiTiet = (giatri) => {
        setIdDonBaoDuong(giatri)
        setShow(true)
    }

    const handleClose = () => {
        setIdDonBaoDuong("")
        setShow(false)
    }

    const diachivuthe = [IdDonBaoDuong && IdDonBaoDuong.IdUser && IdDonBaoDuong.IdUser.nameWard, IdDonBaoDuong && IdDonBaoDuong.IdUser && IdDonBaoDuong.IdUser.nameDis, IdDonBaoDuong && IdDonBaoDuong.IdUser && IdDonBaoDuong.IdUser.nameCity].join(', ')
    return (
        <>



            <Modal
                size="lg"
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header className='LaithuHeaderModal' closeButton>
                    <Modal.Title>MERCEDES-BENZ <img src={logo} alt="logo" /></Modal.Title>
                </Modal.Header>
                <Modal.Body className='text-danger'>
                    <h3 className="text-center">Thông tin đơn bảo dưỡng</h3>
                    <table className="table table-bordered">
                        <thead className='thead-dark'>
                            <tr>
                                <th scope="col">Tên</th>
                                <th scope="col">Nội dung</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="font-weight-bold">Tên Khách Hàng:</td>
                                <td className="font-weight-bold">
                                    <span className='pr-1'>{IdDonBaoDuong.nhanxung === 1 ? "Anh" : "Chị"}</span>
                                    {
                                        IdDonBaoDuong && IdDonBaoDuong.IdUser && IdDonBaoDuong.IdUser.name
                                            ?
                                            <><span className='font-weight-bold'>{IdDonBaoDuong.IdUser.name}</span></>
                                            :
                                            <><span className='font-weight-bold'>{IdDonBaoDuong.name}</span></>
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold">Loại Xe:</td>
                                <td className="font-weight-bold">{IdDonBaoDuong && IdDonBaoDuong.IdLoaiXe && IdDonBaoDuong.IdLoaiXe?.name}</td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold">Loại năng lượng:</td>
                                <td className="font-weight-bold">{IdDonBaoDuong.energy === 1 ? "Xăng" : "Điện"}</td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold">Biển số:</td>
                                <td className="font-weight-bold">{IdDonBaoDuong.BienSo}</td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold">Số kilomet:</td>
                                <td className="font-weight-bold">{IdDonBaoDuong.QuangDuongDi} km</td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold">Đại lý:</td>
                                <td className="font-weight-bold">{IdDonBaoDuong.Iddaily?.Name}</td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold">Địa chỉ đại lý:</td>
                                <td className="font-weight-bold">{IdDonBaoDuong.Iddaily?.Address}</td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold">Số điện thoại:</td>
                                {
                                    IdDonBaoDuong && IdDonBaoDuong.IdUser && IdDonBaoDuong.IdUser.numberphone ? <><td className="font-weight-bold">{IdDonBaoDuong && IdDonBaoDuong.IdUser && IdDonBaoDuong.IdUser.numberphone}</td></> : <><td className="font-weight-bold">{IdDonBaoDuong.numberphone}</td></>
                                }

                            </tr>
                            <tr>
                                <td className="font-weight-bold">Email:</td>
                                {
                                    IdDonBaoDuong && IdDonBaoDuong.IdUser && IdDonBaoDuong.IdUser.email ? <><td className="font-weight-bold">{IdDonBaoDuong && IdDonBaoDuong.IdUser && IdDonBaoDuong.IdUser.email}</td></> : <><td className="font-weight-bold">{IdDonBaoDuong.email}</td></>
                                }
                            </tr>
                            <tr>
                                <td className="font-weight-bold">Địa chỉ:</td>
                                {
                                    IdDonBaoDuong && IdDonBaoDuong.IdUser && IdDonBaoDuong.IdUser.address ? <><td className="font-weight-bold">{IdDonBaoDuong && IdDonBaoDuong.IdUser && IdDonBaoDuong.IdUser.address}</td></> : <><td className="font-weight-bold">{IdDonBaoDuong.address}</td></>
                                }
                            </tr>
                            <tr>
                                <td className="font-weight-bold">Địa chỉ cụ thể:</td>
                                {
                                    IdDonBaoDuong.address_cuthe ? <><td className="font-weight-bold">{IdDonBaoDuong.address_cuthe}</td></> : <><td className="font-weight-bold">{diachivuthe}</td></>
                                }
                            </tr>
                            <tr>
                                <td className="font-weight-bold">Người cố vấn:</td>
                                <td className=' font-weight-bold'>{IdDonBaoDuong.IdCoVan ? <>{IdDonBaoDuong.IdCoVan?.name}({IdDonBaoDuong.IdCoVan?.numberphone})</> : "Chưa có cố vấn"}</td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold">Mục tiêu bảo dưỡng:</td>
                                <td className='font-weight-bold d-flex flex-column'>
                                    {IdDonBaoDuong.IdOptionBaoDuong?.map(h => (
                                        <><div><i className="fa-solid fa-gear pr-1"></i><span>{h.name}</span></div></>
                                    ))}
                                </td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold">Thời gian:</td>
                                <td className="font-weight-bold text-success">{IdDonBaoDuong.times}</td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold">Ngày đăng ký:</td>
                                <td className='text-primary font-weight-bold'>{IdDonBaoDuong.dates}</td>
                            </tr>
                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <div className=' font-weight-bold' style={{ width: "180px" }} >
                        {
                            IdDonBaoDuong.checked === 1
                                ?
                                <span className='text-success'>Đã Hoàn Thành</span>
                                :
                                <span className='text-danger'>Chưa Hoàn Thành</span>
                        }
                    </div>
                </Modal.Footer>
            </Modal>

            <div className='form-all-baoduong'>
                <div className='form-all-baoduong-item d-flex flex-column'>
                    {
                        donBaoDuongUser.map((lt, index) => (
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
                                                            <div className='d-flex col-2 align-items-center p-0 font-p'>
                                                                {
                                                                    lt.checked === 0
                                                                        ?
                                                                        <>
                                                                            <Button variant="primary" onClick={() => ClickXemChiTiet(lt)}>
                                                                                Xem chi tiết
                                                                            </Button>
                                                                        </>
                                                                        :
                                                                        <>
                                                                            <Button variant="primary" onClick={() => ClickDonHangHT(lt)}>
                                                                                Xem hóa đơn
                                                                            </Button>
                                                                        </>
                                                                }
                                                            </div>
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
    )
}

export default FormAllDon