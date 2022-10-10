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
                                        <button type='button' className='profile'><i class="fa-solid fa-user"></i><span>profile</span></button>
                                        <button type='button' className='address'><i class="fa-solid fa-location-dot"></i><span>address</span></button>
                                        <button type='button' className='changePassword'><i class="fa-solid fa-key"></i><span>changePassword</span></button>
                                    </div>
                                    <div className='infor_additional'>
                                        <button type='button' className='order'><i class="fa-solid fa-cart-shopping"></i><span>order</span></button>
                                        <button type='button' className='bank'><i class="fa-sharp fa-solid fa-building-columns"></i><span>bank</span></button>
                                        <button type='button' className='notification'><i class="fa-solid fa-bell"></i><span>notification</span></button>
                                    </div>

                                </div>
                            </div>
                            <div className='profile_item col-9'>Name</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileUser