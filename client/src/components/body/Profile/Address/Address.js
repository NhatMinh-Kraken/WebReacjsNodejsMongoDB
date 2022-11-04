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
    nameCity: '',
    nameDis: '',
    nameWard: '',
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
                nameCity: selectedCity.label,
                nameDis: selectedDistrict.label,
                nameWard: selectedWard.label
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
        if (!address) {
            toast.error("Hãy thêm địa chỉ cụ thể")
        }
        else {
            Update()
        }
    }

    // address
    const {
        state,
        onCitySelect,
        onDistrictSelect,
        onWardSelect,
    } = useLocationForm(false);

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

                    <Select className='col-4 pr-0 pl-0'
                        name="cityId"
                        key={`cityId_${selectedCity?.value}`}
                        isDisabled={cityOptions.length === 0}
                        options={cityOptions}
                        onChange={(option) => onCitySelect(option)}
                        placeholder="Tỉnh/Thành"
                        //defaultValue={cityOptions.find(x => x.value === user.cityId)}
                        defaultValue={selectedCity}
                    />

                    <Select className='col-4 pr-0'
                        name="districtId"
                        key={`districtId_${selectedDistrict?.value}`}
                        isDisabled={districtOptions.length === 0}
                        options={districtOptions}
                        onChange={(option) => onDistrictSelect(option)}
                        placeholder="Quận/Huyện"
                        //defaultValue={districtOptions.find(x => x.value === user.districtId)}
                        defaultValue={selectedDistrict}
                    />

                    <Select className='col-4 pr-0'
                        name="wardId"
                        key={`wardId_${selectedWard?.value}`}
                        isDisabled={wardOptions.length === 0}
                        options={wardOptions}
                        placeholder="Phường/Xã"
                        onChange={(option) => onWardSelect(option)}
                        //defaultValue={wardOptions.find(x => x.value === user.wardId)}
                        defaultValue={selectedWard}
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

            <div className='profile_item_body'>
                <div className='profile_item_info col-12'>
                    <div className="profile_item_form">
                        <div className="form-row">
                            <div className="col-12 form">
                                <div className="col-2 form-tieude" htmlFor="address">Địa chỉ</div>
                                <div className="input-group pl-3 col-10">
                                    <div className='profile-address d-flex mb-2'>
                                        <div className='name-address d-flex'>{user.name}</div>
                                        <div className='phone-address d-flex'>(+84) {user.numberphone}</div>
                                    </div>
                                    <div className="body-address d-flex">
                                        <div className='address d-flex '>
                                            {user.address}
                                        </div>
                                        <div className='address-full d-flex'>
                                            <div className='address-ward mr-1'>{user.nameWard}</div>-
                                            <div className='address-district mr-1'>{user.nameDis}</div>-
                                            <div className='address-city mr-1'>{user.nameCity}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-12 d-flex justify-content-center pt-4'>
                <button className="btn btn-danger btn-block mb-4 col-4 " onClick={handleShow} type='submit'>Chỉnh sửa</button>
            </div>
        </>
    )
}

export default Address