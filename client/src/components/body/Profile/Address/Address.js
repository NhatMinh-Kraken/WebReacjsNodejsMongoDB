import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useSelector } from 'react-redux'

import Select from 'react-select'
import useLocationForm from './useLocationForm'

import './Address.scss'
import { toast } from 'react-toastify'

import Axios from 'axios'

const initialState = {
    address: '',
    cityId: '',
    districtId: '',
    wardId: '',
    err: '',
    success: ''
}

function Address() {
    const auth = useSelector(state => state.auth)
    const { user } = auth
    const [data, setData] = useState(initialState)
    const [show, setShow] = useState(false)
    const token = useSelector(state => state.token)
    const { address, cityId, districtId, wardId } = data

    const handleChange = e => {
        const { name, value } = e.target
        setData({ ...data, [name]: value, err: '', success: '' })
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
                cityId: selectedCity.value,
                districtId: selectedDistrict.value,
                wardId: selectedWard.value,
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

    // address
    const {
        state,
        onCitySelect,
        onDistrictSelect,
        onWardSelect,
    } = useLocationForm(true);

    const {
        cityOptions,
        districtOptions,
        wardOptions,
        selectedCity,
        selectedDistrict,
        selectedWard
    } = state;

    //
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

                    <Select className='col-4 pr-0'
                        name="cityId"
                        key={`cityId_${selectedCity?.value}`}
                        options={cityOptions}
                        onChange={(option) => onCitySelect(option)}
                        placeholder="Tỉnh/Thành"
                        defaultValue={cityOptions.filter(x => x.value === user.cityId)}
                    />

                    <Select className='col-4 pr-0'
                        name="districtId"
                        key={`districtId_${selectedDistrict?.value}`}
                        options={districtOptions}
                        onChange={(option) => onDistrictSelect(option)}
                        placeholder="Quận/Huyện"
                        defaultValue={districtOptions.filter(x => x.value === user.districtId)}
                    />

                    <Select className='col-4 pr-0'
                        name="wardId"
                        key={`wardId_${selectedWard?.value}`}
                        options={wardOptions}
                        placeholder="Phường/Xã"
                        onChange={(option) => onWardSelect(option)}
                        defaultValue={wardOptions.filter(x => x.value === user.wardId)}
                    />

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
                                    <label className="col-2 form-lable" htmlFor="address">Address</label>
                                    <div className="input-group">
                                        <textarea className="form-control z-depth-1" id="exampleFormControlTextarea6" rows="3" defaultValue={user.address} onChange={handleChange} placeholder="Write something here..."></textarea>
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

export default Address