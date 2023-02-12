import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import Axios from "axios";

import { toast } from 'react-toastify';

import { fetchAllUsers, dispatchGetAllUsers } from '../../../../redux/action/userAction'


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
    const { user } = auth
    const [avatar, setAvatar] = useState(false)

    const [data, setData] = useState(initialState)
    const { name, numberphone, address, sex, date, err, success } = data

    const [loading, setLoading] = useState(false)
    const token = useSelector(state => state.token)

    const [callback, setCallback] = useState(false)

    const dispatch = useDispatch()

    // useEffect(() => {
    //     if (isAdmin) {
    //         fetchAllUsers(token).then(res => {
    //             dispatch(dispatchGetAllUsers(res))
    //         })
    //     }
    // }, [token, isAdmin, dispatch, callback])

    const changeAvatar = async (e) => {
        e.preventDefault()
        try {
            // if (!isAdmin) {
            //     toast.error("You're not an admin")
            //     window.location.reload()
            // }
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
            setAvatar(res.data)
            toast.success("Upload Image Success")

        } catch (err) {
            setData({ ...data, err: err.response.data.msg, success: '' })
            toast.error(err.response.data.msg)
        }
    }

    //console.log(avatar)

    const handleChange = e => {
        const { name, value } = e.target
        setData({ ...data, [name]: value, err: '', success: '' })
    }

    const updateInfo = async () => {
        try {
            Axios.patch('/user/update', {
                name: name ? name : user.name,
                avatar: avatar ? avatar.url : user.avatar,
                numberphone: numberphone ? numberphone : user.numberphone,
                sex: sex ? sex : user.sex,
                date: date ? date : user.date
            },
                {
                    headers: { Authorization: token }
                })
            toast.success("Updated Success!")
            window.location.reload();
            // setCallback(!callback)
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

    const handleDistroy = async () => {
        try {
            // if (!isAdmin) {
            //     toast.error("You're not an admin")
            //     window.location.reload()
            // }
            setLoading(true)
            await Axios.post('/api/destroy_avatar', { public_id: avatar.public_id }, {
                headers: { Authorization: token }
            })
            setLoading(false)
            setAvatar(false)
            toast.success("Destroy Image Success")
        } catch (err) {
            toast.error(err.response.data.msg)
            console.log(err)
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

    const styleUpload = {
        display: avatar ? "block" : "none"
    }

    return (
        <>
            <div className='profile_item_body'>
                <div className='profile_item_info col-9'>
                    <div className="profile_item_form">
                        <div className="form-row">
                            <div className="col-12 form">
                                <div className="input-group">
                                    <div className="input-group-prepend ">
                                        <span className="input-group-text" id="inputGroupPrepend1"><i className="fa fa-user d-flex"></i></span>
                                    </div>
                                    <input type="text" className="form-controls col-10" name="name" id="name" defaultValue={user.name} placeholder="..." onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                        <div className="form-row mt-3">
                            <div className="col-12 form">
                                <div className="input-group">
                                    <div className="input-group-prepend ">
                                        <span className="input-group-text" id="inputGroupPrepend2"><i className="d-flex fa fa-envelope-o"></i></span>
                                    </div>
                                    <input type="text" className="form-controls col-10" name="email" id="email" defaultValue={user.email} placeholder="..." disabled />
                                </div>
                            </div>
                        </div>
                        <div className="form-row mt-3">
                            <div className="col-12 form">
                                <div className="input-group">
                                    <div className="input-group-prepend ">
                                        <span className="input-group-text" id="inputGroupPrepend3"><i className="fa fa-phone d-flex"></i></span>
                                    </div>
                                    <input type="number" className="form-controls col-10" name="numberphone" id="numberphone" defaultValue={user.numberphone} placeholder="..." onChange={handleChange} />
                                </div>
                            </div>
                        </div>

                        <div className="form-row mt-3">
                            <div className="col-12 form">
                                <div className="input-group">
                                    <div className="input-group-prepend ">
                                        <span className="input-group-text" id="inputGroupPrepend4"><i className="fa fa-transgender-alt"></i></span>
                                    </div>
                                    <select className="custom-selects col-4" name="sex" id="sex" defaultValue={user.sex} onChange={handleChange}>
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
                                <div className="input-group">
                                    <div className="input-group-prepend ">
                                        <span className="input-group-text" id="inputGroupPrepend4"><i className="fa fa-calendar"></i></span>
                                    </div>
                                    <input type="date" className="form-controls col-4" name="date" id="date" defaultValue={user.date} onChange={handleChange} />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className='profile_item_avatar col-3'>

                    {loading
                        ?
                        <>
                            <div className='profile_item_avatar_body'>
                                <div className='loading-cr'><span>...</span></div>
                            </div>
                        </>
                        : <>
                            <div id='file_img' style={styleUpload}>
                                <span className='destroy' onClick={handleDistroy}>X</span>
                            </div>
                            <div className='profile_item_avatar_body'>
                                <img src={avatar ? avatar.url : user.avatar} alt="" />
                                <span className='spans' style={{ display: avatar ? "none" : "block" }}>
                                    <i className="fa-solid fa-camera"></i>
                                    <input type="file" name='file' id="file_up" onChange={changeAvatar} />
                                </span>
                            </div>
                        </>
                    }

                    <p>Dụng lượng file tối đa 1 MB</p>
                    <p>Định dạng:.JPEG, .PNG</p>
                </div>
            </div>
            <div className='col-12 d-flex justify-content-center pt-4'>
                <button disabled={loading} onClick={handleUpdate} className="btn btn-danger btn-block mb-4 col-4 " type='submit'>Update</button>
            </div>

        </>
    )
}

export default ProfileItem