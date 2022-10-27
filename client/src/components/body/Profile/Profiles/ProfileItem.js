import React, { useState } from "react";
import { useSelector } from 'react-redux'
import Axios from "axios";

import { toast } from 'react-toastify';

const initialState = {
    name: '',
    email: '',
    numberphone: '',
    sex: '',
    date: '',
    err: '',
    success: ''
}

function ProfileItem() {
    const auth = useSelector(state => state.auth)
    const { user, isAdmin } = auth
    const [avatar, setAvatar] = useState(false)

    const [data, setData] = useState(initialState)
    const { name, numberphone, address, sex, date, err, success } = data

    const [loading, setLoading] = useState(false)
    const token = useSelector(state => state.token)

    const changeAvatar = async (e) => {
        e.preventDefault()
        try {
            const file = e.target.files[0]

            if (!file) return toast.error("No files were uploaded.")

            if (file.size > 1024 * 1024)
                return toast.error("Size too large.")

            if (file.type !== 'image/jpeg' && file.type !== 'image/png')
                return toast.error("File format is incorrect.")

            let formData = new FormData()
            formData.append('file', file)

            setLoading(true)
            const res = await Axios.post('/api/upload_avatar', formData, {
                headers: { 'content-type': 'multipart/form-data', Authorization: token }
            })

            setLoading(false)
            setAvatar(res.data.url)

        } catch (err) {
            setData({ ...data, err: err.response.data.msg, success: '' })
        }
    }

    const handleChange = e => {
        const { name, value } = e.target
        setData({ ...data, [name]: value, err: '', success: '' })
    }

    const updateInfo = async () => {
        try {
            Axios.patch('/user/update', {
                name: name ? name : user.name,
                avatar: avatar ? avatar : user.avatar,
                numberphone: numberphone ? numberphone : user.numberphone,
                sex: sex ? sex : user.sex,
                date: date ? date : user.date
            },
                {
                    headers: { Authorization: token }
                })
            toast.success("Updated Success!")
            window.location.reload();
        } catch (err) {
            toast.error(err.response.data.msg)
        }
    }

    const handleUpdate = () => {
        if (name || avatar || numberphone || sex || date) {
            updateInfo()
        }
        else {
            toast.error("Hãy sửa 1 vị trí")
        }
    }

    const optionGender = [
        {
            value: "0", label: "Male"
        },
        {
            value: "1", label: "Female"
        }
    ]

    return (
        <>
            <div className='profile_item col-9'>
                <div className='profile_item_header pt-3'>
                    <h3>Hồ Sơ Của Tôi</h3>
                    <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
                </div>
                <div className='profile_item_body'>
                    <div className='profile_item_info col-9'>
                        <div className="profile_item_form">
                            <div className="form-row">
                                <div className="col-12 form">
                                    <label className="col-2 align-items-center form-lable" htmlFor="name">Name</label>
                                    <div className="input-group">
                                        <div className="input-group-prepend col-1">
                                            <span className="input-group-text" id="inputGroupPrepend1"><i className="fa fa-user d-flex"></i></span>
                                        </div>
                                        <input type="text" className="form-control col-11" name="name" id="name" defaultValue={user.name} placeholder="..." onChange={handleChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-row mt-3">
                                <div className="col-12 form">
                                    <label className="col-2 align-items-center form-lable" htmlFor="email">Email</label>
                                    <div className="input-group">
                                        <div className="input-group-prepend col-1">
                                            <span className="input-group-text" id="inputGroupPrepend2"><i className="d-flex fa fa-envelope-o"></i></span>
                                        </div>
                                        <input type="text" className="form-control col-11" name="email" id="email" defaultValue={user.email} placeholder="..." disabled />
                                    </div>
                                </div>
                            </div>
                            <div className="form-row mt-3">
                                <div className="col-12 form">
                                    <label className="col-2 align-items-center form-lable" htmlFor="numberphone">Phone</label>
                                    <div className="input-group">
                                        <div className="input-group-prepend col-1">
                                            <span className="input-group-text" id="inputGroupPrepend3"><i className="fa fa-phone d-flex"></i></span>
                                        </div>
                                        <input type="number" className="form-control col-11" name="numberphone" id="numberphone" defaultValue={user.numberphone} placeholder="..." onChange={handleChange} />
                                    </div>
                                </div>
                            </div>

                            <div className="form-row mt-3">
                                <div className="col-12 form">
                                    <label className="col-2 align-items-center form-lable" htmlFor="sex">Gender</label>
                                    <div className="input-group">
                                        <div className="input-group-prepend col-1">
                                            <span className="input-group-text" id="inputGroupPrepend4"><i className="fa fa-transgender-alt"></i></span>
                                        </div>
                                        <select className="custom-select col-4" name="sex" id="sex" defaultValue={user.sex} onChange={handleChange}>
                                            {optionGender.map((option) => (
                                                <option key={option.value} value={option.value} selected={user.sex == option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="form-row mt-3">
                                <div className="col-12 form">
                                    <label className="col-2 align-items-center form-lable" htmlFor="date">Date</label>
                                    <div className="input-group">
                                        <div className="input-group-prepend col-1">
                                            <span className="input-group-text" id="inputGroupPrepend4"><i className="fa fa-calendar"></i></span>
                                        </div>
                                        <input type="date" className="form-control col-4" name="date" id="date" defaultValue={user.date} onChange={handleChange} />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className='profile_item_avatar col-3'>
                        <div className='profile_iteam_avatar_body'>
                            <img src={avatar ? avatar : user.avatar} alt="" />
                            <span>
                                <i className="fa-solid fa-camera"></i>
                                <input type="file" name='file' id="file_up" onChange={changeAvatar} />
                            </span>
                        </div>
                        <p>Dụng lượng file tối đa 1 MB</p>
                        <p>Định dạng:.JPEG, .PNG</p>
                    </div>
                </div>
                <div className='col-12 d-flex justify-content-center pt-4'>
                    <button disabled={loading} onClick={handleUpdate} className="btn btn-danger btn-block mb-4 col-4 " type='submit'>Update</button>
                </div>
            </div>
        </>
    )
}

export default ProfileItem