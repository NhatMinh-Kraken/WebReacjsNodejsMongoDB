import React, { useEffect, useState } from 'react'
import User from '../../../../../../assets/images/user.png'
import logo from '../../../../../../assets/images/logo.png'
import { useSelector } from 'react-redux'
import { Button, Modal } from 'react-bootstrap'
import { toast } from 'react-toastify'
import Axios from 'axios'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import carSetting from '../../../../../../assets/images/carSetting.png'

function DonBaoDuongItems({ c, setCallback, callback }) {

    const [isHover, setIsHover] = useState(false)
    const [isShow, setIsShow] = useState(false)
    const [optionChung, setOptionChung] = useState([])
    const [option, setOption] = useState([])
    const [optionLoaiDichVu, setOptionLoaiDichVu] = useState([])
    const [optiondichvuChung, setOptionDichVuChung] = useState([])
    const token = useSelector(state => state.token)
    const history = useHistory()
    const [showEdit, setShowEdit] = useState(false)
    const [optiondichvu, setOptionDichVu] = useState([])
    const [check, setCheck] = useState([])
    const [id, setId] = useState("")
    const [optionNoLoaiDichVu, setOptionNoLoaiDichVu] = useState([])
    const [money, setMoney] = useState([])
    const [TongTien, setTongTien] = useState("")


    useEffect(() => {
        const get = async () => {
            const ret = await Axios.get('/api/getProductToType')
            setOptionDichVu(ret.data)
        }
        get()
    }, [callback])

    useEffect(() => {
        const get = async () => {
            const ret = await Axios.get('/api/get-optionbaoduong')
            setOptionNoLoaiDichVu(ret.data)
        }
        get()
    }, [callback])

    const handleHover = () => {
        setIsHover(true)
    }

    // console.log(c)

    const handleNotHover = () => {
        setIsHover(false)
    }

    const handleClose = () => setIsShow(false);

    const handleShow = (id) => {
        setIsShow(true)
        setId(id)
    }

    useEffect(() => {
        const get = async () => {
            const ret = await Axios.get('/api/loaibaoduong')
            setOptionLoaiDichVu(ret.data)
        }
        get()
    }, [callback])

    useEffect(() => {
        optionLoaiDichVu.map(lt => {
            if (lt.chung === 1) {
                setOptionDichVuChung(lt)
            }
        })
    }, [optionLoaiDichVu, callback])

    useEffect(() => {
        const arrChung = []
        const arr = []
        for (let i = 0; i < c.IdOptionBaoDuong?.length; i++) {
            if (c.IdOptionBaoDuong[i].IdLoaiDichVu === optiondichvuChung._id) {
                arrChung.push(c.IdOptionBaoDuong[i])
            }
            else {
                arr.push(c.IdOptionBaoDuong[i])
            }
        }
        setOptionChung(arrChung)
        setOption(arr)
    }, [c.IdOptionBaoDuong, optiondichvuChung])

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
                Duyet: 1,
                DonHang: c
            }, {
                headers: { Authorization: token }
            })
            // handleCreateQuyTrinh()
            handleLichLamViec()
            setCallback(!callback)
            setIsShow(false)
            toast.success(res.data.msg)
        } catch (err) {
            err.response.data.msg && toast.error(err.response.data.msg)
        }
    }

    const newTitle = `Đơn bảo dưỡng (${c.dates})`
    const newDate = moment(`${c.datesNoF} ${c.times}`).format('YYYY-MM-DDTHH:mm:ssZ')
    const start = moment(newDate).toDate()

    const newEnd = moment(`${c.datesNoF} 16:45:00`).format('YYYY-MM-DDTHH:mm:ssZ')
    const end = moment(newEnd).toDate()

    // console.log(moment(newEnd))

    const handleLichLamViec = async () => {
        try {
            await Axios.post('/api/lichlamviec', {
                title: newTitle,
                start: start,
                end: end,
                idCoVan: c.IdCoVan?._id ? c.IdCoVan?._id : null,
                IdDonBaoDuong: c._id
            }, {
                headers: { Authorization: token }
            })
        } catch (err) {
            err.response.data.msg && toast.error(err.response.data.msg)
        }
    }

    const handleCreateQuyTrinh = async () => {
        try {
            await Axios.post('/api/quytrinhbaoduong', {
                IdDonDatLichBaoDuong: c._id,
                IdOptionBaoDuongB1: optionChung,
                IdOptionBaoDuongB2: option
            }, {
                headers: { Authorization: token }
            })
            handleQuyTrinh()
        } catch (err) {
            err.response.data.msg && toast.error(err.response.data.msg)
        }
    }

    const handleButton = (id) => {
        if (c.Duyet === 1) {
            window.location.href = `/quytrinh-bao-duong/${id}`
            handleClose()
        }
        handleClose()
    }

    const handleHuy = async () => {
        try {
            const res = await Axios.put(`/api/huy-datlichbaoduong/${id}`, {
                TinhTrangDonHang: 1
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

    const handleQuyTrinh = async () => {
        try {
            const res = await Axios.put(`/api/cr-QuyTrinh/${c._id}`, {
                TaoQuyTrinh: 1
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

    const HandleShowEdit = (id) => {
        setShowEdit(true)
        setIsShow(false)
        setId(id)
    }

    const handleCloseEdit = () => {
        setShowEdit(false)
        setIsShow(true)
    }


    useEffect(() => {
        const arr = []
        for (let i = 0; i < c.IdOptionBaoDuong?.length; i++) {
            arr.push(c.IdOptionBaoDuong[i]?._id)
        }
        setCheck(arr)
    }, [c.IdOptionBaoDuong])


    const handleCheck = (e, giatri) => {
        if (e.target.checked) {
            setCheck([
                ...check, giatri._id
            ])
        }
        else {
            setCheck(
                check.filter((c) => c !== giatri._id)
            )
        }
    }

    const handleSave = async () => {
        try {
            const res = await Axios.put(`/api/Edit-optionbaoduong/${id}`, {
                check: check,
                Tong: TongTien
            }, {
                headers: { Authorization: token }
            })
            toast.success(res.data.msg)
            setIsShow(true)
            setShowEdit(false)
            setCallback(!callback)
        } catch (err) {
            err.response.data.msg && toast.error(err.response.data.msg)
        }
    }

    useEffect(() => {
        const arr = []

        check.map(c => {
            for (let i = 0; i < optionNoLoaiDichVu.length; i++) {
                if (c === optionNoLoaiDichVu[i]._id) {
                    arr.push(optionNoLoaiDichVu[i].money)
                }
            }
        })

        setMoney(arr)
    }, [check, optionNoLoaiDichVu])

    useEffect(() => {
        let sum = 0
        for (let i = 0; i < money?.length; i++) {
            sum += Number(money[i]);
        }
        setTongTien(sum)
    }, [money])


    return (
        <>
            <Modal
                size="lg"
                show={showEdit}
                onHide={handleCloseEdit}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Option Bảo dưỡng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='Form-Edit-DichVu-body d-flex flex-column'>
                        {
                            optiondichvu.map(gt => (
                                <>
                                    <div className='Form-BaoDuong-DichVu-body-header d-flex align-items-center col-12' key={gt._id}>
                                        <div className='d-flex col-6'>
                                            <img src={carSetting} loading='lazy' /><span className='pl-2'>{gt._id.name}</span>
                                        </div>
                                    </div>

                                    <div className='d-flex'>
                                        <div className='Form-BaoDuong-DichVu-body-items'>
                                            <div className='row'>
                                                {
                                                    gt.records.map((g, index) => (
                                                        <>
                                                            <div className='Form-BaoDuong-DichVu-items col-2 p-0 m-1' key={g._id}>
                                                                <div className='d-flex flex-column'>
                                                                    <div className='Form-BaoDuong-DichVu-items-check d-flex align-items-center col-12'>
                                                                        <div className='Form-BaoDuong-DichVu-items-name col-10 p-0'>{g.name}</div>
                                                                        <div className='Form-items-check col-2 d-flex p-0 justify-content-end'>
                                                                            <input className='check-box-items' type="checkbox" name='check' checked={check.includes(g._id)} onChange={(e) => handleCheck(e, g)} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ))
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEdit}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>Save</Button>
                </Modal.Footer>
            </Modal>

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
                            <tr>
                                <td className="font-weight-bold">Tổng tiền:</td>
                                <td className='text-primary font-weight-bold'>{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(c.Tong)}</td>
                            </tr>
                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" style={{ width: "180px" }} disabled={c.TinhTrangDonHang === 1 || c.checked === 1 && ("disabled")} onClick={() => HandleShowEdit(c._id)}>
                        Sửa đơn bảo dưỡng
                    </Button>
                    <Button variant="danger" disabled={c.TinhTrangDonHang === 1 && ("disabled")} style={{ width: "110px" }} onClick={handleHuy}>
                        {
                            c.TinhTrangDonHang === 1
                                ?
                                "Đã hủy"
                                :
                                "Hủy đơn"
                        }
                    </Button>
                    <Button variant="primary" style={{ width: "140px" }} disabled={c.Duyet === 1 || c.TinhTrangDonHang === 1 && ("disabled")} onClick={handleSubmitDuyet}>
                        {
                            c.Duyet === 1
                                ?
                                "Đã Duyệt"
                                :
                                "Duyệt"
                        }
                    </Button>
                    <Button variant="success" style={{ width: "170px" }} disabled={c.checked === 1 || c.TinhTrangDonHang === 1 && ("disabled")} onClick={handleSubmit}>
                        {
                            c.checked === 1
                                ?
                                "Đã Hoàn Thành"
                                :
                                "Hoàn Thành"
                        }
                    </Button>
                    {
                        c.Duyet === 1 && (
                            <>
                                {
                                    c.TaoQuyTrinh === 0
                                        ?
                                        <>
                                            <Button variant="primary" disabled={c.TinhTrangDonHang === 1 && ("disabled")} style={{ width: "180px" }} onClick={handleCreateQuyTrinh}>
                                                Tạo quy trình <i className="fa-solid fa-circle-right"></i>
                                            </Button>
                                        </>
                                        :
                                        <>
                                            <Button variant="primary" disabled={c.TinhTrangDonHang === 1 && ("disabled")} style={{ width: "180px" }} onClick={() => handleButton(c._id)}>
                                                Xem quy trình <i className="fa-solid fa-circle-right"></i>
                                            </Button>
                                        </>
                                }
                            </>
                        )
                    }
                </Modal.Footer>
            </Modal>

            <div className={`LaiThuItems ${c.checked === 1 ? "border-Success-bg" : "border-No-Success-bg"} ${c.TinhTrangDonHang === 1 && ("border-danger-bg")}`}>
                <div className='LaiThuItems-border d-flex align-items-center mr-auto'>
                    <div className='LaiThuItems-header'>
                        <div className='LaiThuItems-img'>
                            {
                                c && c.IdUser && c.IdUser.avatar ? <><img src={c.IdUser.avatar} alt="avatar" /></> : <><img src={User} alt="avatar" /></>
                            }
                        </div>
                    </div>
                    <div className='LaiThuItems-body'>
                        <div className={`LaiThuItems-name p-0 col-7`}>
                            {
                                c && c.IdUser && c.IdUser.name ? <><span>{c.IdUser.name}</span></> : <><span>{c.name}</span></>
                            }
                        </div>
                        <div className={`LaiThuItems-Date`} >
                            <span>{c.dates}</span>
                        </div>
                        <div className={`LaiThuItems-Date`} >
                            <span>/{c.times}</span>
                        </div>
                    </div>
                    <div className='logoMer' onClick={() => handleShow(c._id)}>
                        <img src={logo} alt="logo" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default DonBaoDuongItems