import Axios from 'axios'
import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import logo from '../../../../../assets/images/logo.png'

function LaiThuItem({ laithus, setCallback, callback }) {

    const [isHover, setIsHover] = useState(false)
    const [isShow, setIsShow] = useState(false)

    const token = useSelector(state => state.token)

    const handleHover = () => {
        setIsHover(true)
    }

    const handleNotHover = () => {
        setIsHover(false)
    }

    const handleClose = () => setIsShow(false);

    const handleShow = () => {
        setIsShow(true)
    }

    //console.log(laithus)

    // format vnđ
    const formatMoney = Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(laithus.money)
    const formatMoney1 = Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(laithus.smoney1)
    const formatMoney2 = Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(laithus.smoney2)
    const formatMoney3 = Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(laithus.smoney3)
    const formatMoney4 = Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(laithus.smoney4)
    const formatMoney5 = Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(laithus.smoney5)
    const formatSum = Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(laithus.sum)
    //

    const handleSubmit = async () => {
        try {
            if (laithus.checked == 1) {
                setCallback(!callback)
                setIsShow(false)
                toast.error("Đơn hàng này đã hoàn thành. Bạn không thể sửa lại !!!!")

            } else {
                if (window.confirm("Bạn có chắc là đơn hàng này đã hoàn thành hay không?")) {
                    const res = await Axios.patch(`/api/laithu/${laithus._id}`, {
                        checked: 1,
                        LaiThuID: laithus._id
                    }, {
                        headers: { Authorization: token }
                    })
                    setCallback(!callback)
                    setIsShow(false)
                    toast.success(res.data.msg)
                }
            }
        } catch (err) {
            err.response.data.msg && toast.error(err.response.data.msg)
        }
    }

    return (
        <>
            <Modal
                show={isShow}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header className='LaithuHeaderModal' closeButton>
                    <Modal.Title>MERCEDES-BENZ <img src={logo} alt="logo" /></Modal.Title>
                </Modal.Header>
                <Modal.Body className='text-danger'>
                    <h3 className="text-center">Hóa đơn</h3>
                    <table class="table table-bordered">
                        <thead className='thead-dark'>
                            <tr>
                                <th scope="col">Target</th>
                                <th scope="col">Content</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="font-weight-bold">Tên Khách Hàng:</td>
                                <td className="font-weight-light">{
                                    laithus
                                    && laithus.idUser
                                    && laithus.idUser.name
                                    && <span>{laithus.idUser.name}</span>
                                }</td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold">Tên Xe:</td>
                                <td className="font-weight-light">{laithus.name}</td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold">Loại Xe:</td>
                                <td className="font-weight-light">{laithus.type}</td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold">Giá niêm yết:</td>
                                <td className="font-weight-light">{formatMoney}</td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold">Phí trước bạ (12%):</td>
                                <td className="font-weight-light">{formatMoney1}</td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold">Phí sử dụng đường bộ (01 năm):</td>
                                <td className="font-weight-light">{formatMoney2}</td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold">Bảo hiểm trách nhiệm dân sự (01 năm):</td>
                                <td className="font-weight-light">{formatMoney3}</td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold">Phí đăng kí biển số:</td>
                                <td className="font-weight-light">{formatMoney4}</td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold">Phí đăng kiểm:</td>
                                <td className="font-weight-light">{formatMoney5}</td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold">Tổng cộng:</td>
                                <td className="font-weight-light">{formatSum}</td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold">Ngày đăng ký lái thử:</td>
                                <td className='text-primary font-weight-bold'>{laithus.date}</td>
                            </tr>
                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleSubmit}>Đã Xong</Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>



            <div className={`LaiThuItems ${laithus.checked === 1 ? "border-Success-bg" : "border-No-Success-bg"}`} onMouseEnter={handleHover} onMouseLeave={handleNotHover}>
                <div className='LaiThuItems-border d-flex align-items-center mr-auto'>
                    <div className='LaiThuItems-header'>
                        <div className='LaiThuItems-img'>
                            {
                                laithus
                                && laithus.idUser
                                && laithus.idUser.avatar
                                && <img src={laithus.idUser.avatar} alt="avatar" />
                            }
                        </div>
                    </div>
                    <div className='LaiThuItems-body'>
                        <div className={`LaiThuItems-name p-0 ${isHover ? "col-7" : "col-12"}`}>
                            {
                                laithus
                                && laithus.idUser
                                && laithus.idUser.name
                                && <span>{laithus.idUser.name}</span>
                            }
                        </div>
                        <div className={`LaiThuItems-Date ${isHover ? "visible" : "hidden"} ${isHover ? "opacity-1" : "opacity-0"} ${isHover ? "d-block" : "d-none"}`} >
                            <span>{laithus.date}</span>
                        </div>
                    </div>
                    <div className='logoMer' onClick={handleShow}>
                        <img src={logo} alt="logo" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default LaiThuItem