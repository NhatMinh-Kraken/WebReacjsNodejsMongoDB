import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import carSetting from '../../../../../../assets/images/carSetting.png'


const initialState = {
    day: '',
    month: '',
    year: ''
}

function FormThongKe() {
    const [allBaoDuong, setAllBaoDuong] = useState([])
    const [baoduong, setBaoDuong] = useState([])
    const [callback, setCallBack] = useState(false)
    const [idClick, setIdClick] = useState([])
    const [show, setShow] = useState(false)
    const [showFilter, setShowFilter] = useState(false)
    const [optiondichvu, setOptionDichVu] = useState([])
    const [optiondichvuId, setOptionDichVuId] = useState([])
    const [check, setCheck] = useState([])
    const [tong, setTong] = useState("")
    const [query, setQuery] = useState("")

    const [donHoanThanh, setDonHoanThanh] = useState([])
    const [queryDMY, setQueryDMY] = useState(initialState)

    const handleChange = e => {
        const { name, value } = e.target
        setQueryDMY({ ...queryDMY, [name]: value, err: '', success: '' })
    }

    useEffect(() => {
        get()
    }, [callback])

    const get = async () => {
        const ret = await Axios.get('/api/get-datlichbaoduong')
        setAllBaoDuong(ret.data)
    }


    console.log(allBaoDuong)

    const hanldeShow = (gt) => {
        setIdClick(gt)
        setShow(true)
    }

    const handleClose = () => {
        setIdClick("")
        setShow(false)
    }
    console.log(idClick)
    useEffect(() => {
        const arr = []
        for (let i = 0; i < idClick.IdOptionBaoDuong?.length; i++) {
            arr.push(idClick.IdOptionBaoDuong[i]?._id)
        }
        setCheck(arr)
    }, [idClick.IdOptionBaoDuong])

    console.log(check)

    useEffect(() => {
        const get = async () => {
            const ret = await Axios.get('/api/getProductToType')
            setOptionDichVu(ret.data)
        }
        get()
    }, [callback])

    console.log(optiondichvu)



    const handleShowFilter = () => {
        setShowFilter(true)
    }

    const handleCloseFilter = () => {
        setShowFilter(false)
    }

    useEffect(() => {
        let sum = 0
        for (let i = 0; i < allBaoDuong?.length; i++) {
            if (allBaoDuong[i].checked === 1) {
                sum += Number(allBaoDuong[i]?.Tong);
            }
        }
        setTong(sum)
    }, [allBaoDuong])

    useEffect(() => {
        const fetchData = async () => {
            const res = await Axios.get(`/api/searchQuery?query=${query}`);
            setAllBaoDuong(res.data);
        };

        fetchData()
        // if (query.length === 0 || query.length > 2) ;
    }, [query])

    const TangDan = async () => {
        const res = await Axios.get('/api/TangDanQuery')
        setAllBaoDuong(res.data)
    }

    const GiamDan = async () => {
        const res = await Axios.get('/api/GiamDanQuery')
        setAllBaoDuong(res.data)
    }

    useEffect(() => {
        const fetchData = async () => {
            const res = await Axios.get(`/api/searchDayMonthYear?day=${queryDMY.day}&month=${queryDMY.month}&year=${queryDMY.year}`);
            setAllBaoDuong(res.data);
        };

        fetchData()
        // if (query.length === 0 || query.length > 2) ;
    }, [queryDMY])

    useEffect(() => {
        if (!queryDMY.day && !queryDMY.month && !queryDMY.year) {
            get()
        }
    }, [queryDMY])

    useEffect(() => {
        const arr = []
        for (let i = 0; i < allBaoDuong.length; i++) {
            if (allBaoDuong[i].checked === 1) {
                arr.push(allBaoDuong[i])
            }
        }
        setDonHoanThanh(arr)
    }, [allBaoDuong])

    return (
        <>
            <Modal
                size="lg"
                show={showFilter}
                onHide={handleCloseFilter}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>lọc thông tin</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='controler-filter pb-2'>
                        <Form.Control className="form-control form-control-sm w-50" type="text" placeholder="Search biển số" onChange={(e) => setQuery(e.target.value.toLowerCase())} />
                    </div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Chủ sở hữu</th>
                                <th>Biển số</th>
                                <th>Ngày đăng ký</th>
                                <th>Tình trạng</th>
                                <th>Tổng tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allBaoDuong.map((c, index) => (
                                    <>
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{c.name}</td>
                                            <td>{c.BienSo}</td>
                                            <td>{c.dates}</td>
                                            {
                                                c.TinhTrangDonHang === 0 ?
                                                    <>
                                                        <td>{c.checked === 1 ? <><span className='text-success'>Đã hoàn thành</span></> : <><span className='text-danger'>chưa hoàn thành</span></>}</td>
                                                    </>
                                                    :
                                                    <>
                                                        <td><span className='text-danger'>Đã hủy đơn</span></td>
                                                    </>
                                            }
                                            {
                                                c.checked === 1
                                                    ?
                                                    <>
                                                        <td><span className='text-warning'>{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(c.Tong)}</span></td>
                                                    </>
                                                    :
                                                    <>
                                                        <td><span className='text-warning'>{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format("0")}</span></td>
                                                    </>
                                            }
                                        </tr>
                                    </>
                                ))
                            }
                        </tbody>
                    </Table>
                    <div className='d-flex'>
                        <span>Tổng tiền tất cả đơn hàng: </span><span className='pl-2 text-warning'>{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(tong)}</span>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseFilter}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                size="lg"
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>chi tiết Option Bảo dưỡng</Modal.Title>
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
                                                                            <input className='check-box-items' type="checkbox" name='check' checked={check.includes(g._id)} disabled={"disabled"} />
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
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className='d-flex flex-column'>
                <div className='d-flex pb-2 col-12'>
                    <div className='col-6'>
                        <Form.Control className="form-control form-control-sm w-100 h-100" type="text" placeholder="Search biển số" onChange={(e) => setQuery(e.target.value.toLowerCase())} />
                    </div>
                    <div className='pl-2 d-flex col-6 justify-content-end'>
                        <Form.Control type="text" placeholder="Ngày" className='mr-1' style={{ width: "150px" }} name="day" onChange={handleChange} />
                        <Form.Select aria-label="Default select example" className='mr-1' style={{ width: "150px" }} name="month" onChange={handleChange}>
                            <option value="">Tháng</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                        </Form.Select>
                        <Form.Select aria-label="Default select example" name="year" className='mr-1' style={{ width: "150px" }} onChange={handleChange}>
                            <option value="">Năm</option>
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                        </Form.Select>
                        <Button onClick={TangDan} variant="primary" className='mr-2'><i className="fa-solid fa-arrow-up-short-wide"></i></Button>
                        <Button onClick={GiamDan} variant="primary"><i className="fa-solid fa-arrow-down-short-wide"></i></Button>
                    </div>
                </div>
                <div className='pt-2'>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Chủ sở hữu</th>
                                <th>Biển số</th>
                                <th>Ngày đăng ký</th>
                                <th>Tình trạng</th>
                                <th>Tổng tiền</th>
                                <th><i className="fa-solid fa-list text-primary"></i></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allBaoDuong.map((c, index) => (
                                    <>
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{c.name}</td>
                                            <td>{c.BienSo}</td>
                                            <td>{c.dates}</td>
                                            {
                                                c.TinhTrangDonHang === 0 ?
                                                    <>
                                                        <td>{c.checked === 1 ? <><span className='text-success'>Đã hoàn thành</span></> : <><span className='text-danger'>chưa hoàn thành</span></>}</td>
                                                    </>
                                                    :
                                                    <>
                                                        <td><span className='text-danger'>Đã hủy đơn</span></td>
                                                    </>
                                            }
                                            {
                                                c.checked === 1
                                                    ?
                                                    <>
                                                        <td><span className='text-warning'>{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(c.Tong)}</span></td>
                                                    </>
                                                    :
                                                    <>
                                                        <td><span className='text-warning'>{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format("0")}</span></td>
                                                    </>
                                            }

                                            <td><i className="fa-solid fa-list text-primary" onClick={() => hanldeShow(c)}></i></td>
                                        </tr>
                                    </>
                                ))
                            }
                        </tbody>
                    </Table>
                    <div className='d-flex col-12 pb-3'>
                        <div className='d-flex col-6'>
                            <span>Tổng đơn hoàn thành: <span className='text-success pl-2'>{donHoanThanh.length}/{allBaoDuong.length}</span></span>
                        </div>
                        <div className='d-flex col-6 justify-content-end'>
                            <span>Tổng tiền tất cả đơn hàng: </span><span className='pl-2 text-warning'>{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(tong)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FormThongKe