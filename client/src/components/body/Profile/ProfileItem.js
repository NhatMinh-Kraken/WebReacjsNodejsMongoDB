import React, { useState } from "react";
import { useSelector } from 'react-redux'
import Axios from "axios";



const initialState = {
    name: '',
    email: '',
    err: '',
    success: ''
}

function ProfileItem() {
    const auth = useSelector(state => state.auth)
    const { user, isAdmin } = auth
    const [avatar, setAvatar] = useState(false)
    const [data, setData] = useState(initialState)
    const [loading, setLoading] = useState(false)
    const token = useSelector(state => state.token)

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
        <div className='profile_item col-9'>
            <div className='profile_item_header pt-3'>
                <h3>Hồ Sơ Của Tôi</h3>
                <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
            </div>
            <div className='profile_item_body'>
                <div className='profile_item_info col-9'>
                    <div className="profile_item_form">
                        <form>
                            form
                        </form>
                    </div>
                </div>
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
    )
}

export default ProfileItem