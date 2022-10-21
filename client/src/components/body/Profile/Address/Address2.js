import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useSelector } from 'react-redux'

import './Address.scss'
import { toast } from 'react-toastify'

import Axios from 'axios'

import { PATHS } from './paths/paths'

const initialState = {
    address: '',
    cityId: '',
    districtId: '',
    wardId: '',
    nameCity: '',
    err: '',
    success: ''
}

function Address2() {
    const auth = useSelector(state => state.auth)
    const { user } = auth
    const [data, setData] = useState(initialState)
    const [show, setShow] = useState(false)
    const token = useSelector(state => state.token)
    const { address, cityId, districtId, wardId } = data

    const [city, setCity] = useState([]);
    const [cityname, setCityname] = useState('');
    const [dis, setDis] = useState([]);
    const [war, setWar] = useState([])

    useEffect(() => {
        const getcity = async () => {
            const rescity = (await Axios.get(PATHS.CITIES)).data["data"];
            setCity(rescity);
            return {
                setCityname: rescity.find((c) => c.value === cityId)
            }
        }
        getcity();
    }, []);

    useEffect(() => {
        const getdis = async () => {
            const resdis = (await Axios.get(`https://raw.githubusercontent.com/NhatMinh-Kraken/API_Address/main/locations/districts/${cityId}.json`)).data["data"];
            setDis(resdis);
        }
        getdis();
    }, [cityId]);

    useEffect(() => {
        const getwa = async () => {
            const reswa = (await Axios.get(`https://raw.githubusercontent.com/NhatMinh-Kraken/API_Address/main/locations/wards/${districtId}.json`)).data["data"];
            setWar(reswa);
        }
        getwa();
    }, [districtId]);

    const handleChange = e => {
        const { name, value } = e.target
        setData({ ...data, [name]: value, cityname: e.name, err: '', success: '' })
    }

    const handleClose = () => {
        setShow(false)
    }
    const handleShow = () => {
        setShow(true)
    }

    const Update = async () => {
        try {
            await Axios.patch('/user/update_address', {
                address: address ? address : user.address,
                cityId: cityId ? cityId : user.cityId,
                districtId: districtId ? districtId : user.districtId,
                wardId: wardId ? wardId : user.wardId,
                nameCity: cityname,
            },
                {
                    headers: { Authorization: token }
                })
            toast.success("Updated Success!")
            window.location.reload();

        } catch (err) {
            toast.error(err.response.data.msg)
            console.log(err)
        }
    }

    const handleUpdate = () => {
        if (address || cityId || districtId || wardId) {
            Update()
        }
    }


    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Cập nhật địa chỉ</Modal.Title>
                </Modal.Header>
                <Modal.Body className='col-12 d-flex'>

                    <select className="custom-select col-4" name="cityId" id="cityId" defaultValue={user.cityId} onChange={handleChange}>
                        <option value="">--Tỉnh/Thành--</option>
                        {
                            city.map((getci, index) => (
                                <option key={index} value={getci.id} selected={user.cityId === getci.id} >{getci.name}</option>
                            ))
                        }
                    </select>

                    <select className="custom-select col-4" name="districtId" id="districtId" defaultValue={user.districtId} onChange={handleChange}>
                        <option value="">--Quận/Huyện--</option>
                        {
                            dis.map((getdis, index) => (
                                <option key={index} value={getdis.id} selected={user.districtId === getdis.id}>{getdis.name}</option>
                            ))
                        }
                    </select>

                    <select className="custom-select col-4" name="wardId" id="wardId" defaultValue={user.wardId} onChange={handleChange}>
                        <option value="">--Phường/Xã--</option>
                        {
                            war.map((getwar, index) => (
                                <option key={index} value={getwar.id} selected={user.wardId === getwar.id}>{getwar.name}</option>
                            ))
                        }
                    </select>

                </Modal.Body>
                <Modal.Body>
                    <div className='form pt-3'>
                        <textarea className="form-control z-depth-1 col-12" id="exampleFormControlTextarea6" rows="3" name='address' defaultValue={user.address} onChange={handleChange} required></textarea>
                        <label className="form-lable" htmlFor="address">Địa chỉ ghi chú thêm</label>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>Update</Button>
                </Modal.Footer>
            </Modal>

            <div className='profile_item col-9'>
                <div className='profile_item_header pt-3'>
                    <h3>Hồ Sơ Của Tôi</h3>
                    <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
                </div>
                <div className='profile_item_body'>
                    <div className='profile_item_info col-12'>
                        <div className="profile_item_form">
                            <div className="form-row">
                                <div className="col-12 form">
                                    <div className="col-2 form-tieude" htmlFor="address">Địa chỉ</div>
                                    <div className="input-group pl-3 col-10">
                                        <div className='profile-address d-flex'>
                                            <div className='name-address d-flex'>{user.name}</div>
                                            <div className='phone-address d-flex'>(+84) {user.numberphone}</div>
                                        </div>
                                        <div className="body-address d-flex">
                                            {user.address}
                                        </div>
                                        <div>{user.nameCity}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-12 d-flex justify-content-center pt-4'>
                    <button className="btn btn-danger btn-block mb-4 col-4 " onClick={handleShow} type='submit'>Chỉnh sửa</button>
                </div>
            </div>
        </>
    )
}

export default Address2