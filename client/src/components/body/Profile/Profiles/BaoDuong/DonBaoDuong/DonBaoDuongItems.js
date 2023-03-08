import React, { useState } from 'react'
import User from '../../../../../../assets/images/user.png'
import logo from '../../../../../../assets/images/logo.png'
import { useSelector } from 'react-redux'
import { Button, Modal } from 'react-bootstrap'
import { toast } from 'react-toastify'
import Axios from 'axios'

function DonBaoDuongItems({ c, setCallback, callback }) {

    console.log(c)
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

    const diachivuthe = [c && c.IdUser && c.IdUser.nameWard, c && c.IdUser && c.IdUser.nameDis, c && c.IdUser && c.IdUser.nameCity].join(', ')

    const handleSubmit = async () => {
        try {
            if (c.Duyet == 1) {
                if (c.checked == 1) {
                    setCallback(!callback)
                    setIsShow(false)
                    toast.error("Đơn hàng này đã hoàn thành. Bạn không thể sửa lại !!!!")

                } else {
                    if (window.confirm("Bạn có chắc là đơn hàng này đã hoàn thành hay không?")) {
                        const res = await Axios.put(`/api/put-datlichbaoduong-hoanthanh/${c._id}`, {
                            checked: 1,
                            BaoDuongID: c._id
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
                toast.error("đơn hàng này chưa duyệt")
            }
        } catch (err) {
            err.response.data.msg && toast.error(err.response.data.msg)
        }
    }

    const handleSubmitDuyet = async () => {
        try {
            const res = await Axios.put(`/api/put-datlichbaoduong-duyet/${c._id}`, {
                Duyet: 1
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
                                    <span className='pr-1'>{c.nhanxung === 1 ? "Anh" : "Chị"}</span>
                                    {
                                        c && c.IdUser && c.IdUser.name
                                            ?
                                            <><span className='font-weight-bold'>{c.IdUser.name}</span></>
                                            :
                                            <><span className='font-weight-bold'>{c.name}</span></>
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold">Loại Xe:</td>
                                <td className="font-weight-bold">{c && c.IdLoaiXe && c.IdLoaiXe.name}</td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold">Loại năng lượng:</td>
                                <td className="font-weight-bold">{c.energy === 1 ? "Xăng" : "Điện"}</td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold">Biển số:</td>
                                <td className="font-weight-bold">{c.BienSo}</td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold">Số kilomet:</td>
                                <td className="font-weight-bold">{c.QuangDuongDi} km</td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold">Đại lý:</td>
                                <td className="font-weight-bold">{c.Iddaily.Name}</td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold">Địa chỉ đại lý:</td>
                                <td className="font-weight-bold">{c.Iddaily.Address}</td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold">Số điện thoại:</td>
                                {
                                    c && c.IdUser && c.IdUser.numberphone ? <><td className="font-weight-bold">{c && c.IdUser && c.IdUser.numberphone}</td></> : <><td className="font-weight-bold">{c.numberphone}</td></>
                                }

                            </tr>
                            <tr>
                                <td className="font-weight-bold">Email:</td>
                                {
                                    c && c.IdUser && c.IdUser.email ? <><td className="font-weight-bold">{c && c.IdUser && c.IdUser.email}</td></> : <><td className="font-weight-bold">{c.email}</td></>
                                }
                            </tr>
                            <tr>
                                <td className="font-weight-bold">Địa chỉ:</td>
                                {
                                    c && c.IdUser && c.IdUser.address ? <><td className="font-weight-bold">{c && c.IdUser && c.IdUser.address}</td></> : <><td className="font-weight-bold">{c.address}</td></>
                                }
                            </tr>
                            <tr>
                                <td className="font-weight-bold">Địa chỉ cụ thể:</td>
                                {
                                    c.address_cuthe ? <><td className="font-weight-bold">{c.address_cuthe}</td></> : <><td className="font-weight-bold">{diachivuthe}</td></>
                                }
                            </tr>
                            <tr>
                                <td className="font-weight-bold">Người cố vấn:</td>
                                <td className=' font-weight-bold'>{c.IdCoVan ? <>{c.IdCoVan.name}({c.IdCoVan.numberphone})</> : "Chưa có cố vấn"}</td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold">Mục tiêu bảo dưỡng:</td>
                                <td className='font-weight-bold d-flex flex-column'>
                                    {c.IdOptionBaoDuong.map(h => (
                                        <><div><i className="fa-solid fa-gear pr-1"></i><span>{h.name}</span></div></>
                                    ))}
                                </td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold">Thời gian:</td>
                                <td className="font-weight-bold text-success">{c.times}</td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold">Ngày đăng ký:</td>
                                <td className='text-primary font-weight-bold'>{c.dates}</td>
                            </tr>
                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" style={{ width: "180px" }} disabled={c.checked === 1 && ("disabled")} onClick={handleSubmit}>
                        {
                            c.checked === 1
                                ?
                                "Đã Hoàn Thành"
                                :
                                "Chưa Hoàn Thành"
                        }</Button>
                    <Button variant="primary" style={{ width: "180px" }} disabled={c.Duyet === 1 && ("disabled")} onClick={handleSubmitDuyet}>
                        {
                            c.Duyet === 1
                                ?
                                "Đã Duyệt"
                                :
                                "Chưa Duyệt"
                        }
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className={`LaiThuItems ${c.checked === 1 ? "border-Success-bg" : "border-No-Success-bg"}`} onMouseEnter={handleHover} onMouseLeave={handleNotHover}>
                <div className='LaiThuItems-border d-flex align-items-center mr-auto'>
                    <div className='LaiThuItems-header'>
                        <div className='LaiThuItems-img'>
                            {
                                c && c.IdUser && c.IdUser.avatar ? <><img src={c.IdUser.avatar} alt="avatar" /></> : <><img src={User} alt="avatar" /></>
                            }
                        </div>
                    </div>
                    <div className='LaiThuItems-body'>
                        <div className={`LaiThuItems-name p-0 ${isHover ? "col-7" : "col-12"}`}>
                            {
                                c && c.IdUser && c.IdUser.name ? <><span>{c.IdUser.name}</span></> : <><span>{c.name}</span></>
                            }
                        </div>
                        <div className={`LaiThuItems-Date ${isHover ? "visible" : "hidden"} ${isHover ? "opacity-1" : "opacity-0"} ${isHover ? "d-block" : "d-none"}`} >
                            <span>{c.dates}</span>
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

export default DonBaoDuongItems