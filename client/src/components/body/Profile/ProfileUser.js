import React, { useState } from 'react'
import '../Profile/ProfileUser.scss'
import Axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Link, Switch, Route, useRouteMatch, NavLink } from 'react-router-dom'
import { isLenght, isMath } from '../../utils/validation/validation'
import { showSuccessMsg, showErrMsg } from '../../utils/notification/Notification'

import ProfileItem from './ProfileItem'


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

    let { url } = useRouteMatch();
    return (
        <>
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
                        <NavLink to="/profileuser" className={({ isActive }) => (isActive ? 'profile pb-2 active' : 'profile pb-2')}><i class="fa-solid fa-user"></i><span>profile</span></NavLink>
                        <NavLink to="/address" className={({ isActive }) => (isActive ? 'address pb-2 active' : 'address pb-2')}><i class="fa-solid fa-location-dot"></i><span>address</span></NavLink>
                        <NavLink to="/changePassword" className={({ isActive }) => (isActive ? 'changePassword pb-2 active' : 'changePassword pb-2')} ><i class="fa-solid fa-key"></i><span>changePassword</span></NavLink>
                    </div>
                    <div className='infor_additional'>
                        <a href="#" className='order pb-2'><i class="fa-solid fa-cart-shopping"></i><span>order</span></a>
                        <a href="#" className='bank pb-2'><i class="fa-sharp fa-solid fa-building-columns"></i><span>bank</span></a>
                        <a href="#" className='notification pb-2'><i class="fa-solid fa-bell"></i><span>notification</span></a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileUser