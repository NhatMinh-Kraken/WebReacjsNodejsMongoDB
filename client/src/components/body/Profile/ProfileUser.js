import React, { useState } from 'react'
import '../Profile/ProfileUser.scss'
import Axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { isLenght, isMath } from '../../utils/validation/validation'
import { showSuccessMsg, showErrMsg } from '../../utils/notification/Notification'


const initialState = {
    name: '',
    email: '',
    err: '',
    success: ''
}

function ProfileUser() {
    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)

    const { user, isAdmin } = auth
    const [data, setData] = useState(initialState)
    const [avatar, setAvatar] = useState(false)

    const [loading, setLoading] = useState(false)
    const [callback, setCallback] = useState(false)


    const changeAvatar = async (e) => {
        e.preventDefault()
        try {
            const file = e.target.files[0]

            if (!file) return setData({ ...data, err: "No files were uploaded.", success: '' })

            if (file.size > 1024 * 1024)
                return setData({ ...data, err: "Size too large.", success: '' })

            if (file.type !== 'image/jpeg' && file.type !== 'image/png')
                return setData({ ...data, err: "File format is incorrect.", success: '' })

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

    return (
        <>
            <div className='profile_page pt-5'>
                <div className='container'>
                    <div className='profile_page_body'>
                        <div className='row'>
                            <div className='profile_item_controll col-3'>
                                <div className='profile_item-avatar'>
                                    <img src={avatar ? avatar : user.avatar} alt="" />
                                    <div className='infor_profile'>
                                        <h2>{isAdmin ? "Admin Profile" : "User Profile"}</h2>
                                        <p>{user.name}</p>
                                    </div>
                                </div>
                                <div className='profile_item-infor'>
                                    <div className='infor'>
                                        <a href="#profileuser" className='profile pb-2 active'><i class="fa-solid fa-user"></i><span>profile</span></a>
                                        <a href="#moi" className='address pb-2'><i class="fa-solid fa-location-dot"></i><span>address</span></a>
                                        <a href="#cu" className='changePassword pb-2'><i class="fa-solid fa-key"></i><span>changePassword</span></a>
                                    </div>
                                    <div className='infor_additional'>
                                        <a href="#" className='order pb-2'><i class="fa-solid fa-cart-shopping"></i><span>order</span></a>
                                        <a href="#" className='bank pb-2'><i class="fa-sharp fa-solid fa-building-columns"></i><span>bank</span></a>
                                        <a href="#" className='notification pb-2'><i class="fa-solid fa-bell"></i><span>notification</span></a>
                                    </div>

                                </div>
                            </div>
                            <div className='profile_item col-9'>
                                <div className='profile_item_header pt-3'>
                                    <h3>Hồ Sơ Của Tôi</h3>
                                    <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
                                </div>
                                <div className='profile_item_body'>
                                    <div className='profile_item_info col-9'>Hello</div>
                                    <div className='profile_item_avatar col-3'>
                                        <div className='profile_iteam_avatar_body'>
                                            <img src={avatar ? avatar : user.avatar} alt="" />
                                            <span>
                                                <i class="fa-solid fa-camera"></i>
                                                <input type="file" name='file' id="file_up" onChange={changeAvatar} />
                                            </span>
                                        </div>
                                        <p>Dụng lượng file tối đa 1 MB</p>
                                        <p>Định dạng:.JPEG, .PNG</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileUser