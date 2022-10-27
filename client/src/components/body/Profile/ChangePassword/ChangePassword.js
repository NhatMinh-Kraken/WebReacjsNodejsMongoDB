import Axios from 'axios';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { isLenght, isMath } from '../../../utils/validation/validation';
import "./ChangePassword.scss"

const initialState = {
    oldPassword: '',
    password: '',
    cf_password: '',
    err: '',
    success: ''
}

function ChangePassword() {

    const [data, setData] = useState(initialState);
    const history = useHistory();
    const token = useSelector(state => state.token)

    const { oldPassword, password, cf_password, err, success } = data

    const handleChangeInput = e => {
        const { name, value } = e.target
        setData({ ...data, [name]: value, err: '', success: '' })
    }

    const ChangePassword = async () => {

        if (isLenght(password)) {
            return toast.error("Password must be at least 6 characters.")
        }

        if (!isMath(password, cf_password)) {
            return toast.error("Password did not match.")
        }

        try {
            const res = await Axios.patch('/user/change_password', { password, oldPassword }, {
                headers: { Authorization: token }
            })
            toast.success(res.data.msg);
            history.push("/profileuser")

        } catch (err) {
            err.response.data.msg && toast.error(err.response.data.msg)
            history.push("/profileuser")
        }
    }

    return (
        <>
            <div className='profile_item col-9'>
                <div className='profile_item_header pt-3'>
                    <h3>Hồ Sơ Của Tôi</h3>
                    <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
                </div>
                <div className='profile_item_body'>
                    <div className='profile_item_info col-12'>
                        <div className="profile_item_form">
                            <div className="form-tieude-change d-flex" htmlFor="address">Đổi mật khẩu</div>
                            <div className="form-row">
                                <div className='form-body d-flex col-12'>
                                    <div className="form col-12">
                                        <label className="col-2 align-items-center form-lable p-0" htmlFor="oldPassword">Old Password</label>
                                        <div className="input-group col-10">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="inputGroupPrepend1"><i className="fa-solid fa-key d-flex"></i></span>
                                            </div>
                                            <input type="password" className="form-control col-10" name="oldPassword" id="oldPassword" placeholder="..." onChange={handleChangeInput} />
                                        </div>
                                    </div>
                                </div>
                                <div className='form-body d-flex col-12 pt-3'>
                                    <div className="form col-12">
                                        <label className="col-2 align-items-center form-lable p-0" htmlFor="password">New Password</label>
                                        <div className="input-group col-10">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="inputGroupPrepend1"><i className="fa-solid fa-key d-flex text-warning"></i></span>
                                            </div>
                                            <input type="password" className="form-control col-10" name="password" id="password" placeholder="..." onChange={handleChangeInput} />
                                        </div>
                                    </div>
                                </div>
                                <div className='form-body d-flex col-12 pt-3'>
                                    <div className="form col-12">
                                        <label className="col-2 align-items-center form-lable p-0" htmlFor="cf_password">Confirm Password</label>
                                        <div className="input-group col-10">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="inputGroupPrepend1"><i className="fa-solid fa-key d-flex text-warning"></i></span>
                                            </div>
                                            <input type="password" className="form-control col-10" name="cf_password" id="cf_password" placeholder="..." onChange={handleChangeInput} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-12 d-flex justify-content-center pt-4'>
                    <button className="btn btn-danger btn-block mb-4 col-4 " type='submit' onClick={ChangePassword}>Update</button>
                </div>
            </div>
        </>
    )
}

export default ChangePassword