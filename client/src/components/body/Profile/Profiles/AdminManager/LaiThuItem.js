import Axios from 'axios'
import moment from 'moment'
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

    // format vnđ
    const formatMoney = Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(laithus.Idcar.money)
    const formatDates = moment(laithus.updatedAt).format('h:mm:ss DD-MM-YYYY')
    //

    const handleSubmit = async () => {
        try {
            if (laithus.duyet == 1) {
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
            }
            else {
                setCallback(!callback)
                setIsShow(false)
                toast.error("Đơn hàng này chưa duyệt")
            }
        } catch (err) {
            err.response.data.msg && toast.error(err.response.data.msg)
        }
    }

    const handleSubmitDuyet = async () => {
        // console.log("Đã duyệt: ", laithus.duyet)
        try {
            const res = await Axios.put(`/api/cron/${laithus._id}`, {
                duyet: 1
            }, {
                headers: { Authorization: token }
            })
            setCallback(!callback)
            setIsShow(false)
            toast.success(res.data.msg)
        } catch (err) {
            err.response.data.msg && toast.error(err.response.data.msg)
        }
    }
    // const date = new Date()
    // console.log(date.toLocaleDateString())

    // console.log(laithus.dates)

    // if(date.toLocaleDateString() == laithus.dates)
    // {
    //     console.log(true)
    // }
    // else{
    //     console.log(false)
    // }

    return (
        <>
            <Modal
                size="lg"
                show={isShow}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header className='LaithuHeaderModal' closeButton>
                    <Modal.Title>MERCEDES-BENZ <img src={logo} alt="logo" /></Modal.Title>
                </Modal.Header>
                <Modal.Body className='text-danger'>
                    <h3 className="text-center">Thông tin đơn lái thử</h3>
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
                                    <span className='pr-1'>{laithus.nhanxung === 1 ? "Anh" : "Chị"}</span>
                                    {
                                        laithus
                                        && laithus.idUser
                                        && laithus.idUser.name
                                        && <span className='font-weight-bold'>{laithus.idUser.name}</span>
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold">Tên Xe:</td>
                                <td className="font-weight-bold">{laithus.Idcar.name}</td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold">Loại Xe:</td>
                                <td className="font-weight-bold">{laithus.type}</td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold">Giá niêm yết:</td>
                                <td className="font-weight-bold">{formatMoney}</td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold">Tên đại lý:</td>
                                <td className="font-weight-bold">{laithus.Iddaily.Name}</td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold">Địa chỉ:</td>
                                <td className="font-weight-bold">{laithus.Iddaily.Address}</td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold">Số điện thoại theo thông tin cá nhân:</td>
                                <td className="font-weight-bold">{laithus.idUser.numberphone}</td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold">Số điện thoại liên hệ:</td>
                                <td className="font-weight-bold">{laithus.phone}</td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold">Ngày lái thử:</td>
                                <td className="font-weight-bold text-success">{laithus.dates}</td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold">Thời gian:</td>
                                <td className="font-weight-bold text-success">{laithus.times}</td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold">Ngày đăng ký:</td>
                                <td className='text-primary font-weight-bold'>{formatDates}</td>
                            </tr>
                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" style={{ width: "180px" }} disabled={laithus.checked === 1 && ("disabled")} onClick={handleSubmit}>
                        {
                            laithus.checked === 1
                                ?
                                "Đã Hoàn Thành"
                                :
                                "Chưa Hoàn Thành"
                        }</Button>
                    <Button variant="primary" style={{ width: "180px" }} disabled={laithus.duyet === 1 && ("disabled")} onClick={handleSubmitDuyet}>
                        {
                            laithus.duyet === 1
                                ?
                                "Đã Duyệt"
                                :
                                "Chưa Duyệt"
                        }
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
                            <span>{laithus.dates}</span>
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